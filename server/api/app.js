'use strict';
module.exports = function (app) {
    //Initialize models
    let walletModel = require('./model/wallet');
    let walletHistoryModel = require('./model/wallet-history');

    //Initialize routes
    let walletRoutes = require('./routes/wallet-route');
    walletRoutes(app);
};