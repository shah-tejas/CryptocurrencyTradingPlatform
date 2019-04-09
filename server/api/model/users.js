
  const mongoose = require('mongoose');

  const UserSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    emailId: { type: String, unique: true, required: true},
    Phno:  { type: Number, unique: true},
    address: {
      address1: String,
      address2: String,
      city: String,
      country: String,
      zipcode: Number,
    },
    payment: {
      cardno: { type: Number, unique: true, required: true},
      cvv: { type: Number, unique: true, required: true},
      expire: String,
      name: String,
      zipcode: Number
    }
  });

  module.exports = mongoose.model('User',UserSchema);
