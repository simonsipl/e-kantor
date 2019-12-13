
module.exports = (walletRepository) => ({
    async exchange(user, type, currencyBalance) {
        let balance;

        const wallet = await walletRepository.getWallet(user)
        const { amount, price, unit, name } = currencyBalance
        let walletBalance = wallet[name] ? wallet[name] : 0;

        switch (type) {
            case 'Sell':
                if (walletBalance < amount) {
                    return wallet
                }

                currencyBalance.amount = Number(walletBalance - amount);

                balance = Number(wallet.balance + (amount * price) / unit)
                return await walletRepository.exchange(user, balance, currencyBalance);
            case 'Buy':
                if (wallet.balance < (amount * price) / unit) {
                    return wallet
                }
                currencyBalance.amount = Number(walletBalance + amount);

                balance = Number(wallet.balance - (amount * price) / unit)
                return await walletRepository.exchange(user, balance, currencyBalance);
        }



    }
});