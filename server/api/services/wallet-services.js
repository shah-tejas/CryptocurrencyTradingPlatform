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
exports.searchByUserId = function (params) {
  const promise = Wallet.find(params).exec();
  return promise;
};

/**
 * Updates and returns the wallet object.
 *
 * @param {Object} Wallet {Wallet object}
 */
exports.update = function (wallet) {
  wallet.modified_date = new Date();
  const promise = Wallet.findOneAndUpdate(
    { user_id: wallet.user_id },
    wallet
  ).exec();
  return promise;
};

/**
 * Returns a wallet history object matching the id.
 *
 * @param {Object} params {id}
 */
exports.searchWalletTransactionById = function (user_id) {
  const promise = WalletHistory.find({ user_id: user_id }).sort({ created_date: -1 }).exec();
  return promise;
};

/**
 * Saves and returns the new WalletHistory object.
 *
 * @param {Object} WalletHistory {WalletHistory object}
 */
exports.createWalletHistory = function (walletHistory) {
  const newWalletHistory = new WalletHistory(walletHistory);
  const promise = newWalletHistory.save();
  return promise;
};

/**
 * Saves and returns the new Wallet object.
 *
 * @param {Object} Wallet {Wallet object}
 */
exports.createWallet = function (wallet) {
  const newWallet = new Wallet(wallet);
  const promise = newWallet.save();
  return promise;
};
