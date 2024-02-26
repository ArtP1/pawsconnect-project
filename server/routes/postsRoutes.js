const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');


// Accessible to 
router.get('/', postsController.getPosts);
router.get('/p/:post_id', postsController.getPostById);
router.get('/:user_id', postsController.getPostByUserId);


module.exports = router;
