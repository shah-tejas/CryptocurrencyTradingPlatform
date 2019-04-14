  module.exports = function (app) {
      const OrderHistoryController = require('../controllers/order-history-controller');
      // Sticky Routes for search and create.
      app.route('/orderhistory').get(OrderHistoryController.getAll)

      // Sticky Routes for get, update and delete.
      app.route('/orderhistory/:orderId').put(OrderHistoryController.put)
      .delete(OrderHistoryController.delete);
  };
