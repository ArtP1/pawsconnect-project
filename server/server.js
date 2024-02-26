const express = require('express');
const server = express();
const cors = require('cors');
const ApiRoutes = require('./routes/index');
const { PORT, security } = require('./config/configs');
const { CORS_ORIGIN } = security;
const helmet = require('helmet');
const errorHandler = require('./middleware/errorHandler');


server.use(cors({ // needed to allow frontend communication, when they aren't served from the same origin (port)
  origin: [CORS_ORIGIN],
  methods: ["POST", "GET"],
  credentials: true
}));

/*
  Helpes protect app agains various vulnerabilities such as cross-site scripting (XSS), clickjacking, and more by setting appropriate HTTP headers

    1. Content-Security-Policy (CSP)
      * specifies approved sources for content such as scripts, styles, and other resources
    2. X-Content-Type-Options
      * prevents browsers from MIME-sniffing a response away from the declared content type
    3. X-Frame Options
      * prevents clickjacking attacks by denying the ability to load a page in an ifram or object
    4. X-XSS Protection
      * enables the browser's Cross-Site Scripting (XSS) filter
    5. Strict-Transport-Security (HSTS)
      * enforces the use of HTTPS to secure connections and prevents protocol downgrade attacks
    6. Referrer-Policy
      * controls how much referrer information (URL) should be included with requests
    7. Feature-Policy
      * allows you to control which web platform features are allowed to be used
*/
server.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "example.com"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: []
    }
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));

server.use(express.json());

// ensures that incoming requests with URL-encoded data are properly parsed, which then makes it availabel in 'req.body' 
server.use(express.urlencoded({ extended: true })) 

server.use(errorHandler);


// current available route /api/users
server.use('/api', ApiRoutes);


server.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

