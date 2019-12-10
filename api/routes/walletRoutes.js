const isAuthenticated = require('../middleware/authentication')


module.exports = ({ createWallet }) => {
    const router = require('express').Router();

    router.post("/create", isAuthenticated, createWallet);

    return router;
}