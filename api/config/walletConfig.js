module.exports = connection => {
    const userRepository = require('../repository/userRepository')(connection);
    const walletRepository = require('../repository/walletRepository')(connection);
    const walletService = require('../services/walletService')(walletRepository);
    const walletController = require('../controller/walletController')({ walletService, walletRepository, userRepository });
    const walletRoutes = require('../routes/walletRoutes')(walletController);

    return walletRoutes;
}