const db = require('../config/db');

// Nayi investment add karo
const addInvestment = async ({ partner_id, business_id, amount }) => {
  const [result] = await db.query(
    'INSERT INTO investment (partner_id, business_id, amount) VALUES (?, ?, ?)',
    [partner_id, business_id, amount]
  );
  return result.insertId;
};

// ID se ek investment dhundo
const getInvestmentById = async (id) => {
  const [rows] = await db.query('SELECT * FROM investment WHERE id = ?', [id]);
  return rows[0];
};

// Ek business ki saari investments dhundo (partner details ke saath)
const getInvestmentsByBusiness = async (business_id) => {
  const [rows] = await db.query(
    `SELECT i.id, i.partner_id, i.business_id, i.amount, i.invested_at,
            u.name AS partner_name, u.email AS partner_email
     FROM investment i
     JOIN partners p ON i.partner_id = p.id
     JOIN users u ON p.user_id = u.id
     WHERE i.business_id = ?
     ORDER BY i.invested_at DESC`,
    [business_id]
  );
  return rows;
};

// Ek business ki total investment nikalo (sabka sum)
const getTotalInvestmentByBusiness = async (business_id) => {
  const [rows] = await db.query(
    'SELECT SUM(amount) AS total FROM investment WHERE business_id = ?',
    [business_id]
  );
  return rows[0].total || 0;
};

// Ek particular partner ki business mein total investment
const getPartnerInvestmentInBusiness = async (partner_id, business_id) => {
  const [rows] = await db.query(
    'SELECT SUM(amount) AS total FROM investment WHERE partner_id = ? AND business_id = ?',
    [partner_id, business_id]
  );
  return rows[0].total || 0;
};

module.exports = {
  addInvestment,
  getInvestmentById,
  getInvestmentsByBusiness,
  getTotalInvestmentByBusiness,
  getPartnerInvestmentInBusiness
};