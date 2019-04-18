//Setting routes for the API
'use strict';
module.exports = ((app) => {
    const rateController = require('../controllers/rateList-controller');
    //Routes to add and retrieve coin-rates
    app.route('/currentRate')
        .get(rateController.allCurrentRates) //retrieve all current-rates from DB
        .post(rateController.addNewCurrentRate);//add new current-rate to DB

    //Route to retrieve a particular coin-rate from DB based on coin-name
    app.route('/currentRate/:coinname')
        .get(rateController.getCoinCurrentRate);

     //Routes to fetch rate-history of all coins
     app.route('/rateHistory')
     .get(rateController.allRateHistory);

    //Route to fetch rate-history of a particular coin based on coin-name
    app.route('/rateHistory/:coinname')
        .get(rateController.allRateHistoryCoin);

});
