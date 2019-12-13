const mapValues = require('lodash.mapvalues');
const responses = require('../responses/wallet');

const wrapWithTryCatch = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

function withErrorHandling(api) {
    return mapValues(api, wrapWithTryCatch);
}

module.exports = ({ walletService, walletRepository, userRepository }) => withErrorHandling({
    async createWallet(req, res, next) {
        const user = req.body
        await walletRepository.createWallet(user);
        responses.createWallet(user, res);
    },
    async exchange(req, res, next) {
        const { email, type, currencyBalance } = req.body
        const user = await userRepository.me({email});

        const wallet = await walletService.exchange(user, type, currencyBalance);
        responses.exchangeCurrency(wallet, res);
    },
    async getWallet(req, res, next) {
        const { email } = req.body;
        const user = await userRepository.me({ email });
        const wallet = await walletRepository.getWallet(user);
        responses.getWallet(wallet, res)
    }

})