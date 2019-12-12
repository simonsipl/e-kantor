const session = require('express-session');

module.exports = () => {
    const userSession = session({
        secret: 'sessionsecret',
        resave: false,
        saveUninitialized: false,
        cookie: {httpOnly:false},
        name: 'user-session'
    });
    return {session: userSession}
}