const express = require('express');
const usersController = require('../controllers/usersController');
const router = express.Router();
const { validateUserSignup, validateUserProfileUpdate } = require('../middleware/validation/userValidation');
const loginLimiter = require('../middleware/rateLimit');
const { isAuthenticated } = require('../middleware/authHandler');


// Accessbile to the public
router.post('/signup', validateUserSignup, usersController.signup);
router.post('/login', loginLimiter, usersController.login);


// Accessible to Members only
router.get('/profile', isAuthenticated, usersController.getUserById);

// Middleware order matters, in this instance we first check that the user is authenticated, and then we perform the validation
// router.post('/profile/update', isAuthenticated, validateUserProfileUpdate, usersController.updateProfile);
router.post('/profile/update', isAuthenticated, usersController.updateProfile);
router.get('/friends', isAuthenticated, usersController.getFriends);

// Used to refresh JWT token 
router.post('/refresh', isAuthenticated, usersController.refreshToken);


module.exports = router;
