const db = require('../config/db');

// Naya partner add karo (user ko business se link karo)
const addPartner = async ({ user_id, business_id }) => {
  const [result] = await db.query(
    'INSERT INTO partners (user_id, business_id) VALUES (?, ?)',
    [user_id, business_id]
  );
  return result.insertId;
};

// Ek business ke saare partners dhundo
const getPartnersByBusiness = async (business_id) => {
  const [rows] = await db.query(
    `SELECT p.id AS partner_id, p.user_id, p.business_id, p.joined_at,
            u.name, u.email
     FROM partners p
     JOIN users u ON p.user_id = u.id
     WHERE p.business_id = ?`,
    [business_id]
  );
  return rows;
};

// ID se ek partner dhundo
const getPartnerById = async (id) => {
  const [rows] = await db.query('SELECT * FROM partners WHERE id = ?', [id]);
  return rows[0];
};

// Check karo user pehle se us business mein partner toh nahi hai
const findPartner = async (user_id, business_id) => {
  const [rows] = await db.query(
    'SELECT * FROM partners WHERE user_id = ? AND business_id = ?',
    [user_id, business_id]
  );
  return rows[0];
};

// Partner remove karo
const removePartner = async (id) => {
  const [result] = await db.query('DELETE FROM partners WHERE id = ?', [id]);
  return result.affectedRows;
};

// Un users ki list do jo abhi is business ke partner NAHI hain
const getAvailableUsers = async (business_id) => {
  const [rows] = await db.query(
    `SELECT u.id, u.name, u.email FROM users u
     WHERE u.id NOT IN (
       SELECT p.user_id FROM partners p WHERE p.business_id = ?
     )
     ORDER BY u.name`,
    [business_id]
  );
  return rows;
};

module.exports = {
  addPartner,
  getPartnersByBusiness,
  getPartnerById,
  findPartner,
  removePartner,
  getAvailableUsers
};