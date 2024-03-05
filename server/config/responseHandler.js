// Ensures that all API responses follow a consistent format
module.exports.sendResponse = (res, status, success, data = {}, message = '') => {
    res.status(status).json({ success, message, data });
};