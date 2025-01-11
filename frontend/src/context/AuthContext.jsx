import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user info
  const [role, setRole] = useState(null); // Store user role

  const login = (userData) => {
    setUser(userData.user);
    setRole(userData.user.role);
    localStorage.setItem('token', userData.token); // Save token in localStorage
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
