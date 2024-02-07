const express = require('express');
const router = express.Router();

const usersRoutes = require('./usersRoutes');

router.use('/users', usersRoutes);

module.exports = router;
