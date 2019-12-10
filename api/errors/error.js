module.exports = {
    notFoundError(req, res, next) {
        const error = new Error('Not Found');
        error.status = 404;
        next(error);
    },
    serverError(err, req, res, next ) {
        res.status(err.status || 500);
        res.json({ message: err.message, error: isProduction() ? '' : err.stack });
    },
};

function isProduction() {
    return process.env.NODE_ENV === 'production';
}