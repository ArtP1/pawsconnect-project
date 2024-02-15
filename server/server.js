const express = require('express');
const server = express();
const cors = require('cors');
const ApiRoutes = require('./routes/index');

server.use(cors()); // needed to allow frontend communication, when they aren't served from the same origin (port)
server.use(express.json());
server.use(express.urlencoded({ extended: true }))
server.use(express.static('public'))


// current available route /api/users
server.use('/api', ApiRoutes);


server.listen(3000, () => {
  console.log(`Server is running on port http://localhost:3000`);
});

