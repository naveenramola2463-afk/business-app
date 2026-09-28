const authService = require('../services/auth.service');
const { successResponse, errorResponse } = require('../utils/response');

// ---- REGISTER ----
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const result = await authService.registerUser({ name, email, password, role });
    return successResponse(res, 201, 'User registered successfully', result);
  } catch (error) {
    return errorResponse(res, error.statusCode || 500, error.message);
  }
};

// ---- LOGIN ----
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser({ email, password });
    return successResponse(res, 200, 'Login successful', result);
  } catch (error) {
    return errorResponse(res, error.statusCode || 500, error.message);
  }
};

module.exports = {
  register,
  login
};