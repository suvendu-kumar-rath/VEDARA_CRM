import React, { useState } from "react";
import Modal from "./Modal";

const sources = ["Instagram", "Facebook", "Website", "Google Ads", "Referral", "Walk-in", "Email Campaign", "LinkedIn"];
const budgetRanges = ["₹10-15 Lakhs", "₹15-20 Lakhs", "₹20-25 Lakhs", "₹25-35 Lakhs", "₹35-45 Lakhs", "₹45-60 Lakhs", "₹60-80 Lakhs", "₹80 Lakhs - 1 Crore", "₹1-1.5 Crore", "₹1.5+ Crore"];
const propertyTypes = ["Apartment", "Villa", "Penthouse", "Bungalow", "Duplex", "Studio", "Commercial", "Office Space", "Retail Space"];
const teamMembers = ["Priya Singh", "Rahul Mehta", "Anjali Desai", "Karan Sharma"];

export default function AddLeadModal({ isOpen, onClose, onAddLead }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    source: "",
    budget: "",
    property: "",
    city: "",
    assignedTo: "",
    notes: ""
  });

  const [errors, setErrors] = useState({});

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
    if (!formData.budget) newErrors.budget = "Budget is required";
    if (!formData.property) newErrors.property = "Property type is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.assignedTo) newErrors.assignedTo = "Assignment is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onAddLead(formData);
      handleReset();
      onClose();
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      source: "",
      budget: "",
      property: "",
      city: "",
      assignedTo: "",
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
                <option key={source} value={source}>{source}</option>
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
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className={`w-full bg-dark border ${errors.budget ? 'border-red-500' : 'border-gray-border'} rounded px-4 py-2.5 text-white focus:outline-none focus:border-accent transition appearance-none cursor-pointer ${!formData.budget ? 'text-gray-text' : ''}`}
            >
              <option value="">Select budget</option>
              {budgetRanges.map(budget => (
                <option key={budget} value={budget}>{budget}</option>
              ))}
            </select>
            {errors.budget && <p className="text-red-500 text-xs mt-1">{errors.budget}</p>}
          </div>

          {/* Property Type */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Property Type
            </label>
            <select
              name="property"
              value={formData.property}
              onChange={handleChange}
              className={`w-full bg-dark border ${errors.property ? 'border-red-500' : 'border-gray-border'} rounded px-4 py-2.5 text-white focus:outline-none focus:border-accent transition appearance-none cursor-pointer ${!formData.property ? 'text-gray-text' : ''}`}
            >
              <option value="">Select type</option>
              {propertyTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.property && <p className="text-red-500 text-xs mt-1">{errors.property}</p>}
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

          {/* Assigned To */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Assigned To
            </label>
            <select
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              className={`w-full bg-dark border ${errors.assignedTo ? 'border-red-500' : 'border-gray-border'} rounded px-4 py-2.5 text-white focus:outline-none focus:border-accent transition appearance-none cursor-pointer ${!formData.assignedTo ? 'text-gray-text' : ''}`}
            >
              <option value="">Select team member</option>
              {teamMembers.map(member => (
                <option key={member} value={member}>{member}</option>
              ))}
            </select>
            {errors.assignedTo && <p className="text-red-500 text-xs mt-1">{errors.assignedTo}</p>}
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
            className="px-6 py-2.5 rounded bg-accent text-dark hover:bg-yellow-500 transition font-medium"
          >
            Add Lead
          </button>
        </div>
      </form>
    </Modal>
  );
}
