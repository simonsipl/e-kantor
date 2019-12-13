const isAuthenticated = require('../middleware/authentication')


module.exports = ({ createWallet, exchange, getWallet }) => {
    const router = require('express').Router();

    router.post("/create", createWallet);
    router.post("/exchange", isAuthenticated, exchange)
    router.post("/getWallet", isAuthenticated, getWallet)


    return router;
}