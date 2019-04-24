  /**
  * @desc import mongoose Object.
  */
  const mongoose = require('mongoose');
  /**
   * Mongoose schema for User object.
   * This schema represents each transaction conducted on Order
   */
  const UserSchema = new mongoose.Schema({
    /**
     * First Nmae of the User.
     */
    fname: String,
    /**
     * Last Nmae of the User.
     */
    lname: String,
    /**
     * EmailId of the User.
     */
    emailId: { type: String, unique: true, required: true},
    /**
     * Phno of the User.
     */
    Phno:  { type: Number},
    /**
     * Address Object associated with User.
     */
    address: {
      address1: String,
      address2: String,
      city: String,
      country: String,
      zipcode: Number,
    },
    /**
     * Payment Details Accociated with User.
     */
    payment: {
      cardno: { type: Number, required: true},
      cvv: { type: Number, required: true},
      expire: String,
      name: String,
      zipcode: Number
    },
    /**
     * Login Details of the  User, this is used to login.
     */
    login: {
      username: { type: String, unique: true, required: true},
      password: String
    }
  });

  module.exports = mongoose.model('User',UserSchema);
