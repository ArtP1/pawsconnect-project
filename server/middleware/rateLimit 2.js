const rateLimit = require('express-rate-limit');

// Limits the number of requests a user can make to the API within a given timeframe
// Helps agains DOS attacks and Brute-Force attacks
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100
});

module.exports = loginLimiter;