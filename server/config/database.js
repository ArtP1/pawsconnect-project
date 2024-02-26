// Source: https://github.com/brianc/node-postgres/tree/master/packages/pg-pool
// const { Pool } = require('pg');
const { PROTOCOL, HOST, USER, PASSWORD, DATABASE } = require('./configs').db;
const { Client } = require('pg');


const client = new Client({
    connectionString: `${PROTOCOL}://${USER}:${PASSWORD}@${HOST}/${DATABASE}`
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