  const mongoose = require('mongoose');

  const OrderSchema = new mongoose.Schema({
    user_id: {type: String, required: true},
    status: {type: String, default: "pending"},
    matched_order_id: {type: String, default: ""},
    buy_or_sell: String,
    from_coin: {type: String, required: true},
    from_qty: {type: Number, required: true},
    from_value: {type: Number, required: true},
    to_coin: {type: String, required: true},
    to_qty: {type: Number, required: true},
    to_value: {type: Number, required: true},
    created_date: {type: Date, default: Date.now},
    completion_date: {type: Date, default: Date.now}
  });

  module.exports = mongoose.model('Order', OrderSchema);
