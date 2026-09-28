const { verifyToken } = require('../utils/jwt');

const authMiddleware = (req, res, next) => {
  try {
    // Header se token nikalo: "Authorization: Bearer <token>"
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No token provided, access denied'
      });
    }

    const token = authHeader.split(' ')[1];

    // Token verify karo
    const decoded = verifyToken(token);

    // Decoded data (id, email, role) request mein daal do
    // taaki aage controllers mein req.user se access kar sakein
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
};

module.exports = authMiddleware;