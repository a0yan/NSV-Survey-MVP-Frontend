import { useAuth } from '../context/AuthContext';
import { createApiClient } from '../lib/api';

export const useApi = () => {
  const { token } = useAuth();
  return createApiClient(token);
};