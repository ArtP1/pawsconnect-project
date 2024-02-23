// authenticate.js
function isAuthenticated(req, res, next) {
    if (req.session.authenticated) {
        next();
    } else {
        res.redirect('/login'); // or res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = isAuthenticated; // Make sure this matches the function name

