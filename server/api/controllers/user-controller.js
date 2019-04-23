  /**
   * @desc Controller for User endpoints.
   */
  /**
  * @desc import UserService.
  */
  const UserService = require('../services/user-service');


  /**
   * @desc get all Users.
   * @return returns User[] JSON object.
   * @param {request} {HTTP request object}
   * @param {response} {HTTP response object}
   */
  exports.getAll=function(req,res,next){
    /**
     * @desc calling the service to perform get.
     */
    let User = UserService.getAllUsers();
    User.then(data=>{
      data.sort(UserService.compare);
      if(data){ res.status(200).json({message: "Handling GET request", data: data }); }
      else{ res.status(404).json(null); }
    })
    .catch(err=>UserService.inspectError(err,res));
  }

  /**
   * @desc create an User based on the object passed in the request body.
   * @return returns User JSON object.
   * @param {request} {HTTP request object}
   * @param {response} {HTTP response object}
   */
  exports.post=function(req,res,next){
    /**
     * @desc calling the service to perform post.
     */
    let User = UserService.createNewUser(req);
    User.then(result=>{
      res.status(201).json({
        messge: "Handling POST request",
        createdUser: result
      });
    })
    .catch(err=>UserService.inspectError(err,res));
  }


  /**
   * @desc get one User based on userId.
   * @return returns User JSON object.
   * @param {request} {HTTP request object}
   * @param {response} {HTTP response object}
   */
  exports.getOne=function(req,res,next){
    /**
     * @desc calling the service to perform get by userId.
     */
    let User = UserService.getOneUser(req);
    User.then(data=>{
      if(data){ res.status(200).json(data); }
      else{ res.status(404).json(null); }
    })
    .catch(err=>UserService.inspectError(err,res));
  }

  /**
   * @desc update User with userId passed in request url.
   * @return returns String JSON object.
   * @param {request} {HTTP request object}
   * @param {response} {HTTP response object}
   */
  exports.put=function(req,res,next){
    /**
     * @desc calling the service to perform update.
     */
    let User = UserService.updateUser(req);
    User.then(result=>{
      res.status(200).json({
        message: "Handling PATCH request",
      });
    })
    .catch(err=>UserService.inspectError(err,res));
  }

  /**
   * @desc delete a user with userId passed with the request url.
   * @return returns String JSON object.
   * @param {request} {HTTP request object}
   * @param {response} {HTTP response object}
   */
  exports.delete=function(req,res,next){
    /**
     * @desc calling the service to perform delete.
     */
    let User = UserService.deleteUser(req);
    User.then(result=>{
      res.status(200).json({
        message: "Handling DELETE request",
      });
    })
    .catch(err=>UserService.inspectError(err,res));
  }
