/**
 * Wallet endpoint route definitions.
 */

'use strict';
module.exports = function (app) {
    // defining the controller
    const walletController = require('../controllers/walletController');
    // Wallet routes to get and update wallet
    app.route('/wallet/:id')
        .get(walletController.getUserWallet)
        .put(walletController.updateUserWallet);
    app.route('/wallet')
        .post(walletController.createWallet);

    // Wallet History routes to get and create wallet history transactions
    app.route('/wallethistory/:id')
        .get(walletController.getWalletHistory);
    app.route('/wallethistory')
        .post(walletController.createWalletTransaction);
};