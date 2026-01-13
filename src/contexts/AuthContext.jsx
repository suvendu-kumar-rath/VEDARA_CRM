import React, { createContext, useContext, useState, useEffect } from 'react';

// Sample users data - In a real app, this would come from a database
const defaultUsers = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@vedara.com',
    password: 'admin123',
    role: 'admin',
    status: 'active',
    createdAt: '2024-01-01',
    lastLogin: '2024-03-20'
  },
  {
    id: 2,
    name: 'Lead Manager',
    email: 'lead@vedara.com',
    password: 'lead123',
    role: 'lead',
    status: 'active',
    createdAt: '2024-01-15',
    lastLogin: '2024-03-19'
  },
  {
    id: 3,
    name: 'Design Artist',
    email: 'designer@vedara.com',
    password: 'design123',
    role: 'designer',
    status: 'active',
    createdAt: '2024-02-01',
    lastLogin: '2024-03-18'
  }
];

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
  const [users, setUsers] = useState(defaultUsers);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    const savedUsers = localStorage.getItem('allUsers');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
    setLoading(false);
  }, []);

  // Save to localStorage whenever users change
  useEffect(() => {
    localStorage.setItem('allUsers', JSON.stringify(users));
  }, [users]);

  const login = (email, password) => {
    const foundUser = users.find(u => u.email === email && u.password === password && u.status === 'active');
    
    if (foundUser) {
      // Update last login
      const updatedUser = { ...foundUser, lastLogin: new Date().toISOString().split('T')[0] };
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      
      // Update the user in the users array
      setUsers(prevUsers => 
        prevUsers.map(u => u.id === updatedUser.id ? updatedUser : u)
      );
      
      return { success: true };
    }
    
    return { success: false, error: 'Invalid email or password' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const createUser = (userData) => {
    const newId = Math.max(...users.map(u => u.id)) + 1;
    const newUser = {
      id: newId,
      ...userData,
      createdAt: new Date().toISOString().split('T')[0],
      lastLogin: null,
      status: 'active'
    };
    
    setUsers(prevUsers => [...prevUsers, newUser]);
    return { success: true, user: newUser };
  };

  const updateUser = (userId, updates) => {
    setUsers(prevUsers => 
      prevUsers.map(u => u.id === userId ? { ...u, ...updates } : u)
    );
    
    // If updating current user, update the current user state too
    if (user && user.id === userId) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }
    
    return { success: true };
  };

  const deleteUser = (userId) => {
    setUsers(prevUsers => prevUsers.filter(u => u.id !== userId));
    return { success: true };
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
      case '/quotations':
      case '/projects':
        return ['admin', 'lead'].includes(role);
      default:
        return ['admin', 'lead'].includes(role);
    }
  };

  const value = {
    user,
    users: users.filter(u => u.status === 'active'),
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