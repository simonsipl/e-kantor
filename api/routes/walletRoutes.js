const isAuthenticated = require('../middleware/authentication')


module.exports = ({ createWallet, exchange }) => {
    const router = require('express').Router();

    router.post("/create", isAuthenticated, createWallet);
    router.post("/exchange", isAuthenticated, exchange)

    return router;
}