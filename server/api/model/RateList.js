'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Rate Schema for Mongoose
let RateSchema = new Schema({
    //Atributes and their constraints
    //Coin-Name
    coinname: {
        type: String,
        required: "Coin-Name is required"
    },
    //USD-Value
    usdvalue: {
        type: Number,
        required: "USD-Value is required"
    },
    //Active
   active: {
       type: String,
       default: "A"
   },
    //Date-Of-Creation
    insert_date: {
        type: Date,
        default: Date.now
    },
    //Date-Of-Creation
    modified_date: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('RateList', RateSchema);
