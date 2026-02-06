import React, { useState } from "react";
import Modal from "./Modal";
import api from '../services/api';

export default function CreateQuotationModal({ isOpen, onClose, onCreateQuotation }) {
  const [formData, setFormData] = useState({
    client_id: "",
    project_id: "",
    baseAmount: "",
    validUntil: "",
    discount: "0",
    notes: ""
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.client_id) newErrors.client_id = "Client ID is required";
    if (!formData.project_id) newErrors.project_id = "Project ID is required";
    if (!formData.baseAmount) newErrors.baseAmount = "Base amount is required";
    if (!formData.validUntil) newErrors.validUntil = "Valid until date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      setErrors({});
      try {
        // Prepare data for API (camelCase fields as expected by backend)
        const payload = {
          clientId: Number(formData.client_id),
          projectId: Number(formData.project_id),
          baseAmount: Number(formData.baseAmount),
          discountPercent: Number(formData.discount),
          validUntil: formData.validUntil,
          notes: formData.notes,
          status: 'sent',
        };
        const response = await api.createQuotation(payload);
        console.log('Quotation created:', response);
        if (onCreateQuotation) onCreateQuotation(response.data || payload);
        handleReset();
        onClose();
      } catch (error) {
        console.error('Failed to create quotation:', error);
        setErrors({ api: error.message || 'Failed to create quotation' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleReset = () => {
    setFormData({
      client_id: "",
      project_id: "",
      baseAmount: "",
      validUntil: "",
      discount: "0",
      notes: ""
    });
    setErrors({});
  };

  const handleCancel = () => {
    handleReset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCancel} title="Create New Quotation" icon="📋">
      <form onSubmit={handleSubmit}>
        {errors.api && (
          <div className="mb-4 p-3 bg-red-500 bg-opacity-10 border border-red-500 rounded text-red-500 text-sm">
            {errors.api}
          </div>
        )}
        <div className="space-y-6">
          {/* Client ID */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Client ID
            </label>
            <input
              type="number"
              name="client_id"
              value={formData.client_id}
              onChange={handleChange}
              placeholder="Enter client ID"
              className={`w-full bg-dark border ${errors.client_id ? 'border-red-500' : 'border-gray-border'} rounded px-4 py-2.5 text-white placeholder-gray-text focus:outline-none focus:border-accent transition`}
            />
            {errors.client_id && <p className="text-red-500 text-xs mt-1">{errors.client_id}</p>}
          </div>

          {/* Project ID */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Project ID
            </label>
            <input
              type="number"
              name="project_id"
              value={formData.project_id}
              onChange={handleChange}
              placeholder="Enter project ID"
              className={`w-full bg-dark border ${errors.project_id ? 'border-red-500' : 'border-gray-border'} rounded px-4 py-2.5 text-white placeholder-gray-text focus:outline-none focus:border-accent transition`}
            />
            {errors.project_id && <p className="text-red-500 text-xs mt-1">{errors.project_id}</p>}
          </div>

          {/* Base Amount */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Base Amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-text">₹</span>
              <input
                type="text"
                name="baseAmount"
                value={formData.baseAmount ? parseInt(formData.baseAmount).toLocaleString('en-IN') : ""}
                onChange={(e) => {
                  const value = e.target.value.replace(/,/g, '');
                  if (/^\d*$/.test(value)) {
                    handleChange({ target: { name: 'baseAmount', value } });
                  }
                }}
                placeholder="80,00,000"
                className={`w-full bg-dark border ${errors.baseAmount ? 'border-red-500' : 'border-gray-border'} rounded pl-8 pr-4 py-2.5 text-white placeholder-gray-text focus:outline-none focus:border-accent transition`}
              />
            </div>
            <p className="text-gray-text text-xs mt-1 flex items-center gap-1">
              <span>💡</span> You can adjust this amount as needed
            </p>
            {errors.baseAmount && <p className="text-red-500 text-xs mt-1">{errors.baseAmount}</p>}
          </div>

          {/* Valid Until and Discount */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Valid Until
              </label>
              <input
                type="date"
                name="validUntil"
                value={formData.validUntil}
                onChange={handleChange}
                placeholder="dd-mm-yyyy"
                className={`w-full bg-dark border ${errors.validUntil ? 'border-red-500' : 'border-gray-border'} rounded px-4 py-2.5 text-white placeholder-gray-text focus:outline-none focus:border-accent transition`}
              />
              {errors.validUntil && <p className="text-red-500 text-xs mt-1">{errors.validUntil}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Discount (%)
              </label>
              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                min="0"
                max="100"
                className="w-full bg-dark border border-gray-border rounded px-4 py-2.5 text-white placeholder-gray-text focus:outline-none focus:border-accent transition"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
              placeholder="Add any additional notes..."
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
            disabled={isLoading}
            className="px-6 py-2.5 bg-accent text-dark rounded hover:bg-yellow-500 transition text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creating...' : 'Create Quotation'}
          </button>
        </div>
      </form>
      {errors.api && (
        <div className="text-red-500 text-sm mb-2">{errors.api}</div>
      )}
    </Modal>
  );
}
