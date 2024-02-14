// Might be used later on...
function authenticate(req, res, next) {
    console.log(`Received a ${req.method} request to ${req.url}`);
    next(); 
}
  

module.exports = authenticate;