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
                { vaultId, balance: 15000 },
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
            await wallets.updateOne(
                {
                    vaultId: vaultId
                },
                {
                    $set: {
                        balance,
                        [currencyBalance.name]: currencyBalance.amount
                    }
                },
                {
                    upsert: true
                }
            );
           

            return wallets.findOne({ vaultId })
        },
        async getWallet({ email, vaultId }) {
            if (!await wallets.findOne({ vaultId })) {
                const error = new Error('Not Found');
                error.status = 409;
                error.message = "Wallet for " + email + " not found";
                throw error
            }

            return wallets.findOne({ vaultId })
        },
    }
};