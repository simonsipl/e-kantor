module.exports = {
    login(email, res) {
        res.status(200).json(email + ' logged succesfull');
    },
    register(email, res) {
        res.status(200).json(email + ' user registred');
    },
    me(user, res) {
        res.status(200).json(user)
    }
}