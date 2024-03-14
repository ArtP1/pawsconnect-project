const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const { isAuthenticated } = require('../middleware/authHandler');


// Accessible to 
router.get('/', isAuthenticated, postsController.getPosts);
router.get('/p/:post_id', isAuthenticated, postsController.getPostById);
router.get('/:user_id', isAuthenticated, postsController.getPostsByUserId);

router.post('/create', isAuthenticated, postsController.createPost);

module.exports = router;
