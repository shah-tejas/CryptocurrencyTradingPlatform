  'use strict';
  module.exports = function (app) {
      //Initialize models
      let userModel = require('./model/users');
      let orderModel = require('./model/orders');

      //Initialize routes
      let userRoutes = require('./routes/user');
      userRoutes(app);
      let orderRoutes = require('./routes/order');
      orderRoutes(app);
  };
