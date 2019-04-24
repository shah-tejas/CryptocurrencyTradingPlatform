/**
 * @desc Controller for coin-rates endpoints
 */
'use strict';
/**
 * @desc import (coin-)rate service.
 */
const rateService = require('../services/rateList-service');
/**
 * @desc Fetches current-rates for all the coins and returns the response as JSON
 * @return returns a JSON object containing an array of RateList objects
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.allCurrentRates = ((req, res) => {
    const resolve = (currentRates) => {
        res.status(200);
        res.json(currentRates);
    };
    rateService.getAllCurrentRates({})
        .then(resolve)
        .catch(renderErrorRes(res));
});

/**
 * @desc Creates a new coin-rate object with the request JSON
 * @return returns coin-rate JSON object.
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
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

/**
 * @desc Fetches a new coin-rate object with the request JSON
 * @return returns coin-rate JSON object.
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.getCoinCurrentRate = ((req, res) => {
    const resolve = (rate) => {
        res.status(200);
        res.json(rate);
    };
    rateService.getCoinCurrentRate(req.params.coinname)
        .then(resolve)
        .catch(renderErrorRes(res));
});

/**
 * @desc Fetches all the rates for coins with the request JSON
 * @return returns a JSON object as array of RateList objects for each coin
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.allRateHistory = ((req, res) => {
    const resolve = (currentRates) => {
        res.status(200);
        res.json(currentRates);
    };
    rateService.getAllRates({})
        .then(resolve)
        .catch(renderErrorRes(res));
});

/**
 * @desc Fetches all the rates for a coin with the request JSON
 * @return returns a JSON object as array of RateList objects for queried coin
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.allRateHistoryCoin = ((req, res) => {
    const resolve = (rate) => {
        res.status(200);
        res.json(rate);
    };
    rateService.getAllRatesCoin(req.params.coinname)
        .then(resolve)
        .catch(renderErrorRes(res));
});

/**
 * @desc Throws error if error object is present.
 * @param {Response} response The response object
 * @return {Function} The error handler function.
 */
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
