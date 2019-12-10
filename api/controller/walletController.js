const mapValues = require('lodash.mapvalues');
const responses = require('../responses/wallet');

const wrapWithTryCatch = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

function withErrorHandling(api) {
    return mapValues(api, wrapWithTryCatch);
}

module.exports = ({ walletService, walletRepository, userRepository }) => withErrorHandling({
    async createWallet(req, res, next) {
        const user = await userRepository.me({ email });

        await walletService.createWallet(req.body);
        responses.createWallet(req, res);
    },
    
})