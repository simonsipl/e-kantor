const mapValues = require('lodash.mapvalues');
const bcrypt = require('bcryptjs');
const responses = require('../responses/user');

const wrapWithTryCatch = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

function withErrorHandling(api) {
    return mapValues(api, wrapWithTryCatch);
}

module.exports = ({ userService, userRepository }) => withErrorHandling({
    async register(req, res, next) {
        const user = await userService.register(req.body);
        responses.register(user, res);
    },
    async login(req, res, next) {
        const { email, password } = req.body;
        const user = await userRepository.me({ email });

        if (user && await bcrypt.compare(password, user.password)) {

            req.session.user = { userId: user._id }
            responses.login(req.body.email, res)
        }
    },

    async me(req, res, next) {
        const { email } = req.body
        const user = await userRepository.me({ email })

        responses.me(user, res)
    }
})