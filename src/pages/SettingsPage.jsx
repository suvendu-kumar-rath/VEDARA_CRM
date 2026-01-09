import React, { useState } from "react";

const tabs = [
  { id: "company", label: "Company", icon: "🏢" },
  { id: "pricing", label: "Pricing", icon: "₹" },
  { id: "branding", label: "Branding", icon: "🎨" },
  { id: "tax", label: "Tax & GST", icon: "📋" },
  { id: "users", label: "User Roles", icon: "👥" },
  { id: "notifications", label: "Notifications", icon: "🔔" }
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("company");
  const [formData, setFormData] = useState({
    companyName: "Luxe Interiors Studio",
    legalName: "Luxe Interiors Design Pvt. Ltd.",
    email: "hello@luxeinteriors.in",
    phone: "+91 22 4567 8900",
    website: "www.luxeinteriors.in",
    established: "2018",
    address: "301, Design Tower, Linking Road, Bandra West, Mumbai - 400050"
  });

  const [pricingData, setPricingData] = useState({
    apartment: "2500000",
    villa: "5000000",
    penthouse: "6500000",
    commercial: "8000000",
    bungalow: "4500000"
  });

  const [hasChanges, setHasChanges] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setHasChanges(true);
  };

  const handlePricingChange = (e) => {
    const { name, value } = e.target;
    const numericValue = value.replace(/,/g, '');
    if (/^\d*$/.test(numericValue)) {
      setPricingData(prev => ({ ...prev, [name]: numericValue }));
      setHasChanges(true);
    }
  };

  const handleSaveChanges = () => {
    console.log("Saving changes:", { ...formData, pricing: pricingData });
    setHasChanges(false);
    // Here you would typically save to backend
  };

  return (
    <main className="flex-1 p-6 md:p-10 bg-dark overflow-y-auto">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-gray-text mt-1">Manage your studio preferences</p>
        </div>
        <button 
          onClick={handleSaveChanges}
          disabled={!hasChanges}
          className={`px-6 py-2.5 rounded flex items-center gap-2 transition text-sm font-medium ${
            hasChanges 
              ? 'bg-accent text-dark hover:bg-yellow-500' 
              : 'bg-gray-border text-gray-text cursor-not-allowed'
          }`}
        >
          <span>💾</span> Save Changes
        </button>
      </div>

      {/* Tabs */}
      <div className="mb-8 flex items-center gap-2 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 rounded flex items-center gap-2 whitespace-nowrap transition text-sm font-medium ${
              activeTab === tab.id
                ? 'bg-accent text-dark'
                : 'bg-dark-light border border-gray-border text-gray-text hover:border-accent hover:text-white'
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Company Profile Section */}
      {activeTab === "company" && (
        <div className="bg-dark-light border border-gray-border rounded-lg p-6 md:p-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white">Company Profile</h2>
            <p className="text-gray-text text-sm mt-1">Basic information about your design studio</p>
          </div>

          <div className="space-y-6">
            {/* Company Name & Legal Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full bg-dark border border-gray-border rounded px-4 py-3 text-white placeholder-gray-text focus:outline-none focus:border-accent transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Legal Name
                </label>
                <input
                  type="text"
                  name="legalName"
                  value={formData.legalName}
                  onChange={handleChange}
                  className="w-full bg-dark border border-gray-border rounded px-4 py-3 text-white placeholder-gray-text focus:outline-none focus:border-accent transition"
                />
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-dark border border-gray-border rounded px-4 py-3 text-white placeholder-gray-text focus:outline-none focus:border-accent transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-dark border border-gray-border rounded px-4 py-3 text-white placeholder-gray-text focus:outline-none focus:border-accent transition"
                />
              </div>
            </div>

            {/* Website & Established */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Website
                </label>
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full bg-dark border border-gray-border rounded px-4 py-3 text-white placeholder-gray-text focus:outline-none focus:border-accent transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Established
                </label>
                <input
                  type="text"
                  name="established"
                  value={formData.established}
                  onChange={handleChange}
                  className="w-full bg-dark border border-gray-border rounded px-4 py-3 text-white placeholder-gray-text focus:outline-none focus:border-accent transition"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full bg-dark border border-gray-border rounded px-4 py-3 text-white placeholder-gray-text focus:outline-none focus:border-accent transition"
              />
            </div>
          </div>
        </div>
      )}

      {/* Pricing Section */}
      {activeTab === "pricing" && (
        <div className="bg-dark-light border border-gray-border rounded-lg p-6 md:p-8">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-accent text-xl">₹</span>
              <h2 className="text-xl font-bold text-white">Project Type Pricing</h2>
            </div>
            <p className="text-gray-text text-sm">
              Set base quotation amounts for each project type. These will be pre-filled when creating new quotations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {/* Apartment */}
            <div className="bg-dark border border-gray-border rounded-lg p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-2xl">🏢</div>
                <div>
                  <h3 className="text-white font-semibold">Apartment</h3>
                  <p className="text-gray-text text-xs">Standard residential apartment</p>
                </div>
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-text">₹</span>
                <input
                  type="text"
                  name="apartment"
                  value={pricingData.apartment ? parseInt(pricingData.apartment).toLocaleString('en-IN') : ""}
                  onChange={handlePricingChange}
                  className="w-full bg-dark-light border border-gray-border rounded pl-8 pr-4 py-3 text-white placeholder-gray-text focus:outline-none focus:border-accent transition"
                />
              </div>
            </div>

            {/* Villa */}
            <div className="bg-dark border border-gray-border rounded-lg p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-2xl">🏡</div>
                <div>
                  <h3 className="text-white font-semibold">Villa</h3>
                  <p className="text-gray-text text-xs">Standalone villa/house</p>
                </div>
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-text">₹</span>
                <input
                  type="text"
                  name="villa"
                  value={pricingData.villa ? parseInt(pricingData.villa).toLocaleString('en-IN') : ""}
                  onChange={handlePricingChange}
                  className="w-full bg-dark-light border border-gray-border rounded pl-8 pr-4 py-3 text-white placeholder-gray-text focus:outline-none focus:border-accent transition"
                />
              </div>
            </div>

            {/* Penthouse */}
            <div className="bg-dark border border-gray-border rounded-lg p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-2xl">🏙️</div>
                <div>
                  <h3 className="text-white font-semibold">Penthouse</h3>
                  <p className="text-gray-text text-xs">Luxury penthouse unit</p>
                </div>
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-text">₹</span>
                <input
                  type="text"
                  name="penthouse"
                  value={pricingData.penthouse ? parseInt(pricingData.penthouse).toLocaleString('en-IN') : ""}
                  onChange={handlePricingChange}
                  className="w-full bg-dark-light border border-gray-border rounded pl-8 pr-4 py-3 text-white placeholder-gray-text focus:outline-none focus:border-accent transition"
                />
              </div>
            </div>

            {/* Commercial */}
            <div className="bg-dark border border-gray-border rounded-lg p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-2xl">🏢</div>
                <div>
                  <h3 className="text-white font-semibold">Commercial</h3>
                  <p className="text-gray-text text-xs">Office/retail space</p>
                </div>
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-text">₹</span>
                <input
                  type="text"
                  name="commercial"
                  value={pricingData.commercial ? parseInt(pricingData.commercial).toLocaleString('en-IN') : ""}
                  onChange={handlePricingChange}
                  className="w-full bg-dark-light border border-gray-border rounded pl-8 pr-4 py-3 text-white placeholder-gray-text focus:outline-none focus:border-accent transition"
                />
              </div>
            </div>

            {/* Bungalow */}
            <div className="bg-dark border border-gray-border rounded-lg p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-2xl">🏠</div>
                <div>
                  <h3 className="text-white font-semibold">Bungalow</h3>
                  <p className="text-gray-text text-xs">Traditional bungalow</p>
                </div>
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-text">₹</span>
                <input
                  type="text"
                  name="bungalow"
                  value={pricingData.bungalow ? parseInt(pricingData.bungalow).toLocaleString('en-IN') : ""}
                  onChange={handlePricingChange}
                  className="w-full bg-dark-light border border-gray-border rounded pl-8 pr-4 py-3 text-white placeholder-gray-text focus:outline-none focus:border-accent transition"
                />
              </div>
            </div>
          </div>

          {/* Tip */}
          <div className="bg-dark border border-gray-border rounded-lg p-4">
            <p className="text-gray-text text-sm flex items-start gap-2">
              <span className="text-lg">💡</span>
              <span>
                <strong className="text-white">Tip:</strong> These base amounts will be automatically filled when creating a new quotation. You can always adjust the final amount manually.
              </span>
            </p>
          </div>
        </div>
      )}

      {/* Branding Section */}
      {activeTab === "branding" && (
        <div className="bg-dark-light border border-gray-border rounded-lg p-6 md:p-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white">Branding</h2>
            <p className="text-gray-text text-sm mt-1">Customize your studio's brand identity</p>
          </div>
          <div className="text-gray-text text-center py-10">
            Branding settings coming soon...
          </div>
        </div>
      )}

      {/* Tax & GST Section */}
      {activeTab === "tax" && (
        <div className="bg-dark-light border border-gray-border rounded-lg p-6 md:p-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white">Tax & GST Configuration</h2>
            <p className="text-gray-text text-sm mt-1">Set up tax rates and GST details for quotations.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">GSTIN</label>
              <input
                type="text"
                name="gstin"
                value={formData.gstin || "27AABCU9603R1ZM"}
                onChange={handleChange}
                className="w-full bg-dark border border-gray-border rounded px-4 py-3 text-white placeholder-gray-text focus:outline-none focus:border-accent transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">PAN</label>
              <input
                type="text"
                name="pan"
                value={formData.pan || "AABCU9603R"}
                onChange={handleChange}
                className="w-full bg-dark border border-gray-border rounded px-4 py-3 text-white placeholder-gray-text focus:outline-none focus:border-accent transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Default GST Rate</label>
              <select
                name="gstRate"
                value={formData.gstRate || "18%"}
                onChange={handleChange}
                className="w-full bg-dark border border-gray-border rounded px-4 py-3 text-white focus:outline-none focus:border-accent transition"
              >
                <option value="5%">5%</option>
                <option value="12%">12%</option>
                <option value="18%">18%</option>
                <option value="28%">28%</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">State</label>
              <input
                type="text"
                name="state"
                value={formData.state || "Maharashtra"}
                onChange={handleChange}
                className="w-full bg-dark border border-gray-border rounded px-4 py-3 text-white placeholder-gray-text focus:outline-none focus:border-accent transition"
              />
            </div>
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium text-white mb-2">Bank Details for Quotations</label>
            <textarea
              name="bankDetails"
              value={formData.bankDetails || `Bank: HDFC Bank Ltd.\nAccount Name: Luxe Interiors Design Pvt. Ltd.\nAccount No: 50200012345678\nIFSC: HDFC0001234\nBranch: Bandra West, Mumbai`}
              onChange={handleChange}
              rows={5}
              className="w-full bg-dark border border-gray-border rounded px-4 py-3 text-white placeholder-gray-text focus:outline-none focus:border-accent transition resize-none"
            />
          </div>
        </div>
      )}

      {/* User Roles Section */}
      {activeTab === "users" && (
        <div className="bg-dark-light border border-gray-border rounded-lg p-6 md:p-8">
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white">User Roles</h2>
              <p className="text-gray-text text-sm mt-1">Manage team members and their permissions</p>
            </div>
            <button className="bg-accent text-dark px-5 py-2 rounded flex items-center gap-2 hover:bg-yellow-500 transition text-sm font-medium">
              <span className="text-lg">+</span> Add User
            </button>
          </div>
          <div className="divide-y divide-gray-border">
            {[
              { initials: 'PM', name: 'Priya Mehta', role: 'Senior Designer', permission: 'Editor' },
              { initials: 'VS', name: 'Vikram Singh', role: 'Project Manager', permission: 'Editor' },
              { initials: 'NG', name: 'Neha Gupta', role: 'Sales Lead', permission: 'Editor' },
              { initials: 'AD', name: 'Anita Desai', role: 'Principal Designer', permission: 'Editor' },
              { initials: 'KM', name: 'Karthik Menon', role: 'Designer', permission: 'Editor' },
              { initials: 'RK', name: 'Ramesh Kumar', role: 'Site Manager', permission: 'Editor' },
              { initials: 'SP', name: 'Sunil Patil', role: 'Site Manager', permission: 'Editor' },
            ].map((user, idx) => (
              <div key={user.name} className="flex items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded bg-accent text-dark flex items-center justify-center text-lg font-bold">{user.initials}</div>
                  <div>
                    <div className="text-white font-medium text-base">{user.name}</div>
                    <div className="text-gray-text text-sm">{user.role}</div>
                  </div>
                </div>
                <select className="bg-dark-light border border-gray-border text-white px-4 py-2 rounded text-sm font-medium focus:outline-none focus:border-accent transition">
                  <option value="Editor">Editor</option>
                  <option value="Admin">Admin</option>
                  <option value="Viewer">Viewer</option>
                </select>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notifications Section */}
      {activeTab === "notifications" && (
        <div className="bg-dark-light border border-gray-border rounded-lg p-6 md:p-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white">Notifications</h2>
            <p className="text-gray-text text-sm mt-1">Configure notification preferences</p>
          </div>
          <div className="text-gray-text text-center py-10">
            Notification settings coming soon...
          </div>
        </div>
      )}
    </main>
  );
}
