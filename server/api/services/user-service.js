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
    // console.log(req.body);
    const newuser = new User({
      _id: new mongoose.Types.ObjectId(),
      fname: req.body.fname,
      lname: req.body.lname,
      emailId: req.body.emailId,
      Phno: req.body.Phno,
      // address: {
        address1: req.body.address1,
        address2: req.body.address2,
        city: req.body.city,
        country: req.body.country,
        Azipcode: req.body.Azipcode,
      // },
      // payment: {
        cardno: req.body.cardno,
        cvv: req.body.cvv,
        expire: req.body.expire,
        name: req.body.name,
        Czipcode: req.body.Czipcode,
      // }
    });
    return newuser.save();
  }

  exports.getOneUser=function(req){
    const id = req.params.userId;
    return User.findById(id).exec();
  }

  exports.updateUser=function(req){
    const id = req.params.userId;
    const user = {};
    for(const temp of req.body){
      console.log(temp.value);
      user[temp.field] = temp.value;
    }
    // return User.update({_id: id},{$set: user}).exec();
    return User.findOneAndUpdate({_id: id},{$set: user}).exec();
  }

  exports.deleteUser=function(req){
    const id = req.params.userId;
    // return User.remove({_id: id}).exec();
    return User.findOneAndDelete({_id: id}).exec();
  }

  exports.inspectError=function(err,res){
    console.log(err);
    res.status(500).json({
      error: err
    });
  }
