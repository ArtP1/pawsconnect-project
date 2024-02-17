// Source: https://github.com/brianc/node-postgres/tree/master/packages/pg-pool
// const { Pool } = require('pg');
const { Client } = require('pg');

const connectionString = ""; // Replace this with your PostgreSQL connection string

// // you must retrieve all configuration settings
// const pool = new Pool({
//     database: '', // replace with your database name
//     user: '', // usually postgres
//     password: '', // replace with the password entered in pgAdmin4
//     host: '', // usually localhost
//     port:  // usually 5432
//     // SSL (Secure Sockets Layer) is a form of encryption that ensures that data transmitter between your app and the PostgreSQL server is secure and protected from eavesdropping or main-in-the-middle attacks.
//     // ssl: true, 
//     // max specifies the maximum number of clients (connections) the pool should contain.
//     // Default value is from 10-20. It is eventually adjusted based on the observed performance and requirements
//     // Rule of Thumb: 2-4 times the number of CPU cores available on the database server, but greatly depends on the nature of the tasks being performed and the daatabase's configuration
//     // max: 10
// });

const client = new Client({
    connectionString: connectionString
});


// After successfully setting all configuration settings, you need to go ahead and create a "Users" table, and add a couple or as many INSERTS as you'd like.
    // pnpm run dev

client.connect(err => {
    if (err) {
      console.error('Connection error', err.stack);
    } else {
      console.log('Connected to PostgreSQL');
    }
});


module.exports = client;