import axios from 'axios';

export const createApiClient = (token: string | null) => {
  const api = axios.create({
    baseURL: "https://nsv-survey-mvp-backend-1.onrender.com",
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
