const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');

const Product = {
    create: async (productData, connection = db) => {
        const { product_id, name, slug, description, category_id, base_price, sale_price } = productData;
        
        const sql = `
            INSERT INTO products (product_id, name, slug, description, category_id, base_price, sale_price)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        
        await connection.query(sql, [product_id, name, slug, description, category_id, base_price, sale_price]);
        return product_id;
    },

    findAll: async (limit = 10, offset = 0) => {
        const sql = `
            SELECT p.*, c.name as category_name 
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.category_id
            WHERE p.status = 1
            ORDER BY p.created_at DESC
            LIMIT ? OFFSET ?
        `;
        const [rows] = await db.query(sql, [parseInt(limit), parseInt(offset)]);
        
        const [[{ total }]] = await db.query('SELECT COUNT(*) as total FROM products WHERE status = 1');
        
        return { products: rows, total };
    },

    findById: async (productId) => {
        const sql = `
            SELECT p.*, c.name as category_name
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.category_id
            WHERE p.product_id = ? AND p.status = 1
        `;
        const [rows] = await db.query(sql, [productId]);
        return rows[0];
    },

    update: async (productId, productData, connection = db) => {
        const { name, slug, description, category_id, base_price, sale_price, status } = productData;
        
        const sql = `
            UPDATE products 
            SET name = ?, slug = ?, description = ?, category_id = ?, base_price = ?, sale_price = ?, status = ?
            WHERE product_id = ?
        `;
        
        await connection.query(sql, [name, slug, description, category_id, base_price, sale_price, status !== undefined ? status : 1, productId]);
    },

    softDelete: async (productId, connection = db) => {
        await connection.query('UPDATE products SET status = 0 WHERE product_id = ?', [productId]);
    },

    // Attribute Values
    addAttributes: async (productId, attributes, connection = db) => {
        if (!attributes || attributes.length === 0) return;
        
        const values = attributes.map(attr => [
            uuidv4(),
            productId,
            attr.attribute_id,
            attr.attribute_value_id
        ]);
        
        const sql = 'INSERT INTO product_attribute_values (id, product_id, attribute_id, attribute_value_id) VALUES ?';
        await connection.query(sql, [values]);
    },

    deleteAttributes: async (productId, connection = db) => {
        await connection.query('DELETE FROM product_attribute_values WHERE product_id = ?', [productId]);
    },

    getAttributes: async (productId) => {
        const sql = `
            SELECT pav.id, pav.attribute_id, a.name as attribute_name, pav.attribute_value_id, av.value as attribute_value
            FROM product_attribute_values pav
            JOIN attributes a ON pav.attribute_id = a.attribute_id
            JOIN attribute_values av ON pav.attribute_value_id = av.attribute_value_id
            WHERE pav.product_id = ?
        `;
        const [rows] = await db.query(sql, [productId]);
        return rows;
    },

    // Images
    addImages: async (productId, images, connection = db) => {
        if (!images || images.length === 0) return;
        
        const values = images.map(img => [
            uuidv4(),
            productId,
            img.image_url,
            img.is_primary || false
        ]);
        
        const sql = 'INSERT INTO product_images (image_id, product_id, image_url, is_primary) VALUES ?';
        await connection.query(sql, [values]);
    },

    addImage: async (productId, imageData, connection = db) => {
        const { image_url, is_primary } = imageData;
        const imageId = uuidv4();
        
        const sql = 'INSERT INTO product_images (image_id, product_id, image_url, is_primary) VALUES (?, ?, ?, ?)';
        await connection.query(sql, [imageId, productId, image_url, is_primary || false]);
        return imageId;
    },

    deleteImage: async (imageId, connection = db) => {
        await connection.query('DELETE FROM product_images WHERE image_id = ?', [imageId]);
    },

    deleteImages: async (productId, connection = db) => {
        await connection.query('DELETE FROM product_images WHERE product_id = ?', [productId]);
    },

    getImages: async (productId) => {
        const sql = 'SELECT * FROM product_images WHERE product_id = ? ORDER BY is_primary DESC, created_at ASC';
        const [rows] = await db.query(sql, [productId]);
        return rows;
    },

    findBySlug: async (slug) => {
        const [rows] = await db.query('SELECT * FROM products WHERE slug = ? AND status = 1', [slug]);
        return rows[0];
    }
};

module.exports = Product;
