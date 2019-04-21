  /**
  * @desc import mongoose Object.
  */
  const mongoose = require('mongoose');
  /**
   * Mongoose schema for Order object.
   * This schema represents each transaction conducted on Order
   */
  const OrderSchema = new mongoose.Schema({
    /**
     * user_id of the User that creates this Order Object.
     */
    user_id: {type: String, required: true},
    /**
     * status of this Order
     */
    status: {type: String, default: "pending"},
    /**
     * OrderID of the Matched Order which is the exact opposite of the this order,
     * as in if this is BUY Order then the matched order would be a sell order,
     * and the from_qty,from_coin, from_value of this order will be the
     * to_qty, to_coin, to_value of the Mathhed Order
     */
    matched_order_id: {type: String, default: ""},
    /**
     * Type of order this will be BUY OR SELL
     */
    buy_or_sell: String,
    /**
     * Coin being sold or bought
     */
    from_coin: {type: String, required: true},
    /**
     * Quantity of Coin being sold or bought
     */
    from_qty: {type: Number, required: true},
    /**
     * Value of Coin being sold or bought
     */
    from_value: {type: Number, required: true},
    /**
     * Coin used to fulfill the transaction
     */
    to_coin: {type: String, required: true},
    /**
     * Quantity of Coin used to fulfill the transaction
     */
    to_qty: {type: Number, required: true},
    /**
     * Running value of Coin used to fulfill the transaction
     */
    to_value: {type: Number, required: true},
    /**
     * Order Created date
     */
    created_date: {type: Date, default: Date.now},
    /**
     * Order fulfilled date
     */
    completion_date: {type: Date, default: Date.now}
  });


  /**
  * @desc export the schema
  */
  module.exports = mongoose.model('Order', OrderSchema);
