import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import '../global.css';

export default function Index() {
    const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated === null) return; // still loading
    if (isAuthenticated) {
      router.replace('/SelectProject');
    } else {
      router.replace('/login');
    }
  }, [isAuthenticated]);
  return null; // Let _layout.tsx redirect based on auth}
}