/**
 * @desc Controller for login endpoints.
 */

'use strict';
/**
 * @desc import user service.
 */
const userService = require('../services/user-service');
const jwtService  = require('../services/jwt-service');
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
    let pwd = request.body.password;
    const resolve = (user) => {
        console.log(user);
        if(user.length > 0){
            if(user[0].login.password == pwd){
                response.status(200);
                response.json({
                    success: true,
                    message: 'Authentication successful!',
                    token: jwtService.generateToken(user[0]),
                    User:user[0]
            });
        }else{
            response.status(401);
            response.json("user credentials invalid!!!")
            }
    }else{
            response.status(404);
            response.json("User not found");
        }
            
    
    };
    console.log(request.body);
    userService.search(JSON.parse("{\"login.username\":\""+ request.body.username +"\"}"))
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
            console.log(error);
            response.status(500);
            response.json({
                message: error.message
            });
        }
    }
    return errorCallback; 
};