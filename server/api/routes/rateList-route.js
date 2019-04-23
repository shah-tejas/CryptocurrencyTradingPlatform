/**
   * @desc Routes for fetching and creating rates for different coins
    */
'use strict';
module.exports = ((app) => {
    const rateController = require('../controllers/rateList-controller');
/**
   * @desc Rate Routes to fetch and create rate for coins
    */
    app.route('/currentRate')
        .get(rateController.allCurrentRates) 
        .post(rateController.addNewCurrentRate);

/**
   * @desc Rate Route to fetch current rate for respective coin
    */
    app.route('/currentRate/:coinname')
        .get(rateController.getCoinCurrentRate);

/**
   * @desc Rate Route to fetch all rates for all coins
    */
     app.route('/rateHistory')
     .get(rateController.allRateHistory);

/**
   * @desc Rate Route to fetch all rates for specific coin
    */
    app.route('/rateHistory/:coinname')
        .get(rateController.allRateHistoryCoin);
 
});