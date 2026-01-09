import React, { useState } from "react";
import Modal from "./Modal";

const clientTypes = ["Residential", "Commercial", "Hospitality", "Retail", "Office Space"];
const cities = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Pune", "Kochi", "Kolkata", "Ahmedabad"];
const managers = ["Priya Mehta", "Vikram Singh", "Neha Gupta", "Arpita Singh"];

export default function AddClientModal({ isOpen, onClose, onAddClient }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    type: "",
    city: "",
    manager: "",
    notes: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.type) newErrors.type = "Client type is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.manager) newErrors.manager = "Manager assignment is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onAddClient(formData);
      handleReset();
      onClose();
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      type: "",
      city: "",
      manager: "",
      notes: ""
    });
    setErrors({});
  };

  const handleCancel = () => {
    handleReset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCancel} title="Add New Client">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Client Name */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Client Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter client name"
              className={`w-full bg-dark border ${errors.name ? 'border-red-500' : 'border-gray-border'} rounded px-4 py-2.5 text-white placeholder-gray-text focus:outline-none focus:border-accent transition`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="client@email.com"
              className={`w-full bg-dark border ${errors.email ? 'border-red-500' : 'border-gray-border'} rounded px-4 py-2.5 text-white placeholder-gray-text focus:outline-none focus:border-accent transition`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Phone Number *
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

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Client Type *
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className={`w-full bg-dark border ${errors.type ? 'border-red-500' : 'border-gray-border'} rounded px-4 py-2.5 text-white focus:outline-none focus:border-accent transition`}
            >
              <option value="">Select type</option>
              {clientTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type}</p>}
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              City *
            </label>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`w-full bg-dark border ${errors.city ? 'border-red-500' : 'border-gray-border'} rounded px-4 py-2.5 text-white focus:outline-none focus:border-accent transition`}
            >
              <option value="">Select city</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
          </div>

          {/* Assigned Manager */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Assign to Manager *
            </label>
            <select
              name="manager"
              value={formData.manager}
              onChange={handleChange}
              className={`w-full bg-dark border ${errors.manager ? 'border-red-500' : 'border-gray-border'} rounded px-4 py-2.5 text-white focus:outline-none focus:border-accent transition`}
            >
              <option value="">Select manager</option>
              {managers.map((manager) => (
                <option key={manager} value={manager}>
                  {manager}
                </option>
              ))}
            </select>
            {errors.manager && <p className="text-red-500 text-xs mt-1">{errors.manager}</p>}
          </div>

          {/* Notes */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-white mb-2">
              Notes (Optional)
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
              placeholder="Additional information about the client..."
              className="w-full bg-dark border border-gray-border rounded px-4 py-2.5 text-white placeholder-gray-text focus:outline-none focus:border-accent transition resize-none"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 mt-8">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2.5 border border-gray-border text-gray-text rounded hover:border-accent hover:text-white transition text-sm font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-accent text-dark rounded hover:bg-yellow-500 transition text-sm font-medium"
          >
            Add Client
          </button>
        </div>
      </form>
    </Modal>
  );
}
