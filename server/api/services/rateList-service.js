//Setting up Service for API to interact with DB
'use strict';
const mongoose = require('mongoose'),
RateList = mongoose.model('RateList');

//Service to retrieve current-rates of all coins from DB
exports.getAllCurrentRates = (() => {
    const promise = RateList.find({'active': "A"}).exec();
    return promise;
});

//Service to mark all previous-rates as obsolete to DB
exports.voidPreviousRates = ((rate) => {
    const promise = RateList.updateMany({'coinname': rate.coinname}, { 'active': 'I'}).exec();
    return promise;
});

//Service to add current-rate of a coin to DB
exports.save = ((rate) => {
    const newCurrentRate = new RateList(rate);
    const promise = newCurrentRate.save();
    return promise;
});

//Service to fetch current-rate of single coin from DB using coin-name
exports.getCoinCurrentRate = ((coinname) => {
    const promise = RateList.find({coinname: coinname , active: "A" }).exec();
    return promise
});

//Service to retrieve all-rates of all coins from DB
exports.getAllRates = (() => {
    const promise = RateList.find().exec();
    return promise;
});

//Service to fetch all-rates of single coin from DB using coin-name
exports.getAllRatesCoin = ((coinname) => {
    const promise = RateList.find({coinname: coinname }).exec();
    return promise
});