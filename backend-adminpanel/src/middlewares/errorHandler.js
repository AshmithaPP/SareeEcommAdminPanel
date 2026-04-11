const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    // Log for developer
    if (process.env.NODE_ENV === 'development') {
        console.error(err);
    }

    // Default error status and message
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Server Error';

    res.status(statusCode).json({
        success: false,
        error: message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
};

module.exports = errorHandler;
