  'use strict';
  module.exports = function (app) {
      //Initialize models
      let userModel = require('./model/users');

      //Initialize routes
      let userRoutes = require('./routes/user');
      userRoutes(app);
  };
