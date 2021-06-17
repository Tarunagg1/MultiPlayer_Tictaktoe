const tictaktoeRoute = require('./tictactoeroute');
const router = require('express').Router();
const authRoute = require('./authRoute');

module.exports = app => {
    app.use('/api/tictaktoe', tictaktoeRoute);
    app.use('/api/tictaktoe/auth', authRoute);
};
