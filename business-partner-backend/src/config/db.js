const mysql = require('mysql2');
require('dotenv').config();

// Connection pool banate hain (single connection ke bajaye,
// isse multiple requests ek saath handle ho sakti hain)
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Promise-based pool export karte hain taaki async/await use kar sakein
const promisePool = pool.promise();

module.exports = promisePool;