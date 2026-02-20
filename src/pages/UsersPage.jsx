import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import apiService from '../services/api';
import Modal from '../components/Modal';

export default function UsersPage() {
  const { user: currentUser } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch employees from API
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await apiService.getEmployees();
      console.log('Get Employees Response:', response);
      console.log('Response type:', typeof response, 'Is array:', Array.isArray(response));
      
      let employeeData = [];
      
      // Handle different response structures
      if (Array.isArray(response)) {
        // Direct array response
        employeeData = response;
      } else if (response?.data) {
        // Nested in data property
        if (Array.isArray(response.data)) {
          employeeData = response.data;
        } else if (response.data?.items) {
          employeeData = response.data.items;
        } else if (response.data?.users) {
          employeeData = response.data.users;
        } else if (response.data?.employees) {
          employeeData = response.data.employees;
        }
      } else if (response?.users) {
        // Direct users property
        employeeData = response.users;
      } else if (response?.employees) {
        // Direct employees property
        employeeData = response.employees;
      }
      
      console.log('Extracted Employee Data:', employeeData);
      console.log('Employee count:', employeeData.length);
      if (employeeData.length > 0) {
        console.log('First employee fields:', Object.keys(employeeData[0]));
        console.log('First employee data:', employeeData[0]);
      }
      setEmployees(employeeData);
    } catch (error) {
      console.error('Failed to fetch employees:', error);
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  const createEmployee = async (userData) => {
    try {
      const response = await apiService.createUser(userData);
      console.log('Create Employee Response:', response);
      
      if (response.success || response.status === 200 || response.status === 201) {
        // Since GET endpoint doesn't exist, add the created employee to local state
        // Try to fetch first, if it fails, just add locally
        try {
          await fetchEmployees();
        } catch {
          // If fetch fails, add the employee locally with response data
          const newEmployee = response.data || response.user || {
            ...userData,
            id: Date.now(), // temporary ID
          };
          setEmployees(prev => [...prev, newEmployee]);
        }
        return { success: true };
      }
      return { success: false, error: response.message || 'Failed to create employee' };
    } catch (error) {
      console.error('Create employee error:', error);
      return { success: false, error: error.message };
    }
  };

  const updateEmployee = async (userId, updates) => {
    try {
      const response = await apiService.updateUserRole(userId, updates.role);
      if (response.success || response.status === 200) {
        await fetchEmployees();
        return { success: true };
      }
      return { success: false, error: response.message };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const deleteEmployee = async (userId) => {
    try {
      const response = await apiService.deleteUser(userId);
      if (response.success) {
        await fetchEmployees();
        return { success: true };
      }
      return { success: false, error: response.message };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

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

  const filteredEmployees = employees.filter(emp =>
    (emp.user?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
    (emp.username?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
    (emp.email?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
    (emp.role?.toLowerCase().includes(searchTerm.toLowerCase()) || false)
  );

  const handleEditUser = (user) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
  };

  const handleDeleteUser = async (userId) => {
    if (userId === currentUser.id) {
      alert('You cannot delete your own account');
      return;
    }
    
    if (confirm('Are you sure you want to delete this employee?')) {
      await deleteEmployee(userId);
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
    total: employees.length,
    admin: employees.filter(u => u.role === 'admin').length,
    lead: employees.filter(u => u.role === 'lead').length,
    designer: employees.filter(u => u.role === 'designer').length
  };

  return (
    <main className="flex-1 p-6 md:p-10 bg-dark overflow-y-auto">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Employee Management</h1>
          <p className="text-gray-text mt-1">Manage employee accounts, roles and permissions</p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-accent text-dark px-4 py-2 rounded flex items-center gap-2 hover:bg-yellow-500 transition text-sm font-medium"
        >
          <span className="text-lg">👤</span> Create Employee
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-card-dark p-4 rounded border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Employees</p>
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
            placeholder="Search employees by name, email, or role..."
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
                <th className="text-left p-4 text-gray-300 font-medium">Employee</th>
                <th className="text-left p-4 text-gray-300 font-medium">Mobile</th>
                <th className="text-left p-4 text-gray-300 font-medium">Role</th>
                <th className="text-left p-4 text-gray-300 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {loading ? (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-gray-400">
                    Loading employees...
                  </td>
                </tr>
              ) : filteredEmployees.map((emp) => (
                <tr key={emp.id} className="hover:bg-dark/50">
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-white">{emp.user || emp.username}</div>
                      {emp.email && <div className="text-sm text-gray-400">{emp.email}</div>}
                    </div>
                  </td>
                  <td className="p-4 text-gray-300">
                    {emp.mobile || emp.phone || emp.phoneNumber || emp.contact || emp.number || emp.mobile_number || emp.telephone || emp.cell || emp.cellphone || 'N/A'}
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs border ${getRoleColor(emp.role)}`}>
                      {emp.role?.charAt(0).toUpperCase() + emp.role?.slice(1)}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditUser(emp)}
                        className="text-blue-400 hover:text-blue-300 text-sm"
                      >
                        Edit
                      </button>
                      {emp.id !== currentUser.id && (
                        <button
                          onClick={() => handleDeleteUser(emp.id)}
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

        {!loading && filteredEmployees.length === 0 && (
          <div className="p-8 text-center text-gray-400">
            No employees found matching your search criteria.
          </div>
        )}
      </div>

      {/* Create Employee Modal */}
      <CreateUserModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={createEmployee}
      />

      {/* Edit Employee Modal */}
      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingUser(null);
        }}
        user={editingUser}
        onUpdate={updateEmployee}
      />
    </main>
  );
}

function CreateUserModal({ isOpen, onClose, onCreate }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    mobile: '',
    password: '',
    role: 'designer'
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    // Basic validation
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.mobile.trim()) newErrors.mobile = 'Mobile is required';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    const result = await onCreate(formData);
    if (result.success) {
      setFormData({ username: '', email: '', mobile: '', password: '', role: 'designer' });
      onClose();
    } else {
      setErrors({ general: result.error || 'Failed to create employee' });
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Employee">
      <form onSubmit={handleSubmit} className="space-y-4">
        {errors.general && (
          <div className="bg-red-900/20 border border-red-500/50 text-red-400 p-3 rounded text-sm">
            {errors.general}
          </div>
        )}
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className="w-full bg-dark border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-accent"
          />
          {errors.username && <p className="text-red-400 text-sm mt-1">{errors.username}</p>}
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
          <label className="block text-sm font-medium text-gray-300 mb-2">Mobile</label>
          <input
            type="tel"
            value={formData.mobile}
            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
            className="w-full bg-dark border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-accent"
            placeholder="10-digit mobile number"
          />
          {errors.mobile && <p className="text-red-400 text-sm mt-1">{errors.mobile}</p>}
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
            {loading ? 'Creating...' : 'Create Employee'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

function EditUserModal({ isOpen, onClose, user, onUpdate }) {
  const [role, setRole] = useState('designer');
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (user) {
      setRole(user.role || 'designer');
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await onUpdate(user.id, { role });
    setLoading(false);
    onClose();
  };

  if (!isOpen || !user) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Employee Role">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full bg-dark border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-accent"
          >
            <option value="designer">Designer</option>
            <option value="lead">Lead</option>
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
            {loading ? 'Updating...' : 'Update Role'}
          </button>
        </div>
      </form>
    </Modal>
  );
}