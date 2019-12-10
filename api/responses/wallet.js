module.exports = {
    createWallet(email, res) {
        res.status(200).json('Wallet created for user ' + email);
    },

}