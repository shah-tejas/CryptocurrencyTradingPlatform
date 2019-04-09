/**
 * Service for wallet operations.
 */

"use strict";
const mongoose = require("mongoose"),
  Wallet = mongoose.model("wallet"),
  WalletHistory = mongoose.model("walletHistory");


/**
 * Returns a wallet object matching the id.
 *
 * @param {Object} params {id}
 */
exports.searchById = function(params) {
    const promise = Wallet.findById(params).exec();
    return promise;
  };

/**
 * Updates and returns the wallet object.
 *
 * @param {Object} Wallet {Wallet object}
 */
exports.update = function(wallet) {
    wallet.modified_date = new Date();
    const promise = Wallet.findOneAndUpdate(
      { id: wallet.id },
      wallet
    ).exec();
    return promise;
  };

/**
 * Returns a wallet history object matching the id.
 *
 * @param {Object} params {id}
 */
exports.searchWalletTransactionById = function(params) {
    const promise = WalletHistory.findById(params).exec();
    return promise;
  };

/**
 * Saves and returns the new WalletHistory object.
 *
 * @param {Object} WalletHistory {WalletHistory object}
 */
exports.createWalletHistory = function(walletHistory) {
    const newWalletHistory = new WalletHistory(walletHistory);
    const promise = newWalletHistory.save();
    return promise;
  };
