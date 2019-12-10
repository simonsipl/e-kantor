const bcrypt = require('bcryptjs');
const HASHING_ROUNDS = Number(process.env.BCRYPT_ROUNDS) || 12;

module.exports = (walletRepository) => ({
    async createWallet({ email, vaultId }) {
        console.log(vaultId)
        const hashedVaultId = await bcrypt.hash(vaultId, HASHING_ROUNDS);
        return await walletRepository.createWallet({ email, hashedVaultId })
    }
});