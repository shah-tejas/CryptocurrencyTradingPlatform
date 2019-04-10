  const Order = require('../model/orders');
  const mongoose = require('mongoose');

  exports.getAllOrders=function(req){
    console.log(req.body);
    let type = req.body.order_type;
    return Order.find({order_type: type}).exec();
  }

  exports.createNewOrder=function(req){
    console.log(req.body);
    let neworder = new Order(req.body);
    return neworder.save();
  }

  exports.getOneOrder=function(req){
    console.log(req.body);
    const id = req.params.orderId;
    return Order.find({_id: id}).exec();
  }

  exports.updateOrder=function(req){
    console.log(req.body);
    const id = req.params.orderId;
    const changes = {};
    for(const temp of req.body){
      changes[temp.field] = temp.value;
    }
    return Order.findOneAndUpdate({_id: id},{$set: changes}).exec();
  }

  exports.deleteOrder=function(req){
    console.log(req.body);
    const id = req.params.orderId;
    return Order.findOneAndDelete({_id: id}).exec();
    // let type = req.body.order_type;
    // return Order.findOneAndDelete({order_type: type}).exec();
  }

  exports.inspectError=function(err,res){
    res.status(500).json({
      error: err
    });
  }
