const express = require('express');
const router = express.Router();
const petsController = require('../controllers/petsController');
const { isAuthenticated } = require('../middleware/authHandler');


// User related API endpoints (must be authenticated)
router.get('/user-pets', isAuthenticated, petsController.getOwnerPets);
router.get('/delete', isAuthenticated, petsController.deleteOwnerPet);

router.post('/add', isAuthenticated, petsController.addPet);
router.post('/update', isAuthenticated, petsController.updateOwnerPet);


module.exports = router;
