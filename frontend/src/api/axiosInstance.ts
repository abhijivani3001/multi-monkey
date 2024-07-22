import getEnvVar from '@/utils/getEnvVar';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: getEnvVar('VITE_BACKEND_URL'),
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
