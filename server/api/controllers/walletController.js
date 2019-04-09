/**
 * Controller for Wallet endpoints.
 */

'use strict';
//import wallet service.
const walletService = require('../services/wallet-services');

/**
 * Returns a the user wallet in JSON.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.getUserWallet = function (request, response) {
    const resolve = (wallet) => {
        response.status(200);
        response.json(wallet);
    };
    walletService.searchById(request.params.id)
        .then(resolve)
        .catch(renderErrorResponse(response));
};

/**
 * Updates and returns a wallet object in JSON.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.updateUserWallet = function (request, response) {
    const wallet = Object.assign({}, request.body);
    const resolve = (wallet) => {
        response.status(200);
        response.json(wallet);
    };
    wallet.id = request.params.id;
    walletService.update(wallet)
        .then(resolve)
        .catch(renderErrorResponse(response));
};

/**
 * Returns a wallet transaction in JSON.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.getWalletHistory = function (request, response) {
    const resolve = (walletHistory) => {
        response.status(200);
        response.json(walletHistory);
    };
    walletService.searchWalletTransactionById(request.params.id)
        .then(resolve)
        .catch(renderErrorResponse(response));
};

/**
 * Creates a new wallet transaction with the request JSON and
 * returns wallter history JSON object.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.createWalletTransaction = function (request, response) {
    const newWalletHistory = Object.assign({}, request.body);
    const resolve = (walletHistory) => {
        response.status(200);
        response.json(walletHistory);
    };
    walletService.createWalletHistory(newWalletHistory)
        .then(resolve)
        .catch(renderErrorResponse(response));
};

/**
 * Throws error if error object is present.
 *
 * @param {Response} response The response object
 * @return {Function} The error handler function.
 */
let renderErrorResponse = (response) => {
    const errorCallback = (error) => {
        if (error) {
            response.status(500);
            response.json({
                message: error.message
            });
        }
    }
    return errorCallback;
};