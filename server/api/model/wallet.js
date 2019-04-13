'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Mongoose schema for wallet object.
 * This schema is present for each User
 * This schema represents the wallet for each user
 * It contains all the coins the user has alongwith the balance
 */
let WalletSchema = new Schema({

    /**
     * user_id of the User the Wallet belongs to.
     */
    user_id: {
        type: String,
        required: "user_id is required"
    },
    /**
     * USD Value of the wallet.
     */
    usd_value: {
        type: Number
    },
    /** 
     * Map of various crypto coins with their existing quantities
     * key of map => Coin Name
     * value of map => Coin Quantity
     */
    coins: {
        type: Map,
        of: Number
    },
    /**
     * Wallet created date.
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

module.exports = mongoose.model('wallet', WalletSchema);
