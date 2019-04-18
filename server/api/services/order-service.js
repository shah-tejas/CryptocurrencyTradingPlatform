  const Order = require('../model/orders');
  const mongoose = require('mongoose');

  exports.getAllOrders=function(req){
    let queryParams= req.query;
    let orderType = queryParams['orderType'];
    let status = queryParams['status'];
    return Order.find({buy_or_sell: orderType, status: status}).sort( { created_date: 1 } ).exec();
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
    console.log("Im Here");
    let id = req.params.orderId;
    let neworder = Object.assign({}, req.body);
    neworder["completion_date"] = Date.now();
    neworder["status"] = "completed";
    neworder["matched_order_id"] = id;
    const persistOrder = new Order(neworder);
    return persistOrder.save()
    .then(data => {
      const oldorder = {
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

  exports.deleteOrder=function(req){
    const id = req.params.orderId;
    return Order.findOneAndDelete({_id: id}).exec();
  }

  exports.inspectError=function(err,res){
    res.status(500).json({
      error: err
    });
  }
