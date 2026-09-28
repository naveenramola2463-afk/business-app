import { useState } from 'react';
import authService from '../services/authService';
import { getUser, getToken } from '../utils/storage';
import AuthContext from './AuthContextObject';

const AuthProvider = ({ children }) => {
  // useEffect ke bajaye seedha lazy initializer se initial value nikal rahe hain
  const [user, setUser] = useState(() => {
    const storedUser = getUser();
    const token = getToken();
    return storedUser && token ? storedUser : null;
  });

  const [loading] = useState(false);

  // Login function
  const login = async (credentials) => {
    const response = await authService.login(credentials);
    setUser(response.data.user);
    return response;
  };

  // Register function
  const register = async (data) => {
    const response = await authService.register(data);
    setUser(response.data.user);
    return response;
  };

  // Logout function
  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider };