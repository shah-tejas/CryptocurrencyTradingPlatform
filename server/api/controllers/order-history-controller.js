  /**
  * @desc Controller for Order-History endpoints.
  */
  /**
  * @desc import OrderhistoryService.
  */
  const OrderHistoryService = require('../services/order-history-service');


  /**
  // * @desc get all Orders of a particular user with userId and status passed along with the url.
  * @return returns Order[] JSON object.
  * @param {request} {HTTP request object}
  * @param {response} {HTTP response object}
  */
  exports.getAll=function(req,res,next){
    /**
     * @desc calling the service to perform get.
     */
    let Order = OrderHistoryService.getAllOrderHistory(req);
    Order.then(data=>{
      if(data){ res.status(200).json({message: "Handling GET request", data: data }); }
      else{
        res.status(404).json(null);
      }
    })
    .catch(err=>OrderHistoryService.inspectError(err,res));
  }

  /**
   * @desc get update Order with given orderId.
   * @return returns Order JSON object.
   * @param {request} {HTTP request object}
   * @param {response} {HTTP response object}
   */
  exports.put=function(req,res,next){
    /**
     * @desc calling the service to perform update.
     */
    let Order = OrderHistoryService.updateOrder(req);
    Order.then(result=>{
      res.status(200).json({
        message: "Handling PUT request",
        data: result
      });
    })
    .catch(err=>OrderHistoryService.inspectError(err,res));
  }

  /**
   * @desc get delete Order with given orderId.
   * @return returns Order JSON object.
   * @param {request} {HTTP request object}
   * @param {response} {HTTP response object}
   */
  exports.delete=function(req,res,next){
    /**
     * @desc calling the service to perform delete.
     */
    let Order = OrderHistoryService.deleteOrder(req);
    Order.then(result=>{
      res.status(200).json({
        message: "Handling DELETE request",
      });
    })
    .catch(err=>OrderHistoryService.inspectError(err,res));
  }
