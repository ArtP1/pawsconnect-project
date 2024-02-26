/*
    Status Code Definitions:

    - 200: OK - The request has succeeded. The client can retrieve the requested data.
    - 201: Created - The request has been fulfilled, and a new resource has been created.
    - 404: Not Found - The server can't find the requested resource.
    - 500: Internal Server Error - The server encountered an unexpected condition that prevented it from fulfilling the request.
*/

const { sendResponse } = require('../config/responseHandler');

// Ensures that all errors are logged and that a standardized error response is sent back to the client
module.exports = (err, req, res, next) => {
    console.error(err.stack);
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    sendResponse(res, statusCode, null, message);
};