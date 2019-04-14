//Setting up Controller for the API
'use strict';
//Import service for the API
const rateService = require('../services/rateList-service');
//Method to retrieve all current-rates from DB
exports.allCurrentRates = ((req, res) => {
    const resolve = (currentRates) => {
        res.status(200);
        res.json(currentRates);
    };
    rateService.getAllCurrentRates({})
        .then(resolve)
        .catch(renderErrorRes(res));
});

//Method to add new-current-rate to DB
exports.addNewCurrentRate = ((req, res) => {
    const newrate = Object.assign({}, req.body);
    const resolve = (rate) => {
        res.status(200);
        res.json(rate);
    };
    rateService.voidPreviousRates(newrate)
        .then(() => {rateService.save(newrate).then(resolve)})
        .catch(renderErrorRes(res));
});

//Method to retreive current-rate based on coin-name
exports.getCoinCurrentRate = ((req, res) => {
    const resolve = (rate) => {
        res.status(200);
        res.json(rate);
    };
    rateService.getCoinCurrentRate(req.params.coinname)
        .then(resolve)
        .catch(renderErrorRes(res));
});

//Method to retrieve all rates from DB
exports.allRateHistory = ((req, res) => {
    const resolve = (currentRates) => {
        res.status(200);
        res.json(currentRates);
    };
    rateService.getAllRates({})
        .then(resolve)
        .catch(renderErrorRes(res));
});

//
//Method to retrieve all-rate based on coin-name
exports.allRateHistoryCoin = ((req, res) => {
    const resolve = (rate) => {
        res.status(200);
        res.json(rate);
    };
    rateService.getAllRatesCoin(req.params.coinname)
        .then(resolve)
        .catch(renderErrorRes(res));
});

//Method to throw error to the calling function
let renderErrorRes = (res) => {
    const errorCallback = (error) => {
        if (error) {
            res.status(500);
            res.json({
                message: error.message
            });
        }
    }
    return errorCallback;
};