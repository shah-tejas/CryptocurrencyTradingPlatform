const Order = require('../model/orders');
const mongoose = require('mongoose');

exports.getAllOrderHistory=function(req){
  let user_id = req.params.userId;
  console.log(req.body);
  return Order.find({user_id: user_id}).sort( { created_date: -1 } ).exec();
}

exports.updateOrder=function(req){
  console.log(req.body);
  const order = Object.assign({}, req.body);
  order.completion_date = Date.now;
  return Order.findOneAndUpdate({_id: order._id}, order).exec();
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
