/**
 * @desc Controller for login endpoints.
 */

'use strict';
/**
 * @desc import user service.
 */
const userService = require('../services/user-service');

/**
 * @desc Creates a new user with the request JSON and
 * @return returns user JSON object.
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.post = function (request, response) {
    const newUser = Object.assign({}, request.body);
    const resolve = (user) => {
        response.status(200);
        response.json(user);
    };
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
    const resolve = (user) => {
        response.status(200);
        response.json(user);
    };
    userService.get(request.params.userId)
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