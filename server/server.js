const express = require('express');
const server = express();
const cors = require('cors');
const ApiRoutes = require('./routes/index');
const { PORT } = require('./configs').server;

server.use(cors()); // needed to allow frontend communication, when they aren't served from the same origin (port)
server.use(express.json());
server.use(express.urlencoded({ extended: true }))
server.use(express.static('public'))


// current available route /api/users
server.use('/api', ApiRoutes);


server.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});