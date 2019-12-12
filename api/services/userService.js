const bcrypt = require('bcryptjs');
const HASHING_ROUNDS = Number(process.env.BCRYPT_ROUNDS) || 12;
const uuid = require('uuid');

module.exports = userRepository => ({
    async register({ email, password, name, surname }) {
        const hashedPassword = await bcrypt.hash(password, HASHING_ROUNDS);
        const vaultId = uuid.v4();
        return await userRepository.register({ email, password: hashedPassword, name, surname, vaultId })
    }
});