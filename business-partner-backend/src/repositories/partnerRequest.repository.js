const db = require('../config/db');

// Nayi request bhejo
const createRequest = async ({ user_id, business_id }) => {
  const [result] = await db.query(
    'INSERT INTO partner_requests (user_id, business_id) VALUES (?, ?)',
    [user_id, business_id]
  );
  return result.insertId;
};

// Check karo already pending/accepted request hai kya
const findRequest = async (user_id, business_id) => {
  const [rows] = await db.query(
    `SELECT * FROM partner_requests WHERE user_id = ? AND business_id = ? AND status = 'pending'`,
    [user_id, business_id]
  );
  return rows[0];
};

// Ek business ke saare pending requests (naam, email ke saath)
const getPendingRequestsByBusiness = async (business_id) => {
  const [rows] = await db.query(
    `SELECT pr.id, pr.user_id, pr.business_id, pr.status, pr.requested_at,
            u.name, u.email
     FROM partner_requests pr
     JOIN users u ON pr.user_id = u.id
     WHERE pr.business_id = ? AND pr.status = 'pending'
     ORDER BY pr.requested_at DESC`,
    [business_id]
  );
  return rows;
};

// ID se request dhundo
const getRequestById = async (id) => {
  const [rows] = await db.query('SELECT * FROM partner_requests WHERE id = ?', [id]);
  return rows[0];
};

// Request ka status update karo (accept/reject)
const updateRequestStatus = async (id, status) => {
  const [result] = await db.query(
    'UPDATE partner_requests SET status = ?, responded_at = NOW() WHERE id = ?',
    [status, id]
  );
  return result.affectedRows;
};

// User ki apni saari requests (kis business mein bheji, kya status hai)
const getRequestsByUser = async (user_id) => {
  const [rows] = await db.query(
    `SELECT pr.id, pr.business_id, pr.status, pr.requested_at,
            b.name AS business_name
     FROM partner_requests pr
     JOIN business b ON pr.business_id = b.id
     WHERE pr.user_id = ?
     ORDER BY pr.requested_at DESC`,
    [user_id]
  );
  return rows;
};

module.exports = {
  createRequest,
  findRequest,
  getPendingRequestsByBusiness,
  getRequestById,
  updateRequestStatus,
  getRequestsByUser
};