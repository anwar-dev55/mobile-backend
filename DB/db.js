const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE,
  ssl: process.env.DATABASE.includes("localhost")
    ? false
    : { rejectUnauthorized: false },
});

module.exports = pool;