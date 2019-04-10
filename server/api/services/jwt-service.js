const jwt = require('jsonwebtoken');

/**
 * @desc to generate java web token whenever a user login's
 */
const secretKey  = require('../commons/app-constant')
exports.generateToken = (user) =>{   
                var expiry = new Date();
                expiry.setDate(expiry.getDate() + 7);
                console.log(secretKey);
                return jwt.sign(
                
                  {user},
                  secretKey.secretkey,
                  {expiresIn: parseInt(expiry.getTime() / 1000)}
                 ); // DO NOT KEEP YOUR SECRET IN THE CODE!
              };
/**
 * @desc Check to make sure header is not undefined, if so, return Forbidden (403)
 * update needed for this , this is not the final method
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

const checkToken = (req, res, next) => {
    const header = req.headers['authorization'];

    if(typeof header !== 'undefined') {

        const bearer = header.split(' ');
        const token = bearer[1];

        req.token = token;

//         next();
//     } else {
//         //If header is undefined return Forbidden (403)
//         res.sendStatus(403)
//     }
// }
