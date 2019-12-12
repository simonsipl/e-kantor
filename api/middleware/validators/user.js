const Joi = require('@hapi/joi');

const schema = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/),
    name: Joi.string(),
    surname: Joi.string(),
});

module.exports = function validateUser(user) {
    const result = schema.validate(user, { allowUnknown: true, convert: true, abortEarly:false });
    return result.error ? result.error.details : null;
}