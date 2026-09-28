const db = require('../config/db');

// Naya business create karo
const createBusiness = async ({ name, description, created_by }) => {
  const [result] = await db.query(
    'INSERT INTO business (name, description, created_by) VALUES (?, ?, ?)',
    [name, description, created_by]
  );
  return result.insertId;
};

// Sab business list karo
const getAllBusiness = async () => {
  const [rows] = await db.query('SELECT * FROM business ORDER BY created_at DESC');
  return rows;
};

// ID se ek business dhundo
const getBusinessById = async (id) => {
  const [rows] = await db.query('SELECT * FROM business WHERE id = ?', [id]);
  return rows[0];
};

// Business update karo
const updateBusiness = async (id, { name, description }) => {
  const [result] = await db.query(
    'UPDATE business SET name = ?, description = ? WHERE id = ?',
    [name, description, id]
  );
  return result.affectedRows;
};

// Business delete karo
const deleteBusiness = async (id) => {
  const [result] = await db.query('DELETE FROM business WHERE id = ?', [id]);
  return result.affectedRows;
};
// Sirf un businesses ki list do jisme yeh user partner hai
const getBusinessesByUserId = async (user_id) => {
  const [rows] = await db.query(
    `SELECT DISTINCT b.* FROM business b
     LEFT JOIN partners p ON b.id = p.business_id
     WHERE b.created_by = ? OR p.user_id = ?
     ORDER BY b.created_at DESC`,
    [user_id, user_id]
  );
  return rows;
};

module.exports = {
  createBusiness,
  getAllBusiness,
  getBusinessById,
  updateBusiness,
  deleteBusiness,
  getBusinessesByUserId
};