  const Order = require('../model/orders');
  const mongoose = require('mongoose');

  exports.getAllOrders=function(req){
    let type = req.body.buy_or_sell;
    return Order.find({buy_or_sell: type}).sort( { created_date: 1 } ).exec();
  }

  exports.createNewOrder=function(req){
    let neworder = new Order(req.body);
    return neworder.save();
  }

  exports.getOneOrder=function(req){
    const id = req.params.orderId;
    return Order.find({_id: id}).exec();
  }

  exports.updateOrder=function(req){
    const order = Object.assign({}, req.body);
    order.completion_date = Date.now;
    return Order.findOneAndUpdate({_id: order._id}, order).exec();
  }

  exports.deleteOrder=function(req){
    const id = req.params.orderId;
    return Order.findOneAndDelete({_id: id}).exec();
  }

  exports.inspectError=function(err,res){
    res.status(500).json({
      error: err
    });
  }
