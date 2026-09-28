import api from './api';
import { saveAuthData, clearAuthData, getUser } from '../utils/storage';

// ---- REGISTER ----
const register = async ({ name, email, password, role }) => {
  const response = await api.post('/auth/register', { name, email, password, role });

  const { user, token } = response.data.data;
  saveAuthData(token, user);

  return response.data;
};

// ---- LOGIN ----
const login = async ({ email, password }) => {
  const response = await api.post('/auth/login', { email, password });

  const { user, token } = response.data.data;
  saveAuthData(token, user);

  return response.data;
};

// ---- LOGOUT ----
const logout = () => {
  clearAuthData();
};

// ---- Current logged-in user ko localStorage se lao ----
const getCurrentUser = () => {
  return getUser();
};

export default {
  register,
  login,
  logout,
  getCurrentUser
};