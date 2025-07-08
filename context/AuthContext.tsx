import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

type AuthContextType = {
  user: any;
  token: string | null;
  isAuthenticated: boolean|null;
  login: (email: string, password: string) => Promise<{ success: boolean; msg: any }>;
  register: (email: string, password: string) => Promise<{ success: boolean; msg: any }>
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean|null>(null);
  
  useEffect(() => {
    const loadToken = async () => {
    const saved = await AsyncStorage.getItem('token');
    const savedUser = await AsyncStorage.getItem('user');
    if (saved) {
      setToken(saved);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (err) {
        console.error("Error parsing user from storage", err);
      }
    }
  };
  loadToken();
  }, []);


  const login = async (email: string, password: string) => {
    const metaRes = await fetch('https://nsv-survey-mvp-backend-1.onrender.com/nsv/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: email, password }),
    });
    console.log("metaRes: ",metaRes);
    
    const jsonRes = await metaRes.json();
    console.log("metaRes: ",jsonRes);

    const data=jsonRes['data'];
    console.log(`Login response: ${data}`);
    
    setIsAuthenticated(false);
    if(data==null){
        return {"success": false,"msg": "Connection Error!"};
    }
    if (!data || !data.user_id || !data.token||data.loggedIn==="false") {
      return{"success":false,"msg":data.msg};
    }
    setUser({
      user_id: data.user_id,
      name: data.name,
      role: data.role,
      email: data.email,
      phone: data.phone
    });
    setToken(data.token);
    setIsAuthenticated(true);
    
    await AsyncStorage.setItem('token', data.token);
    await AsyncStorage.setItem('user', JSON.stringify({
      user_id: data.user_id,
      name: data.name,
      role: data.role,
      email: data.email,
      phone: data.phone
    }));
    return {"success": true,"msg": "Login Successful"};
  };

  const register = async (email: string, password: string) => {
    const res = await fetch('https://your-api.com/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    setUser(data.user);
    setToken(data.token);
    await AsyncStorage.setItem('token', data.token);
    return { success: true, msg: 'Registration Successful' };
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
