// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const db = require('../models');
const generalMessage = require('../constants/messages/general.messages')
const http_response = require('../helper/http_response');



function verifyToken(req, res, next) {
    try {

        let token = req.headers.authorization;
        if (!token) return http_response.unauthorized(res, generalMessage.tokenNotProvided );
        let tokens = token.split('Bearer ')

        jwt.verify(tokens[1], process.env.JWT_SECRET, function(err, decoded) {
            if (err) {
                return http_response.unauthorized(res,generalMessage.tokenExpired)
            }
            if(decoded) {
                req.user = decoded;
            }
            next();
          });

    } catch (error) {
        console.log('error :>> ', error);
        return http_response.unauthorized(res,generalMessage.loginExpired)
    }
 };

module.exports = verifyToken;