// Source: https://github.com/brianc/node-postgres/tree/master/packages/pg-pool
var { Pool } = require('pg');

// you must retrieve all configuration settings
const pool = new Pool({
    database: 'pawsconnect', // replace with your database name
    user: 'postgres', // usually postgres
    password: 'Chipotle831100_', // replace with the password entered in pgAdmin4
    host: 'localhost', // usually localhost
    port: 5432 // usually 5432
    // SSL (Secure Sockets Layer) is a form of encryption that ensures that data transmitter between your app and the PostgreSQL server is secure and protected from eavesdropping or main-in-the-middle attacks.
    // ssl: true, 
    // max specifies the maximum number of clients (connections) the pool should contain.
    // Default value is from 10-20. It is eventually adjusted based on the observed performance and requirements
    // Rule of Thumb: 2-4 times the number of CPU cores available on the database server, but greatly depends on the nature of the tasks being performed and the daatabase's configuration
    // max: 10
});

// After successfully setting all configuration settings, you need to go ahead and create a "Users" table, and add a couple or as many INSERTS as you'd like.
// Once you do this you'll go ahead and run the following command on your vs terminal:
    // pnpm install-all, this will make sure to install the necessary node_modules on the client/, server/, and root directory

// To run the app you run the following command:
    // pnpm run dev


module.exports = pool;