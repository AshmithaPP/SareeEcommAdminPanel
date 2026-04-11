const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

// Product routes
router.post('/', productController.createProduct);
router.get('/', productController.getProducts);
router.get('/:product_id', productController.getProductById);
router.put('/:product_id', productController.updateProduct);
router.delete('/:product_id', productController.deleteProduct);

// Image routes
router.post('/:product_id/images', productController.addProductImage);
router.delete('/images/:image_id', productController.deleteProductImage); 

module.exports = router;
