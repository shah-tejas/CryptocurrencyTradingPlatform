 const Order = require('../model/orders');
const mongoose = require('mongoose');


/**
 * gets an array of Order Objects with a given userId and order-status
 *
 * @param {Promise} params {req}
 */
exports.getAllOrderHistory=function(req){
  let user_id = req.params.userId;
  let status = req.params.status;
  console.log(status);
  return Order.find({user_id: user_id, status: status}).sort( { created_date: -1 } ).exec();
}

/**
 * Performs a update of a users Order with given orderId,
 * the update is done by the Client side sent Order Object
 * and the manually changing the copletion date to todays date also the status to canceled
 *
 * @param {Promise} params {req}
 */
exports.updateOrder=function(req){
  const order = Object.assign({}, req.body);
  const id = req.params.orderId;
  order["completion_date"] = Date.now();
  order.status = "canceled"
  return Order.findOneAndUpdate({_id: id}, order).exec();
}

/**
 * Performs a delete of a users Order with given orderId
 *
 * @param {Promise} params {req}
 */
exports.deleteOrder=function(req){
  const id = req.params.orderId;
  return Order.findOneAndDelete({_id: id, status: "pending"}).exec();
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
