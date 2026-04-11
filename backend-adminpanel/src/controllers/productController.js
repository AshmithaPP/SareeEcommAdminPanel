const productService = require('../services/productService');

const productController = {
    createProduct: async (req, res, next) => {
        try {
            const result = await productService.createProduct(req.body);
            res.status(201).json({
                success: true,
                message: 'Product created successfully',
                data: result
            });
        } catch (error) {
            next(error);
        }
    },

    getProducts: async (req, res, next) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const result = await productService.getProducts(page, limit);
            res.status(200).json({
                success: true,
                data: result.products,
                total: result.total,
                page,
                limit
            });
        } catch (error) {
            next(error);
        }
    },

    getProductById: async (req, res, next) => {
        try {
            const result = await productService.getProductById(req.params.product_id);
            res.status(200).json({
                success: true,
                data: result
            });
        } catch (error) {
            next(error);
        }
    },

    updateProduct: async (req, res, next) => {
        try {
            const result = await productService.updateProduct(req.params.product_id, req.body);
            res.status(200).json({
                success: true,
                message: 'Product updated successfully',
                data: result
            });
        } catch (error) {
            next(error);
        }
    },

    deleteProduct: async (req, res, next) => {
        try {
            await productService.deleteProduct(req.params.product_id);
            res.status(200).json({
                success: true,
                message: 'Product soft-deleted successfully'
            });
        } catch (error) {
            next(error);
        }
    },

    addProductImage: async (req, res, next) => {
        try {
            const result = await productService.addProductImage(req.params.product_id, req.body);
            res.status(201).json({
                success: true,
                message: 'Product image added successfully',
                data: result
            });
        } catch (error) {
            next(error);
        }
    },

    deleteProductImage: async (req, res, next) => {
        try {
            await productService.deleteProductImage(req.params.image_id);
            res.status(200).json({
                success: true,
                message: 'Product image deleted successfully'
            });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = productController;
