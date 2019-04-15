  const User = require('../model/users');
  const mongoose = require('mongoose');

  // exports.compare = function compare(a, b) {
  //   if (a.fname > b.fname) return 1;
  //   else if (b.fname > a.fname) return -1;
  //   else {
  //     if (a.lname > b.lname) return 1;
  //     else if (b.lname > a.lname) return -1;
  //     return 0;
  //   }
  // }


  exports.createNewUser=function(req){
    const newuser = new User(req.body);
    return newuser.save();
  }

  exports.getAllUsers = function () {
    return User.find().exec();
  }

  exports.updateUser=function(req){
    const user = Object.assign({}, req.body);
    return User.findOneAndUpdate({_id: user._id}, user).exec();
  }

  exports.getOneUser = function (req) {
    const id = req.params.userId;
    return User.findById(id).exec();
  }

  exports.deleteUser = function (req) {
    const id = req.params.userId;
    return User.findOneAndDelete({ _id: id }).exec();
  }

  exports.inspectError = function (err, res) {
    res.status(500).json({
      error: err
    });
  }

  /**
   * @desc to search a particular user using emailId
   */
  exports.search = function (params) {
    const promise = User.find(params).exec();
    return promise;
  };

  /**
   * @param {Object} user {User object}-Saves and returns the new Contact object.
   */
  exports.save = function (user) {
    const newUser = new User(user);
        const promise = newUser.save();
        return promise;
  };
