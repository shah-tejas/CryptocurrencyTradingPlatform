'use strict';
module.exports = function (app) {
    //Initialize models
    let walletModel = require('./model/wallet');
    let walletHistoryModel = require('./model/wallet-history');
    let userModel = require('./model/users');

    //Initialize routes
    let walletRoutes = require('./routes/wallet-route');
    walletRoutes(app);
    let userRoutes = require('./routes/user');
    userRoutes(app);
};