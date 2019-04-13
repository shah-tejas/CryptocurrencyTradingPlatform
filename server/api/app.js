  'use strict';
  module.exports = function (app) {
      //Initialize models
      let walletModel = require('./model/wallet');
      let walletHistoryModel = require('./model/wallet-history');
      let userModel = require('./model/users');
      let orderModel = require('./model/orders');

      //Initialize routes
      let walletRoutes = require('./routes/wallet-route');
      walletRoutes(app);
      let userRoutes = require('./routes/user');
      userRoutes(app);
      let orderRoutes = require('./routes/order');
      orderRoutes(app);
  };
