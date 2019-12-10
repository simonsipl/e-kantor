module.exports = (connection) => {
    const users = connection.collection('users');
    return {
        async me({ email }) {
            const user = await users.findOne({ email })

            if (!user) {
                const error = new Error('Bad request');
                error.status = 400;
                error.message = 'User not found';
                throw error
            }
            return user
        },

        async register({ email, password, name, surname, vaultId }) {

            if (await users.findOne({ email })) {
                const error = new Error('Not Found');
                error.status = 409;
                error.message = 'Email "' + email + '" is already taken';
                throw error
            }

            return users.insertOne(
                { email, password, name, surname, vaultId },
            )

        }
    }
};