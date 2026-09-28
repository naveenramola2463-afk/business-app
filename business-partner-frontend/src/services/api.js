import axios from 'axios';

// Axios ka ek instance banate hain jisme base URL set hoga
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// ---- Request Interceptor ----
// Har request bhejne se pehle, agar token localStorage mein hai
// toh usko automatically Authorization header mein daal do
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ---- Response Interceptor ----
// Agar kahin bhi 401 (token expired/invalid) aaye,
// toh user ko automatically login page pe bhej do
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;