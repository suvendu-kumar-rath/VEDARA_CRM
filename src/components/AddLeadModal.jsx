import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import apiService from "../services/api";

const sources = ["instagram", "facebook", "website", "google_ads", "referral", "walk-in", "email_campaign", "linkedin"];
const budgetRanges = ["₹10L–₹15L", "₹15L–₹20L", "₹20L–₹25L", "₹25L–₹35L", "₹35L–₹45L", "₹45L–₹60L", "₹50L–₹75L", "₹60L–₹80L", "₹80L–₹1Cr", "₹1Cr–₹1.5Cr", "₹1.5Cr+"];
const propertyTypes = ["1BHK", "2BHK", "3BHK", "4BHK", "Villa", "Penthouse", "Duplex", "Studio", ];
const statuses = ["contacted", "converted"];

export default function AddLeadModal({ isOpen, onClose, onAddLead }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    source: "",
    budget_range: "",
    property_type: "",
    city: "",
    status: "contacted",
    assigned_to: "",
    notes: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [loadingEmployees, setLoadingEmployees] = useState(false);

  // Fetch employees when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchEmployees();
    }
  }, [isOpen]);

  const fetchEmployees = async () => {
    try {
      setLoadingEmployees(true);
      const response = await apiService.getEmployees();
      
      let employeeData = [];
      
      // Handle different response structures
      if (Array.isArray(response)) {
        employeeData = response;
      } else if (response?.data) {
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
        employeeData = response.users;
      } else if (response?.employees) {
        employeeData = response.employees;
      }
      
      setEmployees(employeeData);
    } catch (error) {
      console.error('Failed to fetch employees:', error);
      setEmployees([]);
    } finally {
      setLoadingEmployees(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.source) newErrors.source = "Source is required";
    if (!formData.budget_range) newErrors.budget_range = "Budget is required";
    if (!formData.property_type) newErrors.property_type = "Property type is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.assigned_to) newErrors.assigned_to = "Please assign to an employee";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setLoading(true);
      const result = await onAddLead(formData);
      setLoading(false);
      
      if (result.success) {
        handleReset();
        onClose();
      } else {
        setErrors({ general: result.error || 'Failed to create lead' });
      }
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      source: "",
      budget_range: "",
      property_type: "",
      city: "",
      status: "new",
      assigned_to: "",
      notes: ""
    });
    setErrors({});
  };

  const handleCancel = () => {
    handleReset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCancel} title="Add New Lead">
      <form onSubmit={handleSubmit}>
        {errors.general && (
          <div className="mb-4 bg-red-900/20 border border-red-500/50 text-red-400 p-3 rounded text-sm">
            {errors.general}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
              className={`w-full bg-dark border ${errors.name ? 'border-red-500' : 'border-gray-border'} rounded px-4 py-2.5 text-white placeholder-gray-text focus:outline-none focus:border-accent transition`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
              className={`w-full bg-dark border ${errors.phone ? 'border-red-500' : 'border-gray-border'} rounded px-4 py-2.5 text-white placeholder-gray-text focus:outline-none focus:border-accent transition`}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@example.com"
              className={`w-full bg-dark border ${errors.email ? 'border-red-500' : 'border-gray-border'} rounded px-4 py-2.5 text-white placeholder-gray-text focus:outline-none focus:border-accent transition`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Source */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Source
            </label>
            <select
              name="source"
              value={formData.source}
              onChange={handleChange}
              className={`w-full bg-dark border ${errors.source ? 'border-red-500' : 'border-gray-border'} rounded px-4 py-2.5 text-white focus:outline-none focus:border-accent transition appearance-none cursor-pointer ${!formData.source ? 'text-gray-text' : ''}`}
            >
              <option value="">Select source</option>
              {sources.map(source => (
                <option key={source} value={source}>
                  {source.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </option>
              ))}
            </select>
            {errors.source && <p className="text-red-500 text-xs mt-1">{errors.source}</p>}
          </div>

          {/* Budget Range */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Budget Range
            </label>
            <select
              name="budget_range"
              value={formData.budget_range}
              onChange={handleChange}
              className={`w-full bg-dark border ${errors.budget_range ? 'border-red-500' : 'border-gray-border'} rounded px-4 py-2.5 text-white focus:outline-none focus:border-accent transition appearance-none cursor-pointer ${!formData.budget_range ? 'text-gray-text' : ''}`}
            >
              <option value="">Select budget</option>
              {budgetRanges.map(budget => (
                <option key={budget} value={budget}>{budget}</option>
              ))}
            </select>
            {errors.budget_range && <p className="text-red-500 text-xs mt-1">{errors.budget_range}</p>}
          </div>

          {/* Property Type */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Property Type
            </label>
            <select
              name="property_type"
              value={formData.property_type}
              onChange={handleChange}
              className={`w-full bg-dark border ${errors.property_type ? 'border-red-500' : 'border-gray-border'} rounded px-4 py-2.5 text-white focus:outline-none focus:border-accent transition appearance-none cursor-pointer ${!formData.property_type ? 'text-gray-text' : ''}`}
            >
              <option value="">Select type</option>
              {propertyTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.property_type && <p className="text-red-500 text-xs mt-1">{errors.property_type}</p>}
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter city"
              className={`w-full bg-dark border ${errors.city ? 'border-red-500' : 'border-gray-border'} rounded px-4 py-2.5 text-white placeholder-gray-text focus:outline-none focus:border-accent transition`}
            />
            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full bg-dark border border-gray-border rounded px-4 py-2.5 text-white focus:outline-none focus:border-accent transition appearance-none cursor-pointer"
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
              ))}
            </select>
          </div>

          {/* Assigned To */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Assign To
            </label>
            <select
              name="assigned_to"
              value={formData.assigned_to}
              onChange={handleChange}
              className={`w-full bg-dark border ${errors.assigned_to ? 'border-red-500' : 'border-gray-border'} rounded px-4 py-2.5 text-white focus:outline-none focus:border-accent transition appearance-none cursor-pointer ${!formData.assigned_to ? 'text-gray-text' : ''}`}
              disabled={loadingEmployees}
            >
              <option value="">
                {loadingEmployees ? 'Loading employees...' : 'Select employee'}
              </option>
              {employees.map(employee => (
                <option key={employee.id} value={employee.id}>
                  {employee.user || employee.username || employee.name || employee.email} - {employee.role?.charAt(0).toUpperCase() + employee.role?.slice(1)}
                </option>
              ))}
            </select>
            {errors.assigned_to && <p className="text-red-500 text-xs mt-1">{errors.assigned_to}</p>}
          </div>
        </div>

        {/* Notes */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-white mb-2">
            Notes
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Any additional notes..."
            rows="4"
            className="w-full bg-dark border border-gray-border rounded px-4 py-2.5 text-white placeholder-gray-text focus:outline-none focus:border-accent transition resize-none"
          ></textarea>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2.5 rounded bg-dark border border-gray-border text-white hover:border-accent transition font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 rounded bg-accent text-dark hover:bg-yellow-500 transition font-medium disabled:opacity-50"
          >
            {loading ? 'Adding...' : 'Add Lead'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
