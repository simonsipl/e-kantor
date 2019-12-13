module.exports = {
    createWallet({email}, res) {
        res.status(200).json('Wallet created for user ' + email);
    },
    exchangeCurrency(wallet, res){
        res.status(200).json({
            wallet,
            message: 'Vault balance updated'
        })
    },
    getWallet(wallet, res) {
        res.status(200).json(wallet);
    },

}