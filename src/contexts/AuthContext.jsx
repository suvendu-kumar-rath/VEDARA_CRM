import React, { createContext, useContext, useState, useEffect } from 'react';
import apiService from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await apiService.login(email, password);
      
      if (response.success && response.data) {
        const userData = {
          ...response.data.user,
          token: response.data.token
        };
        
        setUser(userData);
        localStorage.setItem('currentUser', JSON.stringify(userData));
        
        return { success: true };
      }
      
      return { success: false, error: response.message || 'Login failed' };
    } catch (error) {
      return { success: false, error: error.message || 'Login failed' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const createUser = async (userData) => {
    try {
      const response = await apiService.createUser(userData);
      
      if (response.success) {
        return { success: true, user: response.data };
      }
      
      return { success: false, error: response.message || 'User creation failed' };
    } catch (error) {
      return { success: false, error: error.message || 'User creation failed' };
    }
  };

  const updateUser = async (userId, updates) => {
    try {
      // If updating current user, update the current user state too
      if (user && user.id === userId) {
        const updatedUser = { ...user, ...updates };
        setUser(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      }
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const deleteUser = async (userId) => {
    try {
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const hasPermission = (requiredRole) => {
    if (!user) return false;
    
    const roleHierarchy = {
      'admin': 3,
      'lead': 2,
      'designer': 1
    };
    
    return roleHierarchy[user.role] >= roleHierarchy[requiredRole];
  };

  const canAccessRoute = (route) => {
    if (!user) return false;
    
    const { role } = user;
    
    switch (route) {
      case '/users':
        return role === 'admin';
      case '/designs':
        return ['admin', 'lead', 'designer'].includes(role);
      case '/dashboard':
      case '/leads':
      case '/clients':
        return ['admin', 'lead'].includes(role);
      default:
        return ['admin', 'lead'].includes(role);
    }
  };

  const value = {
    user,
    users,
    loading,
    login,
    logout,
    createUser,
    updateUser,
    deleteUser,
    hasPermission,
    canAccessRoute
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};