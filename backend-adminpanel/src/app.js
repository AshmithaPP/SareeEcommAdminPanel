const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middlewares/errorHandler');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const attributeRoutes = require('./routes/attributeRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Enable CORS with credentials support
app.use(cors({
    origin: 'http://localhost:5173', // frontend URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/attributes', attributeRoutes);
app.use('/api/products', productRoutes);

// Dedicated route for product image deletion
const productController = require('./controllers/productController');
app.delete('/api/product-images/:image_id', productController.deleteProductImage);

// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP', message: 'Backend is running' });
});

// Root route
app.get('/', (req, res) => {
    res.send('Admin Panel Backend API');
});

// Centralized Error Handler
app.use(errorHandler);

module.exports = app;
