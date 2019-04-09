
  const mongoose = require('mongoose');

  // const AddressSchema = new mongoose.Schema({
  //   address1: String,
  //   address2: String,
  //   city: String,
  //   country: String,
  //   zipcode: Number
  // });
  //
  // mongoose.model('Addresses',AddressSchema);
  //
  // const PaymentSchema = new mongoose.Schema({
  //   cardno: { type: Number, unique: true},
  //   cvv: { type: Number, unique: true},
  //   expire: String,
  //   name: String,
  //   zipcode: Number
  // });
  // mongoose.model('Payment',PaymentSchema);

  const UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fname: String,
    lname: String,
    emailId: { type: String, unique: true},
    Phno:  { type: Number, unique: true},
    // address: AddressSchema,
    address1: String,
    address2: String,
    city: String,
    country: String,
    Azipcode: Number,
    // payment: PaymentSchema
    cardno: { type: Number, unique: true},
    cvv: { type: Number, unique: true},
    expire: String,
    name: String,
    Czipcode: Number
  });

  module.exports = mongoose.model('User',UserSchema);
