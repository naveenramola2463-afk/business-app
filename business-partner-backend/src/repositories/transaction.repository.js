const db = require('../config/db');

// Nayi transaction record karo
const createTransaction = async ({ wallet_id, type, amount, description }) => {
  const [result] = await db.query(
    'INSERT INTO transaction (wallet_id, type, amount, description) VALUES (?, ?, ?, ?)',
    [wallet_id, type, amount, description || null]
  );
  return result.insertId;
};

// Wallet ki saari transactions list karo
const getTransactionsByWallet = async (wallet_id) => {
  const [rows] = await db.query(
    'SELECT * FROM transaction WHERE wallet_id = ? ORDER BY created_at DESC',
    [wallet_id]
  );
  return rows;
};

module.exports = {
  createTransaction,
  getTransactionsByWallet
};