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

    // const metaRes = await fetch(`${process.env.API_URL}/nsv/auth/login`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ username: email, password }),
    // });
    // const jsonRes = await metaRes.json();
    // const data=jsonRes.data;
    // setIsAuthenticated(false);
    // if(data==null){
      //   return {"success":false,"msg":"Connection Error"};
      // }
      // if (!data || !data.user || !data.token||data.loggedIn===false) {
        //   return{"success":false,"msg":data.msg};
        // }
        // setUser(data.user_id);
        // setToken(data.token);
        // setIsAuthenticated(true);
        // await AsyncStorage.setItem('token', data.token);
        // return {"success":true,"msg":"Login Successful"};
    const data = {
    "status": 200,
    "msg": "Data Returned Successfully",
    "Data": {
        "role": "Surveyor",
        "loggedIn": true,
        "user_id": "01JZFGK6RAD85G7DBKQ0HA6CMX",
        "name": "Sahil Bansal",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMDFKWkZHSzZSQUQ4NUc3REJLUTBIQTZDTVgiLCJ1c2VybmFtZSI6InNhaGlsMTIzIiwiaWF0IjoxNzUxODEyNjA4fQ.ZdLU5eKT8vEZl1z5a7xIP7ZzHrH7LUdr7-T_PTaTP_0",
        "exp": 1752417408614
      }
    }

    setIsAuthenticated(false);
    if(data==null){
        return {"success": false,"msg": "Connection Error!"};
    }
    if (!data || !data.Data.name || !data.Data.token||data.Data.loggedIn===false) {
      return{"success":false,"msg":data.msg};
    }
    setUser({
      user_id: data.Data.user_id,
      name: data.Data.name,
      role: data.Data.role,
    });
    setToken(data.Data.token);
    setIsAuthenticated(true);
    
    await AsyncStorage.setItem('token', data.Data.token);
    await AsyncStorage.setItem('user', JSON.stringify({
      user_id: data.Data.user_id,
      name: data.Data.name,
      role: data.Data.role,
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
