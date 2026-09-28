const db = require('../config/db');

// Naya profit/loss entry create karo
const createProfit = async ({ business_id, total_amount, type, remarks }) => {
  const [result] = await db.query(
    'INSERT INTO profit (business_id, total_amount, type, remarks) VALUES (?, ?, ?, ?)',
    [business_id, total_amount, type || 'profit', remarks || null]
  );
  return result.insertId;
};

// ID se profit entry dhundo
const getProfitById = async (id) => {
  const [rows] = await db.query('SELECT * FROM profit WHERE id = ?', [id]);
  return rows[0];
};

// Business ki saari profit entries list karo
const getProfitsByBusiness = async (business_id) => {
  const [rows] = await db.query(
    'SELECT * FROM profit WHERE business_id = ? ORDER BY created_at DESC',
    [business_id]
  );
  return rows;
};

// Profit distribution entries save karo (bulk insert)
const saveProfitDistribution = async (profit_id, distribution) => {
  // distribution = [{ partner_id, share_percentage, share_amount }, ...]
  const values = distribution.map((d) => [
    profit_id,
    d.partner_id,
    d.share_percentage,
    d.share_amount
  ]);

  const [result] = await db.query(
    'INSERT INTO profit_distribution (profit_id, partner_id, share_percentage, share_amount) VALUES ?',
    [values]
  );
  return result.affectedRows;
};

// Ek profit ki distribution details dikhao (partner name ke saath)
const getDistributionByProfitId = async (profit_id) => {
  const [rows] = await db.query(
    `SELECT pd.id, pd.partner_id, pd.share_percentage, pd.share_amount,
            u.name AS partner_name, u.email AS partner_email
     FROM profit_distribution pd
     JOIN partners p ON pd.partner_id = p.id
     JOIN users u ON p.user_id = u.id
     WHERE pd.profit_id = ?`,
    [profit_id]
  );
  return rows;
};

module.exports = {
  createProfit,
  getProfitById,
  getProfitsByBusiness,
  saveProfitDistribution,
  getDistributionByProfitId
};