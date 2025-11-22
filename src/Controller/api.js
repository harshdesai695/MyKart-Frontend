import axios from 'axios';


const baseURL = process.env.REACT_APP_API_GATEWAY_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: baseURL,
});

// Helper to get cookie by name
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

// Helper to remove cookie
export const removeCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

// --- Request Interceptor ---
api.interceptors.request.use(
  (config) => {
    const token = getCookie('jwtToken');
    
    // Define endpoints to exclude from Bearer token injection
    const publicEndpoints = [
        '/user/login',
        '/user/addUser',
        '/seller/login',
        '/seller/addSeller'
    ];

    const isPublic = publicEndpoints.some(endpoint => config.url.includes(endpoint));

    if (token && !isPublic) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- Response Interceptor ---
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // 1. Remove the token
      removeCookie('jwtToken');
      
      // 2. Clear local storage (optional, but good for consistency)
      localStorage.removeItem('userId');

      // 3. Redirect to Login
      // Using window.location because we are outside a React Component
      window.location.href = '/Login';
    }
    return Promise.reject(error);
  }
);

export default api;