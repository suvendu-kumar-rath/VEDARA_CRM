import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ children, requiredRole = null, allowedRoles = null }) {
  const { user, canAccessRoute } = useAuth();

  // Check if user is authenticated
  if (!user) {
    return (
      <div className="flex-1 p-6 md:p-10 bg-dark flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Authentication Required</h2>
          <p className="text-gray-text">Please log in to access this page.</p>
        </div>
      </div>
    );
  }

  // Check role-based access
  if (requiredRole && user.role !== requiredRole) {
    return (
      <div className="flex-1 p-6 md:p-10 bg-dark flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Access Denied</h2>
          <p className="text-gray-text">You don't have permission to access this page.</p>
          <p className="text-gray-500 text-sm mt-2">
            Required role: {requiredRole} | Your role: {user.role}
          </p>
        </div>
      </div>
    );
  }

  // Check allowed roles
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="flex-1 p-6 md:p-10 bg-dark flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Access Denied</h2>
          <p className="text-gray-text">You don't have permission to access this page.</p>
          <p className="text-gray-500 text-sm mt-2">
            Allowed roles: {allowedRoles.join(', ')} | Your role: {user.role}
          </p>
        </div>
      </div>
    );
  }

  // Check route-specific access using the context method
  const currentPath = window.location.pathname;
  if (!canAccessRoute(currentPath)) {
    return (
      <div className="flex-1 p-6 md:p-10 bg-dark flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Access Denied</h2>
          <p className="text-gray-text">Your role doesn't have access to this section.</p>
          <p className="text-gray-500 text-sm mt-2">
            Contact your administrator if you need access.
          </p>
        </div>
      </div>
    );
  }

  // If all checks pass, render the protected content
  return children;
}