  'use strict';
  module.exports = function (app) {
      //Initialize models
      let walletModel = require('./model/wallet');
      let walletHistoryModel = require('./model/wallet-history');
      let userModel = require('./model/users');
      const rateModel = require('./model/RateList');
      let orderModel = require('./model/orders');


      //Initialize routes
      let walletRoutes = require('./routes/wallet-route');
      walletRoutes(app);
      let userRoutes = require('./routes/user');
      userRoutes(app);
      const rateRoutes = require('./routes/rateList-route');
      rateRoutes(app);
      let orderRoutes = require('./routes/order');
      orderRoutes(app);
      let orderHistoryRoutes = require('./routes/order-history');
      orderHistoryRoutes(app);
  };
