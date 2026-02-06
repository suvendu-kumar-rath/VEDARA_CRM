import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../services/api";
import AddLeadModal from "../components/AddLeadModal";

// Stage color mapping for badges
const stageBorderColors = {
  yellow: "border-accent",
  green: "border-green-500",
  blue: "border-blue-500",
  red: "border-red-500"
};

export default function LeadsPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [leads, setLeads] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const response = await apiService.getLeads();
      console.log('Get Leads Response:', response);
      
      if (response.success && response.data) {
        // Handle data.items structure from API
        const leadsData = response.data.items || response.data || [];
        
        // Transform API data to match UI format
        const transformedLeads = leadsData.map(lead => ({
          id: lead.id,
          name: lead.name,
          phone: lead.phone,
          email: lead.email,
          source: lead.source?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || lead.source,
          budget: lead.budget_range || lead.budgetRange || lead.budget,
          property: lead.property_type || lead.propertyType || lead.property,
          city: lead.city,
          stage: lead.status?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'New',
          stageColor: getStageColor(lead.status),
          assignedTo: lead.assigned_to,
          notes: lead.notes,
          createdAt: lead.createdAt,
          updatedAt: lead.updatedAt
        }));
        
        setLeads(transformedLeads);
      }
    } catch (error) {
      console.error('Failed to fetch leads:', error);
      setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  const getStageColor = (status) => {
    const colorMap = {
      'new': 'blue',
      'contacted': 'yellow',
      'qualified': 'green',
      'proposal': 'yellow',
      'negotiation': 'yellow',
      'converted': 'green',
      'lost': 'red'
    };
    return colorMap[status?.toLowerCase()] || 'blue';
  };

  const handleAddLead = async (formData) => {
    try {
      const response = await apiService.createLead(formData);
      console.log('Create Lead Response:', response);
      
      if (response.success || response.status === 200 || response.status === 201) {
        // Refresh leads list
        try {
          await fetchLeads();
        } catch {
          // If fetch fails, add locally
          const newLead = {
            id: Date.now(),
            ...formData,
            budget: formData.budget_range,
            property: formData.property_type,
            stage: formData.status || 'new',
            stageColor: getStageColor(formData.status)
          };
          setLeads(prev => [newLead, ...prev]);
        }
        return { success: true };
      }
      return { success: false, error: response.message };
    } catch (error) {
      console.error('Create lead error:', error);
      return { success: false, error: error.message };
    }
  };

  const filteredLeads = leads.filter(lead =>
    lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.phone?.includes(searchTerm) ||
    lead.city?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: leads.length,
    hot: leads.filter(l => l.stageColor === 'green').length,
    converted: leads.filter(l => l.stage?.toLowerCase() === 'converted').length,
    dropped: leads.filter(l => l.stage?.toLowerCase() === 'lost').length
  };

  return (
    <main className="flex-1 p-6 md:p-10 bg-dark">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Leads</h1>
          <p className="text-gray-text mt-1">Manage incoming inquiries and follow-ups</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-accent text-dark px-4 py-2 rounded flex items-center gap-2 hover:bg-yellow-500 transition text-sm font-medium w-fit"
        >
          <span className="text-lg">+</span> Add Lead
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-dark-light border border-gray-border rounded-lg p-5">
          <div className="flex items-center gap-3">
            <div className="text-2xl">👥</div>
            <div>
              <div className="text-2xl font-bold text-white">{stats.total}</div>
              <div className="text-sm text-gray-text">Total Leads</div>
            </div>
          </div>
        </div>
        <div className="bg-dark-light border border-gray-border rounded-lg p-5">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🔥</div>
            <div>
              <div className="text-2xl font-bold text-white">{stats.hot}</div>
              <div className="text-sm text-gray-text">Hot Leads</div>
            </div>
          </div>
        </div>
        <div className="bg-dark-light border border-gray-border rounded-lg p-5">
          <div className="flex items-center gap-3">
            <div className="text-2xl">✅</div>
            <div>
              <div className="text-2xl font-bold text-white">{stats.converted}</div>
              <div className="text-sm text-gray-text">Converted</div>
            </div>
          </div>
        </div>
        <div className="bg-dark-light border border-gray-border rounded-lg p-5">
          <div className="flex items-center gap-3">
            <div className="text-2xl">❌</div>
            <div>
              <div className="text-2xl font-bold text-white">{stats.dropped}</div>
              <div className="text-sm text-gray-text">Dropped</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-dark-light border border-gray-border rounded-lg p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-dark border border-gray-border rounded px-4 py-2.5 text-white placeholder-gray-text focus:outline-none focus:border-accent transition"
            />
          </div>
          <select className="bg-dark border border-gray-border rounded px-4 py-2.5 text-gray-text focus:outline-none focus:border-accent transition">
            <option>All Statuses</option>
            <option>New</option>
            <option>Contacted</option>
            <option>Qualified</option>
            <option>Proposal</option>
            <option>Negotiation</option>
            <option>Converted</option>
            <option>Lost</option>
          </select>
          <select className="bg-dark border border-gray-border rounded px-4 py-2.5 text-gray-text focus:outline-none focus:border-accent transition">
            <option>All Sources</option>
            <option>Instagram</option>
            <option>Facebook</option>
            <option>Website</option>
            <option>Google Ads</option>
            <option>Referral</option>
            <option>Walk-in</option>
            <option>Email Campaign</option>
            <option>LinkedIn</option>
          </select>
          <button className="bg-dark border border-gray-border rounded px-4 py-2.5 text-gray-text hover:border-accent hover:text-accent transition flex items-center gap-2">
            <span>🔽</span> More Filters
          </button>
        </div>
      </div>

      {/* Table - Desktop */}
      <div className="bg-dark-light border border-gray-border rounded-lg overflow-hidden hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-border">
                <th className="text-left p-4 text-gray-text font-medium text-sm">Lead Name</th>
                <th className="text-left p-4 text-gray-text font-medium text-sm">Source</th>
                <th className="text-left p-4 text-gray-text font-medium text-sm">Budget</th>
                <th className="text-left p-4 text-gray-text font-medium text-sm">Property</th>
                <th className="text-left p-4 text-gray-text font-medium text-sm">City</th>
                <th className="text-left p-4 text-gray-text font-medium text-sm">Status</th>
                <th className="text-left p-4 text-gray-text font-medium text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-gray-text">
                    Loading leads...
                  </td>
                </tr>
              ) : filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-gray-text">
                    No leads found
                  </td>
                </tr>
              ) : filteredLeads.map((lead) => (
                <tr
                  key={lead.id}
                  onClick={() => navigate(`/leads/${lead.id}`)}
                  className="border-b border-gray-border hover:bg-dark transition cursor-pointer"
                >
                  <td className="p-4">
                    <div className="text-white font-medium">{lead.name}</div>
                    <div className="text-gray-text text-sm flex items-center gap-1">
                      <span>📞</span> {lead.phone}
                    </div>
                  </td>
                  <td className="p-4 text-gray-text">{lead.source}</td>
                  <td className="p-4 text-gray-text">{lead.budget}</td>
                  <td className="p-4 text-gray-text">{lead.property}</td>
                  <td className="p-4 text-gray-text">
                    <span className="flex items-center gap-1">
                      <span>📍</span> {lead.city}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`border ${stageBorderColors[lead.stageColor]} text-${lead.stageColor === 'yellow' ? 'accent' : lead.stageColor === 'green' ? 'green-400' : lead.stageColor === 'blue' ? 'blue-400' : 'red-400'} px-3 py-1 rounded text-xs font-medium inline-block`}>
                      {lead.stage}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/leads/${lead.id}`);
                        }}
                        className="bg-accent text-dark px-4 py-1.5 rounded text-sm font-medium hover:bg-yellow-500 transition flex items-center gap-1"
                      >
                        <span>➜</span> Convert
                      </button>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="text-gray-text hover:text-white transition"
                      >
                        <span className="text-lg">⋮</span>
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
          <div className="text-center text-gray-text p-8">Loading leads...</div>
        ) : filteredLeads.length === 0 ? (
          <div className="text-center text-gray-text p-8">No leads found</div>
        ) : filteredLeads.map((lead) => (
          <div
            key={lead.id}
            onClick={() => navigate(`/leads/${lead.id}`)}
            className="bg-dark-light border border-gray-border rounded-lg p-4 cursor-pointer hover:border-accent transition"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-white font-medium text-base mb-1">{lead.name}</h3>
                <div className="text-gray-text text-sm flex items-center gap-1">
                  <span>📞</span> {lead.phone}
                </div>
              </div>
              <button
                onClick={(e) => e.stopPropagation()}
                className="text-gray-text hover:text-white transition p-2"
              >
                <span className="text-lg">⋮</span>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <div className="text-gray-text text-xs mb-0.5">Source</div>
                <div className="text-white text-sm">{lead.source}</div>
              </div>
              <div>
                <div className="text-gray-text text-xs mb-0.5">Budget</div>
                <div className="text-white text-sm">{lead.budget}</div>
              </div>
              <div>
                <div className="text-gray-text text-xs mb-0.5">Property</div>
                <div className="text-white text-sm">{lead.property}</div>
              </div>
              <div>
                <div className="text-gray-text text-xs mb-0.5">City</div>
                <div className="text-white text-sm flex items-center gap-1">
                  <span>📍</span> {lead.city}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-gray-border">
              <span className={`border ${stageBorderColors[lead.stageColor]} text-${lead.stageColor === 'yellow' ? 'accent' : lead.stageColor === 'green' ? 'green-400' : lead.stageColor === 'blue' ? 'blue-400' : 'red-400'} px-3 py-1 rounded text-xs font-medium`}>
                {lead.stage}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Lead Modal */}
      <AddLeadModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddLead={handleAddLead}
      />
    </main>
  );
}
