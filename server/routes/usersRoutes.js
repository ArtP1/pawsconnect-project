const express = require('express');
const usersController = require('../controllers/usersController');
const router = express.Router();
const { validateUserSignup } = require('../middleware/validation/userValidation');
const loginLimiter = require('../middleware/rateLimit');
const { isAuthenticated } = require('../middleware/authHandler');


// Accessbile to the public
router.post('/signup', validateUserSignup, usersController.signup);
router.post('/login', loginLimiter, usersController.login);


// Accessible to Members only
router.get('/profile', isAuthenticated, usersController.getUserById);
router.post('/profile/update', isAuthenticated, usersController.updateProfile);

// Used to refresh JWT token 
router.post('/refresh', isAuthenticated, usersController.refreshToken);

module.exports = router;
