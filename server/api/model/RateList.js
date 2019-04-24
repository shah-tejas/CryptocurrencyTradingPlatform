/**
 * @desc Model for coin-rates endpoints
 */
'use strict';
/**
* @desc variable for mongoose library
*/
const mongoose = require('mongoose');
/**
* @desc variable for Schema for mongoose
*/
const Schema = mongoose.Schema;

/**
 * Mongoose schema for storing rates of all coins.
 * This schema represents each transaction conducted on wallet
 */
let RateSchema = new Schema({
    /**
     * coinname of the coin the rate pertains to
     * @type {String}
     */
    coinname: {
        type: String,
        required: "Coin-Name is required"
    },
    /**
     * usdvalue of the coin the rate pertains to
     * @type {Number}
     */
    usdvalue: {
        type: Number,
        required: "USD-Value is required"
    },
    /**
     * active denotes if the rate is the current rate of the coin the rate pertains to
     * @type {String}
     */
   active: {
       type: String,
       default: "A" 
   },
    /**
     * insert_date denotes the date the rate was inserted in the schema
     * @type {Date}
     */
    insert_date: {
        type: Date,
        default: Date.now
    },
    /**
     * modified_date denotes the date the rate was last modified in the schema
     * @type {Date}
     */
    modified_date: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('RateList', RateSchema);
