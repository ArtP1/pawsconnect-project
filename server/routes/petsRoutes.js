const express = require('express');
const router = express.Router();
const petsController = require('../controllers/petsController');


router.get('/', petsController.getPets);
router.get('/:id', petsController.getPetById);
router.get('/breed/:breed', petsController.getPetsByBreed);
module.exports = router;
