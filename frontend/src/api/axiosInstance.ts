import getEnvVar from '@/utils/getEnvVar';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: getEnvVar('VITE_BACKEND_URL'),
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export default axiosInstance;
