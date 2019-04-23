  /**
   * @desc Controller for Order endpoints.
   */
 /**
  * @desc import OrderService.
  */
  const OrderService = require('../services/order-service');

  /**
   * @desc get all Orders depending on the type and status mentioned in the request
   * @return returns Order[] JSON object.
   * @param {request} {HTTP request object}
   * @param {response} {HTTP response object}
   */
  exports.getAll=function(req,res,next){
    /**
     * @desc calling the service to perform get.
     */
    let Order = OrderService.getAllOrders(req);
    Order.then(data=>{
      if(data){ res.status(200).json({message: "Handling GET request", data: data }); }
      else{ res.status(404).json(null); }
    })
    .catch(err=>OrderService.inspectError(err,res));
  }


  /**
   * @desc creates an Order passed in request object.
   * @return returns Order JSON object.
   * @param {request} {HTTP request object}
   * @param {response} {HTTP response object}
   */
  exports.post=function(req,res,next){
    /**
     * @desc calling the service to perform save.
     */
    let Order = OrderService.createNewOrder(req);
    Order.then(result=>{
      res.status(201).json({
        messge: "Handling POST request",
        createdUser: result
      });
    })
    .catch(err=>OrderService.inspectError(err,res));
  }

  /**
   * @desc gets one Order based on OrderID passed along with request body.
   * @return returns Order JSON object.
   * @param {request} {HTTP request object}
   * @param {response} {HTTP response object}
   */
  exports.getOne=function(req,res,next){
    /**
     * @desc calling the service to get by orderId.
     */
    let Order = OrderService.getOneOrder(req);
    Order.then(data=>{
      if(data){ res.status(200).json(data); }
      else{ res.status(404).json(null); }
    })
    .catch(err=>OrderService.inspectError(err,res));
  }

  /**
   * @desc Updates one Order based on OrderID and a new Order object with fields to be updated are mentioned in request body.
   * @return returns String JSON object.
   * @param {request} {HTTP request object}
   * @param {response} {HTTP response object}
   */
  exports.put=function(req,res,next){
    /**
     * @desc calling the service to update on Order with orderId.
     */
    let Order = OrderService.updateOrder(req);
    Order.then(result=>{
      res.status(200).json({
        message: "Handling PUT request",
      });
    })
    .catch(err=>OrderService.inspectError(err,res));
  }

  /**
   * @desc Deletes one Order based on OrderID.
   * @return returns String JSON object.
   * @param {request} {HTTP request object}
   * @param {response} {HTTP response object}
   */
  exports.delete=function(req,res,next){
    /**
     * @desc calling the service to delete an Order with orderId.
     */
    let Order = OrderService.deleteOrder(req);
    Order.then(result=>{
      res.status(200).json({
        message: "Handling DELETE request",
      });
    })
    .catch(err=>OrderService.inspectError(err,res));
  }
