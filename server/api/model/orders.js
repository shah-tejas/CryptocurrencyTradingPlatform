  const mongoose = require('mongoose');

  const OrderSchema = new mongoose.Schema({
    user_id: {type: String, required: true},
    status: {type: String, default: "pending"},
    matched_user_id: {type: String, default: ""},
    order_type: String,
    for_coin: {type: String, required: true},
    for_qty: {type: Number, required: true},
    for_value: {type: Number, required: true},
    exchange_coin: {type: String, required: true},
    completion_date: {type: Date, default: Date.now}
  });

  module.exports = mongoose.model('Order', OrderSchema);
