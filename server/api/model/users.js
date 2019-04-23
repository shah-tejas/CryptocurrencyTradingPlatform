
  const mongoose = require('mongoose');
  
  const UserSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    emailId: { type: String, unique: true, required: true},
    Phno:  { type: Number},
    address: {
      address1: String,
      address2: String,
      city: String,
      country: String,
      zipcode: Number,
    },
    payment: {
      cardno: { type: Number, required: true},
      cvv: { type: Number, required: true},
      expire: String,
      name: String,
      zipcode: Number
    },
    login: {
      username: { type: String, unique: true, required: true},
      password: String
    }
  });

  module.exports = mongoose.model('User',UserSchema);
