import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [redirectPath, setRedirectPath] = useState(null);

  useEffect(() => {
    // Clear any corrupted or invalid auth state on app start
    const user = authService.getCurrentUser();
    // Only set user if valid, otherwise ensure clean state
    setCurrentUser(user);
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const result = authService.login(email, password);
    if (result.success) {
      setCurrentUser(result.user);
    }
    return result;
  };

  const logout = () => {
    authService.logout();
    setCurrentUser(null);
    setRedirectPath(null);
  };

  const isAuthenticated = () => {
    return !!currentUser;
  };

  const setIntendedRoute = (path) => {
    setRedirectPath(path);
  };

  const getAndClearRedirectPath = () => {
    const path = redirectPath;
    setRedirectPath(null);
    return path;
  };

  const value = {
    currentUser,
    login,
    logout,
    isAuthenticated,
    loading,
    setIntendedRoute,
    getAndClearRedirectPath
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};