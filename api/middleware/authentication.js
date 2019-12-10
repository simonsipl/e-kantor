module.exports = function isAuthenticated(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        const error = new Error('Unauthorized');
        error.status = 401;
        error.message = 'Unauthorized';
        next(error)
    }
};
