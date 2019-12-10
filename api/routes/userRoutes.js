const validateUser = require('../middleware/validateUserMiddleware');
const isAuthenticated = require('../middleware/authentication')
module.exports = ({ register, login, me }) => {
    const router = require('express').Router();

    router.post("/register", validateUser, register);
    router.post("/login", validateUser, login);
    router.post("/me", isAuthenticated, me);


    return router;
}