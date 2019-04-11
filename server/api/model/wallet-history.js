'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Mongoose schema for wallet history object.
 * This schema represents each transaction conducted on wallet
 */
let WalletHistorySchema = new Schema({

    /**
     * user_id of the User the Wallet belongs to.
     */
    user_id: {
        type: String,
        required: "user_id is required"
    },
    /**
     * USD Value of the transaction.
     */
    usd_value: {
        type: Number
    },
    /** 
     * Name of the crypto coin
     */
    coin_name: {
        type: String
    },
    /**
     * Quantity of coins.
     */
    coin_qty: {
        type: Number
    },
    /** 
     * Status of the transaction
     * whether failure or success
     */
    status: {
        type: String
    },
    /**
     * Transaction type
     * eg. Cash Out
     */
    transaction_type: {
        type: String
    },
    /**
     * Transaction date
     */
    created_date: {
        type: Date,
        default: Date.now
    },
    /**
     * Last modified date.
     */
    modified_date: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('walletHistory', WalletHistorySchema);
