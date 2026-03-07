import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddClientModal from "../components/AddClientModal";
import apiService from "../services/api";

// Your Google Drive folder URL - Replace with your actual Google Drive link
const GOOGLE_DRIVE_UPLOAD_URL = "https://drive.google.com/drive/folders/1cJY7527w-k3gddTiBVDwJW02I_5m__W3";

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
  
  // Filter states
  const [filterPropertyType, setFilterPropertyType] = useState("");
  const [filterCity, setFilterCity] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const response = await apiService.getConvertedClients();
      console.log('Get Converted Clients Response:', response);
      
      if (response.success && response.data) {
        // Get converted clients from the response - handle both structures
        const clientsData = response.data.items || response.data.convertedClients || response.data || [];
        
        console.log('Clients Data:', clientsData);
        
        // Transform API data to match UI format
        const transformedClients = clientsData.map(client => {
          // Log first client to see all available fields
          if (clientsData.indexOf(client) === 0) {
            console.log('First client structure:', client);
            console.log('Available ID fields:', {
              id: client.id,
              clientId: client.clientId,
              client_id: client.client_id,
              convertedClientId: client.convertedClientId,
              converted_client_id: client.converted_client_id
            });
          }
          
          return {
            // Use clientId or client_id if available, otherwise fall back to id
            id: client.clientId || client.client_id || client.convertedClientId || client.converted_client_id || client.id,
            leadId: client.id, // Keep original lead ID for reference
            name: client.name,
            email: client.email,
            phone: client.phone,
            type: client.property_type || client.propertyType || client.type || "—",
            projects: client.projects || 0,
            city: client.address || client.city || "—",
            totalValue: client.totalValue || client.budgetRange || "—",
            manager: client.assigned_to || client.manager || "Unassigned",
            status: client.status || "Active",
            statusColor: getStatusColor(client.status),
            createdAt: client.createdAt,
            address: client.address || client.city,
            source: client.source
          };
        });
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

  const handleUploadClick = (clientId) => {
    console.log('Upload project for client:', clientId);
    window.open(GOOGLE_DRIVE_UPLOAD_URL, '_blank');
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

  const handleDeleteClient = async (clientId, clientName) => {
    // Confirm deletion
    if (!window.confirm(`Are you sure you want to delete client "${clientName}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const response = await apiService.deleteClient(clientId);
      console.log('Delete Client Response:', response);

      if (response.success || response.status === 200 || response.status === 204) {
        alert('Client deleted successfully!');
        // Refresh clients list
        await fetchClients();
      } else {
        alert(`Failed to delete client: ${response.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Delete client error:', error);
      alert(`Error deleting client: ${error.message}`);
    }
  };

  // Apply all filters
  const filteredClients = clients.filter(client => {
    // Client name/email search
    const matchesSearch = searchTerm === "" || 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Property type filter
    const matchesPropertyType = filterPropertyType === "" || 
      client.type === filterPropertyType;
    
    // City filter
    const matchesCity = filterCity === "" || 
      client.city === filterCity;
    
    // Status filter
    const matchesStatus = filterStatus === "" || 
      client.status === filterStatus;
    
    return matchesSearch && matchesPropertyType && matchesCity && matchesStatus;
  });
  
  // Get unique values for filter dropdowns
  const uniquePropertyTypes = [...new Set(clients.map(c => c.type))].filter(Boolean);
  const uniqueCities = [...new Set(clients.map(c => c.city))].filter(Boolean).sort();
  const uniqueStatuses = [...new Set(clients.map(c => c.status))].filter(Boolean);
  
  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setFilterPropertyType("");
    setFilterCity("");
    setFilterStatus("");
  };
  
  // Check if any filters are active
  const hasActiveFilters = searchTerm || filterPropertyType || filterCity || filterStatus;

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Client Name Search */}
          <div className="lg:col-span-2">
            <label className="block text-xs text-gray-text mb-1.5">Client Name</label>
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-dark border border-gray-border rounded px-4 py-2.5 text-white placeholder-gray-text focus:outline-none focus:border-accent transition text-sm"
            />
          </div>
          
          {/* Property Type Filter */}
          <div>
            <label className="block text-xs text-gray-text mb-1.5">Property Type</label>
            <select 
              value={filterPropertyType}
              onChange={(e) => setFilterPropertyType(e.target.value)}
              className="w-full bg-dark border border-gray-border rounded px-4 py-2.5 text-white focus:outline-none focus:border-accent transition text-sm"
            >
              <option value="">All Types</option>
              {uniquePropertyTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          {/* City Filter */}
          <div>
            <label className="block text-xs text-gray-text mb-1.5">City</label>
            <select 
              value={filterCity}
              onChange={(e) => setFilterCity(e.target.value)}
              className="w-full bg-dark border border-gray-border rounded px-4 py-2.5 text-white focus:outline-none focus:border-accent transition text-sm"
            >
              <option value="">All Cities</option>
              {uniqueCities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
          
          {/* Status Filter */}
          <div>
            <label className="block text-xs text-gray-text mb-1.5">Status</label>
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full bg-dark border border-gray-border rounded px-4 py-2.5 text-white focus:outline-none focus:border-accent transition text-sm"
            >
              <option value="">All Status</option>
              {uniqueStatuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-gray-text">
              Showing {filteredClients.length} of {totalClients} clients
            </span>
            <button
              onClick={clearFilters}
              className="text-accent hover:text-yellow-500 text-sm font-medium transition"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Clients Table - Desktop */}
      <div className="bg-dark-light border border-gray-border rounded-lg overflow-hidden hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-border">
                <th className="text-left p-4 text-gray-text font-medium text-sm">Client Name</th>
                <th className="text-left p-4 text-gray-text font-medium text-sm">Property Type</th>
                <th className="text-left p-4 text-gray-text font-medium text-sm">City</th>
                <th className="text-left p-4 text-gray-text font-medium text-sm">Manager</th>
                <th className="text-left p-4 text-gray-text font-medium text-sm">Status</th>
                <th className="text-left p-4 text-gray-text font-medium text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-text">
                    Loading clients...
                  </td>
                </tr>
              ) : filteredClients.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-text">
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
                  <td className="p-4 text-gray-text">
                    <span className="flex items-center gap-1">
                      <span>📍</span> {client.city}
                    </span>
                  </td>
                  <td className="p-4 text-gray-text">{client.manager}</td>
                  <td className="p-4">
                    <span className={`border ${statusColors[client.statusColor]} px-3 py-1 rounded text-xs font-medium inline-block`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUploadClick(client.id);
                        }}
                        className="bg-accent text-dark px-4 py-1.5 rounded text-sm font-medium hover:bg-yellow-500 transition flex items-center gap-1"
                      >
                        <span>📁</span> Upload Project
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteClient(client.id, client.name);
                        }}
                        className="px-3 py-1.5 bg-red-900/20 border border-red-500/30 rounded text-red-400 hover:bg-red-900/40 transition text-sm font-medium"
                        title="Delete client"
                      >
                        🗑️
                      </button>
                    </div>
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
                <div className="text-gray-text text-xs mb-0.5">Property Type</div>
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
            <div className="pt-3 mt-3 border-t border-gray-border space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-gray-text text-xs mb-0.5">Manager</div>
                  <div className="text-white text-sm">{client.manager}</div>
                </div>
                <span className={`border ${statusColors[client.statusColor]} px-3 py-1 rounded text-xs font-medium`}>
                  {client.status}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUploadClick(client.id);
                  }}
                  className="flex-1 bg-accent text-dark px-4 py-2 rounded text-sm font-medium hover:bg-yellow-500 transition flex items-center justify-center gap-1"
                >
                  <span>📁</span> Upload Project
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteClient(client.id, client.name);
                  }}
                  className="px-4 py-2 bg-red-900/20 border border-red-500/30 rounded text-red-400 hover:bg-red-900/40 transition text-sm"
                  title="Delete client"
                >
                  🗑️
                </button>
              </div>
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
