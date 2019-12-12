module.exports = {
    createWallet(email, res) {
        res.status(200).json('Wallet created for user ' + email);
    },
    exchangeCurrency(balance, currencyBalance, res){
        res.status(200).json({
            balance,
            currencyBalance,
            message: 'Vault balance updated'
        })
    }

}