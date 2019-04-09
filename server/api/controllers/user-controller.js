const UserService = require('../services/user-service');



exports.getAll=function(req,res,next){
  let User = UserService.getAllUsers();
  User.then(data=>{
    console.log(data);
    data.sort(UserService.compare);
    if(data){ res.status(200).json({message: "Handling GET request", data: data }); }
    else{ res.status(404).json(null); }
  })
  .catch(err=>UserService.inspectError(err,res));
}


exports.post=function(req,res,next){
  console.log(req);
  let User = UserService.createNewUser(req);
  User.then(result=>{
    console.log(result);
    res.status(201).json({
      messge: "Handling POST request",
      body: req.body,
      createdUser: result
    });
  })
  .catch(err=>UserService.inspectError(err,res));
}


exports.getOne=function(req,res,next){
  let User = UserService.getOneUser(req);
  User.then(data=>{
    console.log(data);
    if(data){ res.status(200).json(data); }
    else{ res.status(404).json(null); }
  })
  .catch(err=>UserService.inspectError(err,res));
}


exports.put=function(req,res,next){
  let User = UserService.updateUser(req);
  User.then(result=>{
    console.log(result);
    res.status(200).json({
      message: "Handling PATCH request",
    });
  })
  .catch(err=>UserService.inspectError(err,res));
}


exports.delete=function(req,res,next){
  let User = UserService.updateUser(req);
  User.then(result=>{
    console.log(result);
    res.status(200).json({
      message: "Handling DELETE request",
    });
  })
  .catch(err=>UserService.inspectError(err,res));
}
