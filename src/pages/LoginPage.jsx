import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDemoCredentials, setShowDemoCredentials] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = login(email, password);
    
    if (!result.success) {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const handleDemoLogin = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setError('');
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">VEDARA</h1>
          <p className="text-gray-text">Interior Design CRM</p>
        </div>

        {/* Login Form */}
        <div className="bg-card-dark rounded-lg p-8 border border-gray-800">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Welcome Back</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-900/20 border border-red-500/50 text-red-400 p-3 rounded">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-dark border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-accent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-dark border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-accent"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent text-dark font-medium py-2 px-4 rounded hover:bg-yellow-500 transition disabled:opacity-50"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6">
            <button
              onClick={() => setShowDemoCredentials(!showDemoCredentials)}
              className="w-full text-sm text-gray-400 hover:text-accent transition"
            >
              {showDemoCredentials ? 'Hide' : 'Show'} Demo Credentials
            </button>

            {showDemoCredentials && (
              <div className="mt-4 p-4 bg-dark border border-gray-700 rounded">
                <p className="text-sm text-gray-300 mb-3">Demo Accounts:</p>
                
                <div className="space-y-2">
                  <button
                    onClick={() => handleDemoLogin('admin@vedara.com', 'admin123')}
                    className="w-full text-left p-2 bg-blue-900/20 border border-blue-500/30 rounded hover:bg-blue-900/30 transition"
                  >
                    <div className="text-blue-400 font-medium">Admin</div>
                    <div className="text-xs text-gray-400">admin@vedara.com / admin123</div>
                    <div className="text-xs text-gray-500">Full access + user management</div>
                  </button>

                  <button
                    onClick={() => handleDemoLogin('lead@vedara.com', 'lead123')}
                    className="w-full text-left p-2 bg-green-900/20 border border-green-500/30 rounded hover:bg-green-900/30 transition"
                  >
                    <div className="text-green-400 font-medium">Lead Manager</div>
                    <div className="text-xs text-gray-400">lead@vedara.com / lead123</div>
                    <div className="text-xs text-gray-500">All access except user management</div>
                  </button>

                  <button
                    onClick={() => handleDemoLogin('designer@vedara.com', 'design123')}
                    className="w-full text-left p-2 bg-purple-900/20 border border-purple-500/30 rounded hover:bg-purple-900/30 transition"
                  >
                    <div className="text-purple-400 font-medium">Designer</div>
                    <div className="text-xs text-gray-400">designer@vedara.com / design123</div>
                    <div className="text-xs text-gray-500">Design page access only</div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          Secure login for authorized personnel only
        </p>
      </div>
    </div>
  );
}