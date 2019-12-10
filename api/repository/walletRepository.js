module.exports = (connection) => {
    const wallets = connection.collection('wallets');

    return {
        async createWallet({ vaultId }) {
            return wallets.insertOne(
                { vaultId },
            )
        },
    }
};