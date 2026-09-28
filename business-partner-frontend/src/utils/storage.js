// Token save/get/remove
const setToken = (token) => {
  localStorage.setItem('token', token);
};

const getToken = () => {
  return localStorage.getItem('token');
};

const removeToken = () => {
  localStorage.removeItem('token');
};

// User data save/get/remove
const setUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

const removeUser = () => {
  localStorage.removeItem('user');
};

// Login ke time dono ek saath save karo
const saveAuthData = (token, user) => {
  setToken(token);
  setUser(user);
};

// Logout ke time dono ek saath remove karo
const clearAuthData = () => {
  removeToken();
  removeUser();
};

export {
  setToken,
  getToken,
  removeToken,
  setUser,
  getUser,
  removeUser,
  saveAuthData,
  clearAuthData
};