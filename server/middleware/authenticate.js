// authenticate.js
function authenticated(req, res, next) {
    if (req.session && req.session.authenticated) {
        next();
    } else {
        res.redirect('/login'); // or res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = authenticated; // Make sure this matches the function name

