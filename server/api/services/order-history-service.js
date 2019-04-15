const Order = require('../model/orders');
const mongoose = require('mongoose');

exports.getAllOrderHistory=function(req){
  let user_id = req.params.userId;
  let status = req.params.status;
  return Order.find({user_id: user_id, status: status}).sort( { created_date: -1 } ).exec();
}

exports.updateOrder=function(req){
  const order = Object.assign({}, req.body);
  const id = req.params.orderId;
  order["completion_date"] = Date.now();
  order.status = "canceled"
  return Order.findOneAndUpdate({_id: id}, order).exec();
}

exports.deleteOrder=function(req){
  const id = req.params.orderId;
  return Order.findOneAndDelete({_id: id, status: "pending"}).exec();
}

exports.inspectError=function(err,res){
  res.status(500).json({
    error: err
  });
}
