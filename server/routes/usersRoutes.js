const express = require('express');
const usersController = require('../controllers/usersController');
const router = express.Router();

router.get('/', usersController.getUsers);
router.get('/:id', usersController.getUserById);
router.get('/:id/friends', usersController.getUserFriendsById);

// Updated to use the signup method from usersController
router.post('/signup', usersController.signup);

module.exports = router;
