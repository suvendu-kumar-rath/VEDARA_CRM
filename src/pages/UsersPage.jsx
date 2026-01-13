import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Modal from '../components/Modal';

export default function UsersPage() {
  const { users, createUser, updateUser, deleteUser, user: currentUser } = useAuth();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Only admin can access this page - this will be enforced by routing
  if (currentUser?.role !== 'admin') {
    return (
      <div className="flex-1 p-6 md:p-10 bg-dark flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Access Denied</h2>
          <p className="text-gray-text">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditUser = (user) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
  };

  const handleDeleteUser = (userId) => {
    if (userId === currentUser.id) {
      alert('You cannot delete your own account');
      return;
    }
    
    if (confirm('Are you sure you want to delete this user?')) {
      deleteUser(userId);
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-blue-900/20 text-blue-400 border-blue-500/30';
      case 'lead': return 'bg-green-900/20 text-green-400 border-green-500/30';
      case 'designer': return 'bg-purple-900/20 text-purple-400 border-purple-500/30';
      default: return 'bg-gray-900/20 text-gray-400 border-gray-500/30';
    }
  };

  const roleStats = {
    total: users.length,
    admin: users.filter(u => u.role === 'admin').length,
    lead: users.filter(u => u.role === 'lead').length,
    designer: users.filter(u => u.role === 'designer').length
  };

  return (
    <main className="flex-1 p-6 md:p-10 bg-dark overflow-y-auto">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">User Management</h1>
          <p className="text-gray-text mt-1">Manage user accounts, roles and permissions</p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-accent text-dark px-4 py-2 rounded flex items-center gap-2 hover:bg-yellow-500 transition text-sm font-medium"
        >
          <span className="text-lg">👤</span> Create User
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-card-dark p-4 rounded border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Users</p>
              <p className="text-2xl font-bold text-white">{roleStats.total}</p>
            </div>
            <span className="text-2xl">👥</span>
          </div>
        </div>

        <div className="bg-card-dark p-4 rounded border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Admins</p>
              <p className="text-2xl font-bold text-blue-400">{roleStats.admin}</p>
            </div>
            <span className="text-2xl">🛡️</span>
          </div>
        </div>

        <div className="bg-card-dark p-4 rounded border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Lead Managers</p>
              <p className="text-2xl font-bold text-green-400">{roleStats.lead}</p>
            </div>
            <span className="text-2xl">📊</span>
          </div>
        </div>

        <div className="bg-card-dark p-4 rounded border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Designers</p>
              <p className="text-2xl font-bold text-purple-400">{roleStats.designer}</p>
            </div>
            <span className="text-2xl">🎨</span>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="Search users by name, email, or role..."
            className="w-full bg-card-dark border border-gray-600 rounded pl-10 pr-4 py-2 text-white focus:outline-none focus:border-accent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-card-dark rounded border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-dark border-b border-gray-700">
              <tr>
                <th className="text-left p-4 text-gray-300 font-medium">User</th>
                <th className="text-left p-4 text-gray-300 font-medium">Role</th>
                <th className="text-left p-4 text-gray-300 font-medium">Status</th>
                <th className="text-left p-4 text-gray-300 font-medium">Created</th>
                <th className="text-left p-4 text-gray-300 font-medium">Last Login</th>
                <th className="text-left p-4 text-gray-300 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-dark/50">
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-white">{user.name}</div>
                      <div className="text-sm text-gray-400">{user.email}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs border ${getRoleColor(user.role)}`}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded text-xs bg-green-900/20 text-green-400 border border-green-500/30">
                      Active
                    </span>
                  </td>
                  <td className="p-4 text-gray-300">{user.createdAt}</td>
                  <td className="p-4 text-gray-300">{user.lastLogin || 'Never'}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="text-blue-400 hover:text-blue-300 text-sm"
                      >
                        Edit
                      </button>
                      {user.id !== currentUser.id && (
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="p-8 text-center text-gray-400">
            No users found matching your search criteria.
          </div>
        )}
      </div>

      {/* Create User Modal */}
      <CreateUserModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={createUser}
      />

      {/* Edit User Modal */}
      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingUser(null);
        }}
        user={editingUser}
        onUpdate={updateUser}
      />
    </main>
  );
}

function CreateUserModal({ isOpen, onClose, onCreate }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'designer'
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    // Basic validation
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    const result = onCreate(formData);
    if (result.success) {
      setFormData({ name: '', email: '', password: '', role: 'designer' });
      onClose();
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New User">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-dark border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-accent"
          />
          {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-dark border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-accent"
          />
          {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full bg-dark border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-accent"
          />
          {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full bg-dark border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-accent"
          >
            <option value="designer">Designer</option>
            <option value="lead">Lead Manager</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-4 py-2 bg-accent text-dark font-medium rounded hover:bg-yellow-500 transition disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create User'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

function EditUserModal({ isOpen, onClose, user, onUpdate }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'designer'
  });
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role
      });
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    onUpdate(user.id, formData);
    setLoading(false);
    onClose();
  };

  if (!isOpen || !user) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit User">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-dark border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-dark border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full bg-dark border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-accent"
          >
            <option value="designer">Designer</option>
            <option value="lead">Lead Manager</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-4 py-2 bg-accent text-dark font-medium rounded hover:bg-yellow-500 transition disabled:opacity-50"
          >
            {loading ? 'Updating...' : 'Update User'}
          </button>
        </div>
      </form>
    </Modal>
  );
}