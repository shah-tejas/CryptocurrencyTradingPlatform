  module.exports = function (app) {
      const OrderController = require('../controllers/order-controller');
      /**
       * @desc Order Routes to search based orderType and create.
        */
      app.route('/orders').get(OrderController.getAll)
      .post(OrderController.post);

      /**
       * @desc Order Routes to search based orderId, Update based on orderId and Delete based on orderId.
        */
      app.route('/orders/:orderId').get(OrderController.getOne)
      .put(OrderController.put)
      .delete(OrderController.delete);
  };
