const mapValues = require('lodash.mapvalues');
const responses = require('../responses/wallet');

const wrapWithTryCatch = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

function withErrorHandling(api) {
    return mapValues(api, wrapWithTryCatch);
}

module.exports = ({ walletService, walletRepository, userRepository }) => withErrorHandling({
    async createWallet(req, res, next) {
        const { email } = req.body
        const user = await userRepository.me({ email });
        await walletRepository.createWallet(user);
        responses.createWallet(email, res);
    },
    async exchange(req, res, next) {
        const { email, balance, currencyBalance } = req.body
        const user = await userRepository.me({ email });
        await walletRepository.exchange(user, balance, currencyBalance);
        responses.exchangeCurrency(balance, currencyBalance, res);

    }

})