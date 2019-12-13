module.exports = {
    login(email, res) {
        res.status(200).json(email);
    },
    register({email,vaultId}, res) {
        res.status(200).json({ email: email, vaultId: vaultId });
    },
    me(user, res) {
        res.status(200).json(user)
    }
}