import React, { useState } from "react";
import Modal from "./Modal";

const clients = [
  "Rajesh & Priya Mehra",
  "TechCorp Solutions",
  "Rohit & Sneha Joshi",
  "Dr. Suresh Menon",
  "Café Mocha Chain"
];

const projects = [
  { name: "Juhu Villa Project", type: "Residential", baseAmount: 5000000 },
  { name: "TechCorp HQ Office", type: "Commercial", baseAmount: 8000000 },
  { name: "BKC Office Project", type: "Commercial", baseAmount: 7500000 },
  { name: "Luxury Penthouse", type: "Residential", baseAmount: 9000000 }
];

export default function CreateQuotationModal({ isOpen, onClose, onCreateQuotation }) {
  const [formData, setFormData] = useState({
    client: "",
    project: "",
    baseAmount: "",
    validUntil: "",
    discount: "0",
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

  const handleProjectChange = (e) => {
    const projectName = e.target.value;
    const selectedProject = projects.find(p => p.name === projectName);
    
    setFormData(prev => ({
      ...prev,
      project: projectName,
      baseAmount: selectedProject ? selectedProject.baseAmount.toString() : ""
    }));
    
    if (errors.project) {
      setErrors(prev => ({ ...prev, project: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.client) newErrors.client = "Client is required";
    if (!formData.project) newErrors.project = "Project is required";
    if (!formData.baseAmount) newErrors.baseAmount = "Base amount is required";
    if (!formData.validUntil) newErrors.validUntil = "Valid until date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onCreateQuotation(formData);
      handleReset();
      onClose();
    }
  };

  const handleReset = () => {
    setFormData({
      client: "",
      project: "",
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

  const selectedProject = projects.find(p => p.name === formData.project);

  return (
    <Modal isOpen={isOpen} onClose={handleCancel} title="Create New Quotation" icon="📋">
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Client */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Client
            </label>
            <select
              name="client"
              value={formData.client}
              onChange={handleChange}
              className={`w-full bg-dark border ${errors.client ? 'border-red-500' : 'border-gray-border'} rounded px-4 py-2.5 text-white focus:outline-none focus:border-accent transition`}
            >
              <option value="">Select client</option>
              {clients.map((client) => (
                <option key={client} value={client}>
                  {client}
                </option>
              ))}
            </select>
            {errors.client && <p className="text-red-500 text-xs mt-1">{errors.client}</p>}
          </div>

          {/* Project */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Project
            </label>
            <select
              name="project"
              value={formData.project}
              onChange={handleProjectChange}
              className={`w-full bg-dark border ${errors.project ? 'border-red-500' : 'border-gray-border'} rounded px-4 py-2.5 text-white focus:outline-none focus:border-accent transition`}
            >
              <option value="">Select project</option>
              {projects.map((project) => (
                <option key={project.name} value={project.name}>
                  {project.name} ({project.type})
                </option>
              ))}
            </select>
            {errors.project && <p className="text-red-500 text-xs mt-1">{errors.project}</p>}
          </div>

          {/* Base Amount */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Base Amount
              {selectedProject && (
                <span className="text-gray-text text-xs ml-2">
                  (Pre-filled from {selectedProject.type} pricing)
                </span>
              )}
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
            className="px-6 py-2.5 bg-accent text-dark rounded hover:bg-yellow-500 transition text-sm font-medium"
          >
            Create Quotation
          </button>
        </div>
      </form>
    </Modal>
  );
}
