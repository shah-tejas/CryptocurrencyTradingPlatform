  /**
  * Services for User operations.
  */
  /**
   * @desc import UserSchema.
   */
  const User = require('../model/users');
  const mongoose = require('mongoose');


  exports.compare = function compare(a, b) {
    if (a.fname > b.fname) return 1;
    else if (b.fname > a.fname) return -1;
    else {
      if (a.lname > b.lname) return 1;
      else if (b.lname > a.lname) return -1;
      return 0;
    }
  }

  /**
   * Returns an Array of User Object
   *
   * @param {Promise} params {}
   */
  exports.getAllUsers = function () {
    return User.find().exec();
  }

  /**
   * Returns an Created User Object
   *
   * @param {Promise} params {req}
   */
  exports.createNewUser = function(req) {
    const newuser = new User(req.body);
    return newuser.save();
  }

  /**
   * Returns an one User Object based on the userId passed
   *
   * @param {Promise} params {req}
   */
  exports.getOneUser = function (req) {
    const id = req.params.userId;
    return User.findById(id).exec();
  }

  exports.getUserById = function (id) {
    return User.findById(id).exec();
  }
  
/**
 * Updates and returns the user object.
 *
 * @param {Object} sticky {User object}
 */
exports.updateUser = function (user) {
  const promise = User.findOneAndUpdate({_id: user._id}, user).exec();
  return promise;
};




/**
 * @desc to search a particular user using emailId
 */
exports.search = function (params) {
  console.log(params);
  const promise = User.find(params).exec();
  return promise;
};


  exports.deleteUser = function (req) {
    const id = req.params.userId;
    return User.findOneAndDelete({ _id: id }).exec();
  }

  /**
   * Dealing with request Error
   *
   * @param {Object} params {err, res}
   */
  exports.inspectError = function (err, res) {
    res.status(500).json({
      error: err
    });
  }

  /**
   * @desc to search a particular user using emailId
   */
  exports.search = function (params) {
    console.log(params);
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
