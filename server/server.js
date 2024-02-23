const express = require('express');
const server = express();
const cors = require('cors');
const ApiRoutes = require('./routes/index');
const { PORT, SECRET_KEY } = require('./configs').server;
const session = require("express-session");

server.use(cors()); // needed to allow frontend communication, when they aren't served from the same origin (port)
server.use(express.json());
server.use(express.urlencoded({ extended: true }))
server.use(express.static('public'))

// Session middleware setup
server.use(session({
  secret: SECRET_KEY,  // Choose a secret string for session encryption
  resave: false,              // Avoid resaving session variables if they haven't changed
  saveUninitialized: false,   // Don't save uninitialized sessions
  cookie: { secure: false }   // For development, set secure to false. For production, set it to true (requires HTTPS)
}));

// current available route /api/users
server.use('/api', ApiRoutes);


server.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

