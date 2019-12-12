module.exports = connection => {
    const userRepository = require('../repository/userRepository')(connection);
    const userService = require('../services/userService')(userRepository);
    const userController = require('../controller/userController')({ userService, userRepository });
    const userRoutes = require('../routes/userRoutes')(userController);

    return userRoutes;
}