const express = require('express');
const path = require('path');
const userSession = require('./middleware/session');

const userConfig = require('./config/userConfig');
const walletConfig = require('./config/walletConfig');


const { notFoundError, serverError } = require('./errors/error');

module.exports = (connection) => {
    const app = express();
    app.use(express.json());
    const {session} = userSession()
    app.use(session)

    if (process.env.NODE_ENV === 'production') {
        // Set static folder
        app.use(express.static(path.join(__dirname, '../spa/build')));
    }

    app.use('/api/user', userConfig(connection));
    app.use('/api/wallet', walletConfig(connection));


    app.use(notFoundError);
    app.use(serverError);

    return app;
};