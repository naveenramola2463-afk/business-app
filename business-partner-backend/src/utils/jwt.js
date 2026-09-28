const jwt = require('jsonwebtoken');
require('dotenv').config();

// Token generate karne ke liye (login ke time use hoga)
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '7d' // 7 din tak valid rahega token
  });
};

// Token verify karne ke liye (protected routes ke liye)
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  generateToken,
  verifyToken
};