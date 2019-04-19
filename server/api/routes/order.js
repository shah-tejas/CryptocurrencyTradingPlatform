  module.exports = function (app) {
      const OrderController = require('../controllers/order-controller');
      // Sticky Routes for search and create.
      app.route('/orders').get(OrderController.getAll)
      .post(OrderController.post);

      // Sticky Routes for get, update and delete.
      app.route('/orders/:orderId').get(OrderController.getOne)
      .put(OrderController.put)
      .delete(OrderController.delete);
  };
