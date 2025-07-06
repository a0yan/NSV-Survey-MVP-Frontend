import { API_URL } from '@env'; // Ensure you have this in your .env file
import axios from 'axios';

export const createApiClient = (token: string | null) => {
  const api = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  api.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return api;
};
