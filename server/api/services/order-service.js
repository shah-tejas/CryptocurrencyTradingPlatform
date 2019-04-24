  const Order = require('../model/orders');
  const mongoose = require('mongoose');

  /**
   * gets an array of Order Objects with a given orderType(BUY/SELL) and order-status
   *
   * @param {Promise} params {req}
   */
  exports.getAllOrders=function(req){
    let queryParams= req.query;
    let orderType = queryParams['orderType'];
    let status = queryParams['status'];
    return Order.find({buy_or_sell: orderType, status: status}).sort( { created_date: 1 } ).exec();
  }

  /**
   * saves a new Order Object
   *
   * @param {Promise} params {req}
   */
  exports.createNewOrder=function(req){
    let neworder = new Order(req.body);
    return neworder.save();
  }

  /**
   * get One Order based on the orderId
   *
   * @param {Promise} params {req}
   */
  exports.getOneOrder=function(req){
    const id = req.params.orderId;
    return Order.find({_id: id}).exec();
  }

  /** this is the service that matches two Order
   * gets a new Order to be persisted and also the OrderId to which this Order has to matched and viso-vesa
   * mathces this order with exact oposite of this order, changes
   *
   * @param {Promise} params {req}
   */
  exports.updateOrder=function(req){
    console.log("Im Here");
    let id = req.params.orderId;
    let neworder = Object.assign({}, req.body);
    neworder["completion_date"] = Date.now();
    neworder["status"] = "completed";

    // setting the Matched_order_id of the new Order with the OrderId the user clicked on
    // the matching orderId is sent via the url, while the new Order to be created in the request body.
    neworder["matched_order_id"] = id;
    const persistOrder = new Order(neworder);
    return persistOrder.save()
    .then(data => {
      const oldorder = {
        // the persisted Order's Id is set as the matched_order_id of the Alredy present OrderId
        // to which the User Order Id matched or selected
        matched_order_id: data._id,
        status: "completed",
        completion_date: Date.now()
      }
      Order.findOneAndUpdate(
        {_id: data.matched_order_id},
        {$set: oldorder}
      ).exec();
    })
    .catch(err => console.log(err));
  }

  /**
   * get One Order to be Deleted based on orderId.
   *
   * @param {Promise} params {req}
   */
  exports.deleteOrder=function(req){
    const id = req.params.orderId;
    return Order.findOneAndDelete({_id: id}).exec();
  }

  /**
   * Dealing with request Error
   *
   * @param {Object} params {err, res}
   */
  exports.inspectError=function(err,res){
    res.status(500).json({
      error: err
    });
  }
