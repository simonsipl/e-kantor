const validateUser = require('./validators/user');

module.exports = function validate(req,res,next) {
    const validateErrors = validateUser(req.body);

    if(validateErrors) {
        const error = new Error();
        error.message = validateErrors;
        error.status = 400;
        next(error);
    } else {
        next();
    }
};