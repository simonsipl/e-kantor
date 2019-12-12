module.exports = (connection) => {
    const wallets = connection.collection('wallets');

    return {
        async createWallet({ email, vaultId }) {
            if (await wallets.findOne({ vaultId })) {
                const error = new Error('Not Found');
                error.status = 409;
                error.message = "Wallet for " + email + " is already exists";
                throw error
            }

            return wallets.insertOne(
                { vaultId },
                { upsert: true }
            )
        },
        async exchange({ vaultId }, balance, currencyBalance) {

            if (!await wallets.findOne({ vaultId })) {
                const error = new Error('Not Found');
                error.status = 409;
                error.message = "Wallet with id " + vaultId + " is doesn't exists";
                throw error
            }
          
            return wallets.updateOne(
                {
                    vaultId: vaultId
                },
                {
                    $set: {
                        balance,
                        currencyBalance
                    }
                },
                { upsert: true }
            )
        }
    }
};