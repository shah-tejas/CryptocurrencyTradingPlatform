  module.exports = function (app) {
    const OrderHistoryController = require('../controllers/order-history-controller');
    /**
    * @desc orderHistory Routes to Update Based on orderId, Delete Based on orderId.
    */
    app.route('/orderhistory/:orderId')
      .put(OrderHistoryController.put)
      .delete(OrderHistoryController.delete);

    /**
    * @desc orderHistory Routes to search based on userId and status.
    */
    app.route('/orderhistory/:userId/:status').get(OrderHistoryController.getAll);

  };
