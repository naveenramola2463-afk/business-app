const db = require('../config/db');

// Partner ke liye wallet create karo (agar exist nahi karta)
const createWallet = async (partner_id) => {
  const [result] = await db.query(
    'INSERT INTO wallet (partner_id, balance) VALUES (?, 0.00)',
    [partner_id]
  );
  return result.insertId;
};

// Partner ka wallet dhundo
const getWalletByPartnerId = async (partner_id) => {
  const [rows] = await db.query('SELECT * FROM wallet WHERE partner_id = ?', [partner_id]);
  return rows[0];
};

// Wallet balance update karo (credit/debit)
const updateBalance = async (wallet_id, newBalance) => {
  const [result] = await db.query(
    'UPDATE wallet SET balance = ? WHERE id = ?',
    [newBalance, wallet_id]
  );
  return result.affectedRows;
};

module.exports = {
  createWallet,
  getWalletByPartnerId,
  updateBalance
};