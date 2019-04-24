/**
 * @desc Controller for login endpoints.
 */

'use strict';
/**
 * @desc import user service.
 */
const userService = require('../services/user-service');
const jwtService = require('../services/jwt-service');
const walletService = require('../services/wallet-services');
const emailService = require('../services/email-service');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

/**
 * @desc Creates a new user with the request JSON and
 * @return returns user JSON object.
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.post = function (request, response) {

    const newUser = Object.assign({}, request.body);
    const resolve = (user) => {
        const userWallet = Object.assign({}, { user_id: user._id });
        walletService.createWallet(userWallet).then();
        const message = "You have successfully registered to HuskyCoins!! Please login on the below link to use the application!!\n\n";
        const url = "http://localhost:4200/";
        emailService.sendemail(user.emailId, "Registration Successful", message + url);
        response.status(200);
        response.json(user);
    };

    /**
     * @desc encrypting password using bcrypt
     */
    newUser.login.password = bcrypt.hashSync(newUser.login.password, salt);

    userService.save(newUser)
        .then(resolve)
        .catch(renderErrorResponse(response));

};


/**
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 * @return Returns a user object in JSON.
 */
exports.getUser = function (request, response) {
    let pwd = request.body.password;
    const resolve = (user) => {
        if (user.length > 0) {
            if (bcrypt.hashSync(pwd, salt) === user[0].login.password) {
                response.status(200);
                response.json({
                    success: true,
                    message: 'Authentication successful!',
                    token: jwtService.generateToken(user[0]),
                    User: user[0]
                });
            }
            else {
                response.status(401);
                response.json("user credentials invalid!!!")
            }
        } else {
            response.status(404);
            response.json("User not found");
        }
    };
    userService.search(JSON.parse("{\"login.username\":\"" + request.body.username + "\"}"))
        .then(resolve)
        .catch(renderErrorResponse(response));
};

/**
 * Updates and returns a user object in JSON.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.put = function (request, response) {
    const user = Object.assign({}, request.body);
    const resolve = () => {
        response.status(200);
        response.json(user);
    };
    user._id = request.params.userId;
    
    if(user.login.password != null || user.login.password != ""){
        user.login.password = bcrypt.hashSync(user.login.password, salt);
    }else{
        const newUser = userService.getUserById(user._id);
        user.login.password = newUser.login.password;
    }
    userService.updateUser(user)
        .then(resolve)
        .catch(renderErrorResponse(response));
};


/**
 * @desc Throws error if error object is present.
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
