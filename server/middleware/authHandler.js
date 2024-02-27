const logger = require('../config/logging');
const jwt = require('jsonwebtoken');
const { sendResponse } = require('../config/responseHandler');
const { ACCESS_TOKEN_SECRET } = require('../config/configs').security;


const isAuthenticated = (req, res, next) => {
    var token = req.headers.authorization;

    if (token) {
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }

        jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                logger.error(`Token verification failed: ${err.message}`);
                return sendResponse(res, 401, null, "Invalid token");
            } else {
                req.user = decoded;
                logger.info(`Token verified for user: ${decoded.id}`); 
                next();
            }
        });
    } else {
        logger.warn("No token provided"); 
        sendResponse(res, 401, null, "No token provided");
    }
};


module.exports = { isAuthenticated };
