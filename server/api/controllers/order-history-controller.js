  const OrderHistoryService = require('../services/order-history-service');

  exports.getAll=function(req,res,next){
    let Order = OrderHistoryService.getAllOrderHistory(req);
    Order.then(data=>{
      if(data){ res.status(200).json({message: "Handling GET request", data: data }); }
      else{
        res.status(404).json(null);
      }
    })
    .catch(err=>OrderHistoryService.inspectError(err,res));
  }

  exports.put=function(req,res,next){
    let Order = OrderHistoryService.updateOrder(req);
    Order.then(result=>{
      res.status(200).json({
        message: "Handling PUT request",
        data: result
      });
    })
    .catch(err=>OrderHistoryService.inspectError(err,res));
  }

  exports.delete=function(req,res,next){
    let Order = OrderHistoryService.deleteOrder(req);
    Order.then(result=>{
      res.status(200).json({
        message: "Handling DELETE request",
      });
    })
    .catch(err=>OrderHistoryService.inspectError(err,res));
  }
