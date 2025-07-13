import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await axios.get('/api/auth/me', { withCredentials: true });
      setUser(res.data);
    } catch (err) {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (email, password) => {
    await axios.post('/api/auth/login', { email, password }, { withCredentials: true });
    fetchUser();
  };

  const register = async (email, password) => {
    await axios.post('/api/auth/register', { email, password }, { withCredentials: true });
    fetchUser();
  };

  const logout = async () => {
    await axios.get('/api/auth/logout', { withCredentials: true });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);