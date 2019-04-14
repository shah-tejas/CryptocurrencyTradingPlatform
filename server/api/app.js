'use strict';
module.exports = function (app) {
    //Initialize models
    let walletModel = require('./model/wallet');
    let walletHistoryModel = require('./model/wallet-history');
    let userModel = require('./model/users');
    const rateModel = require('./model/RateList');

    //Initialize routes
    let walletRoutes = require('./routes/wallet-route');
    walletRoutes(app);
    let userRoutes = require('./routes/user');
    userRoutes(app);
    const rateRoutes = require('./routes/rateList-route');
    rateRoutes(app);
};