import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddClientModal from "../components/AddClientModal";
import apiService from "../services/api";

const statusColors = {
  green: "border-green-500 text-green-400",
  yellow: "border-yellow-500 text-yellow-400",
  orange: "border-orange-500 text-orange-400"
};

export default function ClientsPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [clients, setClients] = useState([]);
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const response = await apiService.getConvertedClients();
      console.log('Get Converted Clients Response:', response);
      
      if (response.success && response.data) {
        // Get converted clients from the response
        const clientsData = response.data.convertedClients || [];
        
        // Transform API data to match UI format
        const transformedClients = clientsData.map(client => ({
          id: client.id,
          name: client.name,
          email: client.email,
          phone: client.phone,
          type: client.type || "Residential",
          projects: client.projects || 0,
          city: client.address || client.city || "N/A",
          totalValue: client.totalValue || "₹0 L",
          manager: client.manager || "Unassigned",
          status: client.status || "Active",
          statusColor: getStatusColor(client.status),
          createdAt: client.createdAt,
          address: client.address
        }));
        setClients(transformedClients);
      }
    } catch (error) {
      console.error('Failed to fetch clients:', error);
      setClients([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colorMap = {
      'active': 'green',
      'completed': 'yellow',
      'on hold': 'orange',
      'inactive': 'orange'
    };
    return colorMap[status?.toLowerCase()] || 'green';
  };

  const handleAddClient = async (formData) => {
    try {
      const response = await apiService.createClient(formData);
      console.log('Create Client Response:', response);
      
      if (response.success || response.status === 200 || response.status === 201) {
        // Refresh clients list
        await fetchClients();
        return { success: true };
      }
      return { success: false, error: response.message };
    } catch (error) {
      console.error('Create client error:', error);
      return { success: false, error: error.message };
    }
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalClients = clients.length;
  const activeClients = clients.filter(c => c.status === "Active").length;
  const completedProjects = clients.reduce((sum, c) => sum + (c.projects || 0), 0);
  const totalRevenue = clients.reduce((sum, c) => {
    const value = parseFloat(c.totalValue?.replace(/[^0-9.]/g, '') || 0);
    return sum + value;
  }, 0);

  return (
    <main className="flex-1 p-6 md:p-10 bg-dark">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Clients</h1>
          <p className="text-gray-text mt-1">Manage your customer relationships</p>
        </div>
        <button 
          onClick={() => setIsAddClientModalOpen(true)}
          className="bg-dark border border-gray-border text-white px-4 py-2 rounded flex items-center gap-2 hover:border-accent hover:text-accent transition text-sm font-medium w-fit"
        >
          <span className="text-lg">+</span> Add Client
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-dark-light border border-gray-border rounded-lg p-5">
          <div className="flex items-center gap-3">
            <div className="text-2xl">👥</div>
            <div>
              <div className="text-2xl font-bold text-white">{totalClients}</div>
              <div className="text-sm text-gray-text">Total Clients</div>
            </div>
          </div>
        </div>
        <div className="bg-dark-light border border-gray-border rounded-lg p-5">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🔥</div>
            <div>
              <div className="text-2xl font-bold text-white">{activeClients}</div>
              <div className="text-sm text-gray-text">Active Clients</div>
            </div>
          </div>
        </div>
        <div className="bg-dark-light border border-gray-border rounded-lg p-5">
          <div className="flex items-center gap-3">
            <div className="text-2xl">✅</div>
            <div>
              <div className="text-2xl font-bold text-white">{completedProjects}</div>
              <div className="text-sm text-gray-text">Completed Projects</div>
            </div>
          </div>
        </div>
        <div className="bg-dark-light border border-gray-border rounded-lg p-5">
          <div className="flex items-center gap-3">
            <div className="text-2xl">💰</div>
            <div>
              <div className="text-2xl font-bold text-white">₹{totalRevenue.toFixed(1)} L</div>
              <div className="text-sm text-gray-text">Total Revenue</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-dark-light border border-gray-border rounded-lg p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-dark border border-gray-border rounded px-4 py-2.5 text-white placeholder-gray-text focus:outline-none focus:border-accent transition"
            />
          </div>
          <select className="bg-dark border border-gray-border rounded px-4 py-2.5 text-gray-text focus:outline-none focus:border-accent transition">
            <option>All Status</option>
            <option>Active</option>
            <option>Completed</option>
            <option>On Hold</option>
          </select>
        </div>
      </div>

      {/* Clients Table - Desktop */}
      <div className="bg-dark-light border border-gray-border rounded-lg overflow-hidden hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-border">
                <th className="text-left p-4 text-gray-text font-medium text-sm">Client Name</th>
                <th className="text-left p-4 text-gray-text font-medium text-sm">Type</th>
                <th className="text-left p-4 text-gray-text font-medium text-sm">Projects</th>
                <th className="text-left p-4 text-gray-text font-medium text-sm">City</th>
                <th className="text-left p-4 text-gray-text font-medium text-sm">Total Value</th>
                <th className="text-left p-4 text-gray-text font-medium text-sm">Manager</th>
                <th className="text-left p-4 text-gray-text font-medium text-sm">Status</th>
                <th className="text-left p-4 text-gray-text font-medium text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="p-8 text-center text-gray-text">
                    Loading clients...
                  </td>
                </tr>
              ) : filteredClients.length === 0 ? (
                <tr>
                  <td colSpan="8" className="p-8 text-center text-gray-text">
                    No clients found
                  </td>
                </tr>
              ) : filteredClients.map((client) => (
                <tr
                  key={client.id}
                  className="border-b border-gray-border hover:bg-dark transition cursor-pointer"
                >
                  <td className="p-4">
                    <div className="text-white font-medium">{client.name}</div>
                    <div className="text-gray-text text-sm flex items-center gap-1">
                      <span>✉</span> {client.email}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`border ${client.type === 'Residential' ? 'border-blue-500 text-blue-400' : 'border-yellow-500 text-yellow-400'} px-3 py-1 rounded text-xs font-medium inline-block`}>
                      {client.type}
                    </span>
                  </td>
                  <td className="p-4 text-gray-text text-center">{client.projects}</td>
                  <td className="p-4 text-gray-text">
                    <span className="flex items-center gap-1">
                      <span>📍</span> {client.city}
                    </span>
                  </td>
                  <td className="p-4 text-accent font-semibold">{client.totalValue}</td>
                  <td className="p-4 text-gray-text">{client.manager}</td>
                  <td className="p-4">
                    <span className={`border ${statusColors[client.statusColor]} px-3 py-1 rounded text-xs font-medium inline-block`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('Upload project for client:', client.id);
                      }}
                      className="bg-accent text-dark px-4 py-1.5 rounded text-sm font-medium hover:bg-yellow-500 transition flex items-center gap-1"
                    >
                      <span>📁</span> Upload Project
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {loading ? (
          <div className="text-center text-gray-text p-8">Loading clients...</div>
        ) : filteredClients.length === 0 ? (
          <div className="text-center text-gray-text p-8">No clients found</div>
        ) : filteredClients.map((client) => (
          <div
            key={client.id}
            className="bg-dark-light border border-gray-border rounded-lg p-4 cursor-pointer hover:border-accent transition"
          >
            <div className="mb-3">
              <h3 className="text-white font-medium text-base mb-1">{client.name}</h3>
              <div className="text-gray-text text-sm flex items-center gap-1">
                <span>✉</span> {client.email}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <div className="text-gray-text text-xs mb-0.5">Type</div>
                <span className={`border ${client.type === 'Residential' ? 'border-blue-500 text-blue-400' : 'border-yellow-500 text-yellow-400'} px-2 py-0.5 rounded text-xs font-medium inline-block`}>
                  {client.type}
                </span>
              </div>
              <div>
                <div className="text-gray-text text-xs mb-0.5">Projects</div>
                <div className="text-white text-sm">{client.projects}</div>
              </div>
              <div>
                <div className="text-gray-text text-xs mb-0.5">City</div>
                <div className="text-white text-sm flex items-center gap-1">
                  <span>📍</span> {client.city}
                </div>
              </div>
              <div>
                <div className="text-gray-text text-xs mb-0.5">Total Value</div>
                <div className="text-accent text-sm font-semibold">{client.totalValue}</div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-gray-border">
              <div>
                <div className="text-gray-text text-xs mb-0.5">Manager</div>
                <div className="text-white text-sm">{client.manager}</div>
              </div>
              <span className={`border ${statusColors[client.statusColor]} px-3 py-1 rounded text-xs font-medium`}>
                {client.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Client Modal */}
      <AddClientModal 
        isOpen={isAddClientModalOpen}
        onClose={() => setIsAddClientModalOpen(false)}
        onAddClient={handleAddClient}
      />
    </main>
  );
}
