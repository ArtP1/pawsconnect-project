const express = require('express');
const router = express.Router();
const usersRoutes = require('./usersRoutes');
const postsRoutes = require('./postsRoutes');
const petsRoutes = require('./petsRoutes');
const { isAuthenticated } = require('../middleware/authHandler');


router.use('/users', usersRoutes);
router.use('/pets', petsRoutes);
router.use('/posts', postsRoutes);


module.exports = router;