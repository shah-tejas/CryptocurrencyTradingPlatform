  const OrderService = require('../services/order-service');

  exports.getAll=function(req,res,next){
    let Order = OrderService.getAllOrders(req);
    Order.then(data=>{
      if(data){ res.status(200).json({message: "Handling GET request", data: data }); }
      else{ res.status(404).json(null); }
    })
    .catch(err=>OrderService.inspectError(err,res));
  }


  exports.post=function(req,res,next){
    let Order = OrderService.createNewOrder(req);
    Order.then(result=>{
      res.status(201).json({
        messge: "Handling POST request",
        createdUser: result
      });
    })
    .catch(err=>OrderService.inspectError(err,res));
  }


  exports.getOne=function(req,res,next){
    let Order = OrderService.getOneOrder(req);
    Order.then(data=>{
      if(data){ res.status(200).json(data); }
      else{ res.status(404).json(null); }
    })
    .catch(err=>OrderService.inspectError(err,res));
  }


  exports.put=function(req,res,next){
    let Order = OrderService.updateOrder(req);
    Order.then(result=>{
      res.status(200).json({
        message: "Handling PUT request",
      });
    })
    .catch(err=>OrderService.inspectError(err,res));
  }


  exports.delete=function(req,res,next){
    let Order = OrderService.deleteOrder(req);
    Order.then(result=>{
      res.status(200).json({
        message: "Handling DELETE request",
      });
    })
    .catch(err=>OrderService.inspectError(err,res));
  }
