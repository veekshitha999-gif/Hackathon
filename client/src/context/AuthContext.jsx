import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('qclash_host_user');
    return saved ? JSON.parse(saved) : { id: 'usr-host', email: 'host@quiz.com', name: 'Master Quizmaster' };
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('qclash_host_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('qclash_host_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
