  const User = require('../model/users');
  const mongoose = require('mongoose');

  exports.compare = function compare(a, b){
    if (a.fname > b.fname) return 1;
    else if (b.fname > a.fname) return -1;
    else {
      if (a.lname > b.lname) return 1;
      else if (b.lname > a.lname) return -1;
      return 0;
    }
  }

  exports.getAllUsers=function(){
    return User.find().exec();
  }

  exports.createNewUser=function(req){
    console.log(req.body);
    const newuser = new User(req.body);
    return newuser.save();
  }

  exports.getOneUser=function(req){
    const id = req.params.userId;
    return User.findById(id).exec();
  }

  exports.updateUser=function(req){
    console.log(req.body);
    const user = Object.assign({}, req.body);
    return User.findOneAndUpdate({_id: user._id}, user).exec();
  }

  exports.deleteUser=function(req){
    const id = req.params.userId;
    return User.findOneAndDelete({_id: id}).exec();
  }

  exports.inspectError=function(err,res){
    res.status(500).json({
      error: err
    });
  }
