const bcrypt = require('bcryptjs');
const HASHING_ROUNDS = Number(process.env.BCRYPT_ROUNDS) || 12;

module.exports = (walletRepository) => ({
    async createWallet({ user }) {
        console.log(user)
        const hashedVaultId = await bcrypt.hash(user.vaultId, HASHING_ROUNDS);
        return await walletRepository.createWallet({ hashedVaultId })
    }
});