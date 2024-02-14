const express = require('express');
const router = express.Router();

const usersRoutes = require('./usersRoutes');
const petsRoutes = require('./petsRoutes');
const postRoutes = require('./postsRoutes');


router.use('/users', usersRoutes);
router.use('/pets', petsRoutes);
router.use('/posts', postRoutes);


module.exports = router;
