// Ensures that all API responses follow a consistent format
module.exports.sendResponse = (res, status, data = {}, message = '') => {
    res.status(status).json({ message, data });
};