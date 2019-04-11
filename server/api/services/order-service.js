  const Order = require('../model/orders');
  const mongoose = require('mongoose');

  exports.getAllOrders=function(req){
    console.log(req.body);
    let type = req.body.buy_or_sell;
    return Order.find({buy_or_sell: type}).exec();
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
    const order = Object.assign({}, req.body);
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
