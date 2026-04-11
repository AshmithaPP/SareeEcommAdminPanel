const Product = require('../models/productModel');
const Category = require('../models/categoryModel');
const Attribute = require('../models/attributeModel');
const db = require('../config/database');
const slugify = require('../utils/slugify');
const { v4: uuidv4 } = require('uuid');

const productService = {
    createProduct: async (productData) => {
        const { name, category_id, base_price, sale_price, attributes, images } = productData;

        // Validation: Category
        const category = await Category.findById(category_id);
        if (!category) {
            const error = new Error('Invalid category ID');
            error.statusCode = 400;
            throw error;
        }

        // Validation: Price
        if (parseFloat(sale_price) > parseFloat(base_price)) {
            const error = new Error('Sale price cannot be greater than base price');
            error.statusCode = 400;
            throw error;
        }

        // Generate Slug
        let slug = slugify(name);
        const existingBySlug = await Product.findBySlug(slug);
        if (existingBySlug) {
            slug = `${slug}-${Date.now()}`;
        }

        // Validate Attributes belong to category
        if (attributes && attributes.length > 0) {
            const allowedAttributes = await Category.getAttributesFlat(category_id);
            const allowedAttrIds = [...new Set(allowedAttributes.map(a => a.attribute_id))];
            
            const providedAttrIds = attributes.map(a => a.attribute_id);
            const invalidAttrs = providedAttrIds.filter(id => !allowedAttrIds.includes(id));
            
            if (invalidAttrs.length > 0) {
                const error = new Error(`Attributes [${invalidAttrs.join(', ')}] are not allowed for this category`);
                error.statusCode = 400;
                throw error;
            }

            // Check for duplicate attributes in input
            if (new Set(providedAttrIds).size !== providedAttrIds.length) {
                const error = new Error('Duplicate attributes provided for the product');
                error.statusCode = 400;
                throw error;
            }
        }

        const productId = uuidv4();
        const connection = await db.getConnection();

        try {
            await connection.beginTransaction();

            // 1. Insert Product
            await Product.create({
                product_id: productId,
                name,
                slug,
                description: productData.description || '',
                category_id,
                base_price: base_price || 0,
                sale_price: sale_price || 0
            }, connection);

            // 2. Insert Attributes
            if (attributes && attributes.length > 0) {
                await Product.addAttributes(productId, attributes, connection);
            }

            // 3. Insert Images
            if (images && images.length > 0) {
                await Product.addImages(productId, images, connection);
            }

            await connection.commit();
            return { product_id: productId, slug };
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    },

    getProducts: async (page = 1, limit = 10) => {
        const offset = (page - 1) * limit;
        return await Product.findAll(limit, offset);
    },

    getProductById: async (productId) => {
        const product = await Product.findById(productId);
        if (!product) {
            const error = new Error('Product not found');
            error.statusCode = 404;
            throw error;
        }

        const attributes = await Product.getAttributes(productId);
        const images = await Product.getImages(productId);

        return {
            ...product,
            attributes,
            images
        };
    },

    updateProduct: async (productId, productData) => {
        const { name, category_id, base_price, sale_price, attributes, images, status } = productData;

        const existingProduct = await Product.findById(productId);
        if (!existingProduct) {
            const error = new Error('Product not found');
            error.statusCode = 404;
            throw error;
        }

        // Validation: Category (if changed)
        const targetCategoryId = category_id || existingProduct.category_id;
        if (category_id && category_id !== existingProduct.category_id) {
            const category = await Category.findById(category_id);
            if (!category) {
                const error = new Error('Invalid category ID');
                error.statusCode = 400;
                throw error;
            }
        }

        // Validation: Price
        const targetBasePrice = base_price !== undefined ? base_price : existingProduct.base_price;
        const targetSalePrice = sale_price !== undefined ? sale_price : existingProduct.sale_price;
        if (parseFloat(targetSalePrice) > parseFloat(targetBasePrice)) {
            const error = new Error('Sale price cannot be greater than base price');
            error.statusCode = 400;
            throw error;
        }

        // Handle Slug (if name changed)
        let slug = existingProduct.slug;
        if (name && name !== existingProduct.name) {
            slug = slugify(name);
            const existingBySlug = await Product.findBySlug(slug);
            if (existingBySlug && existingBySlug.product_id !== productId) {
                slug = `${slug}-${Date.now()}`;
            }
        }

        // Validate Attributes (if provided)
        if (attributes) {
            const allowedAttributes = await Category.getAttributesFlat(targetCategoryId);
            const allowedAttrIds = [...new Set(allowedAttributes.map(a => a.attribute_id))];
            
            const providedAttrIds = attributes.map(a => a.attribute_id);
            const invalidAttrs = providedAttrIds.filter(id => !allowedAttrIds.includes(id));
            
            if (invalidAttrs.length > 0) {
                const error = new Error(`Attributes [${invalidAttrs.join(', ')}] are not allowed for this category`);
                error.statusCode = 400;
                throw error;
            }

            if (new Set(providedAttrIds).size !== providedAttrIds.length) {
                const error = new Error('Duplicate attributes provided for the product');
                error.statusCode = 400;
                throw error;
            }
        }

        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();

            // 1. Update Product Details
            await Product.update(productId, {
                name: name || existingProduct.name,
                slug,
                description: productData.description !== undefined ? productData.description : existingProduct.description,
                category_id: targetCategoryId,
                base_price: targetBasePrice,
                sale_price: targetSalePrice,
                status: status !== undefined ? status : existingProduct.status
            }, connection);

            // 2. Sync Attributes (if provided)
            if (attributes) {
                await Product.deleteAttributes(productId, connection);
                if (attributes.length > 0) {
                    await Product.addAttributes(productId, attributes, connection);
                }
            }

            // 3. Sync Images (if provided)
            if (images) {
                await Product.deleteImages(productId, connection);
                if (images.length > 0) {
                    await Product.addImages(productId, images, connection);
                }
            }

            await connection.commit();
            return { product_id: productId, slug };
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    },

    deleteProduct: async (productId) => {
        const product = await Product.findById(productId);
        if (!product) {
            const error = new Error('Product not found');
            error.statusCode = 404;
            throw error;
        }

        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();
            await Product.softDelete(productId, connection);
            await connection.commit();
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    },

    addProductImage: async (productId, imageData) => {
        const product = await Product.findById(productId);
        if (!product) {
            const error = new Error('Product not found');
            error.statusCode = 404;
            throw error;
        }

        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();
            
            // If is_primary is true, unset other primary images
            if (imageData.is_primary) {
                await connection.query('UPDATE product_images SET is_primary = FALSE WHERE product_id = ?', [productId]);
            }

            const imageId = await Product.addImage(productId, imageData, connection);
            await connection.commit();
            return { image_id: imageId };
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    },

    deleteProductImage: async (imageId) => {
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();
            await Product.deleteImage(imageId, connection);
            await connection.commit();
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }
};

module.exports = productService;
