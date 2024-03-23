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
router.get('/', isAuthenticated, usersController.getAllUsers);
router.get('/id', isAuthenticated, usersController.getUserId);
router.get('/profile', isAuthenticated, usersController.getUserById);
router.get('/convos', isAuthenticated, usersController.getUserConvos);
router.post('/create/convo', isAuthenticated, usersController.createConvo);
router.post('/convo/messages/read', isAuthenticated, usersController.updateMsgsReadState);
router.get('/convo/messages/:otherUserId', isAuthenticated, usersController.getConvoMessages);
router.post('/create/msg', isAuthenticated, usersController.createMsg);

// Middleware order matters, in this instance we first check that the user is authenticated, and then we perform the validation
// router.post('/profile/update', isAuthenticated, validateUserProfileUpdate, usersController.updateProfile);
router.post('/profile/update', isAuthenticated, usersController.updateProfile);
router.get('/friends', isAuthenticated, usersController.getFriends);

// Used to refresh JWT token 
router.post('/refresh', isAuthenticated, usersController.refreshToken);


module.exports = router;
