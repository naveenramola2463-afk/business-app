const db = require('../config/db');

// Email se user dhundo (login ke time use hoga)
const findUserByEmail = async (email) => {
  const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0]; // Agar mila toh user object, nahi toh undefined
};

// ID se user dhundo
const findUserById = async (id) => {
  const [rows] = await db.query('SELECT id, name, email, role, created_at FROM users WHERE id = ?', [id]);
  return rows[0];
};

// Naya user create karo (register ke time)
const createUser = async ({ name, email, password, role }) => {
  const [result] = await db.query(
    'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
    [name, email, password, role || 'user']
  );
  return result.insertId;
};

module.exports = {
  findUserByEmail,
  findUserById,
  createUser
};