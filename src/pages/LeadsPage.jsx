import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../services/api";
import AddLeadModal from "../components/AddLeadModal";
import { logActivity } from "../utils/activityLog";

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
  const [noteModal, setNoteModal] = useState({ open: false, lead: null, newNote: "", saving: false, notes: [], loadingNotes: false });

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
          budget: lead.budgetRange,
          property: lead.propertyType,
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
      'lost': 'red',
      'discard': 'red'
    };
    return colorMap[status?.toLowerCase()] || 'blue';
  };

  const handleAddLead = async (formData) => {
    try {
      // Transform snake_case to camelCase for backend
      const apiData = {
        ...formData,
        budgetRange: formData.budget_range,
        propertyType: formData.property_type
      };
      // Remove snake_case fields
      delete apiData.budget_range;
      delete apiData.property_type;

      const response = await apiService.createLead(apiData);
      console.log('Create Lead Response:', response);
      
      if (response.success || response.status === 200 || response.status === 201) {
        logActivity("New Lead Added", `${formData.name || "Lead"} added from ${formData.source || "unknown source"}`, "★");
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

  const handleStatusChange = async (e, lead) => {
    const newStatus = e.target.value;
    
    // If no change, return
    if (newStatus === lead.stage?.toLowerCase() || newStatus === '') {
      return;
    }

    try {
      // If converting to client, handle conversion
      if (newStatus === 'converted') {
        if (!window.confirm(`Convert "${lead.name}" to a client?`)) {
          e.target.value = lead.stage?.toLowerCase() || 'new';
          return;
        }

        const clientData = {
          name: lead.name,
          email: lead.email,
          phone: lead.phone,
          address: lead.city,
          propertyType: lead.property,
          budgetRange: lead.budget,
          source: lead.source,
          notes: lead.notes
        };

        const response = await apiService.convertLeadToClient(lead.id, clientData);
        console.log('Convert Lead Response:', response);

        if (response.success || response.status === 200 || response.status === 201) {
          alert('Lead successfully converted to client!');
          logActivity("Lead Converted", `${lead.name} has been converted to a client`, "✓");
          await fetchLeads();
        } else {
          alert(`Failed to convert lead: ${response.message || 'Unknown error'}`);
          e.target.value = lead.stage?.toLowerCase() || 'new';
        }
        return;
      }

      // For other status changes, update the lead via API
      const updateData = {
        status: newStatus
      };

      const response = await apiService.updateLead(lead.id, updateData);
      console.log('Update Lead Status Response:', response);

      if (response.success || response.status === 200) {
        const label = newStatus.charAt(0).toUpperCase() + newStatus.slice(1);
        logActivity("Lead Status Updated", `${lead.name} status changed to ${label}`, "⟳");
        // Update local state immediately for better UX
        setLeads(prevLeads => 
          prevLeads.map(l => 
            l.id === lead.id 
              ? {
                  ...l,
                  stage: newStatus.charAt(0).toUpperCase() + newStatus.slice(1),
                  stageColor: getStageColor(newStatus)
                }
              : l
          )
        );
        
        // Optional: Show success message
        console.log('Lead status updated successfully');
      } else {
        alert(`Failed to update status: ${response.message || 'Unknown error'}`);
        e.target.value = lead.stage?.toLowerCase() || 'new';
      }
      
    } catch (error) {
      console.error('Update status error:', error);
      alert(`Error updating status: ${error.message}`);
      e.target.value = lead.stage?.toLowerCase() || 'new';
    }
  };

  const handleConvertLead = async (e, lead) => {
    e.stopPropagation();
    
    // Confirm conversion
    if (!window.confirm(`Convert "${lead.name}" to a client?`)) {
      return;
    }

    try {
      // Prepare client data from lead
      const clientData = {
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        address: lead.city,
        propertyType: lead.property,
        budgetRange: lead.budget,
        source: lead.source,
        notes: lead.notes
      };

      const response = await apiService.convertLeadToClient(lead.id, clientData);
      console.log('Convert Lead Response:', response);

      if (response.success || response.status === 200 || response.status === 201) {
        // Show success message and navigate to clients page
        const goToClients = window.confirm('Lead successfully converted to client! Would you like to view it in the Clients page?');
        
        if (goToClients) {
          navigate('/clients');
        } else {
          // Refresh leads list to remove converted lead
          await fetchLeads();
        }
      } else {
        alert(`Failed to convert lead: ${response.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Convert lead error:', error);
      alert(`Error converting lead: ${error.message}`);
    }
  };

  // Parse notes stored as JSON array or fall back to legacy plain string
  const parseNotes = (raw) => {
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [{ text: raw, timestamp: null }];
    } catch {
      return [{ text: raw, timestamp: null }];
    }
  };

  const handleOpenNote = (e, lead) => {
    e.stopPropagation();
    setNoteModal({ open: true, lead, newNote: "", saving: false, notes: [], loadingNotes: false });
  };

  const handleSaveNote = async () => {
    if (!noteModal.newNote.trim()) return;
    setNoteModal(prev => ({ ...prev, saving: true }));
    try {
      const response = await apiService.addLeadNote(noteModal.lead.id, noteModal.newNote.trim());
      if (response.success || response.status === 200 || response.status === 201) {
        const newEntry = { note: noteModal.newNote.trim(), createdAt: new Date().toISOString() };
        logActivity("Note Added", `Note added for lead ${noteModal.lead?.name}`, "📝");
        setNoteModal(prev => ({
          ...prev,
          notes: [newEntry, ...prev.notes],
          newNote: "",
          saving: false,
        }));
      } else {
        alert(`Failed to save note: ${response.message || 'Unknown error'}`);
        setNoteModal(prev => ({ ...prev, saving: false }));
      }
    } catch (error) {
      console.error('Save note error:', error);
      alert(`Error saving note: ${error.message}`);
      setNoteModal(prev => ({ ...prev, saving: false }));
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

      {/* Filters */}
      <div className="bg-black border border-gray-border rounded-lg p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black border border-gray-border rounded px-4 py-2.5 text-white placeholder-gray-text focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition"
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
                <th className="text-left p-4 text-gray-text font-medium text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-text">
                    Loading leads...
                  </td>
                </tr>
              ) : filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-text">
                    No leads found
                  </td>
                </tr>
              ) : filteredLeads.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-b border-gray-border hover:bg-dark transition"
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
                    <div className="flex items-center gap-2">
                      <select
                        value={lead.stage?.toLowerCase() || 'new'}
                        onChange={(e) => handleStatusChange(e, lead)}
                        onClick={(e) => e.stopPropagation()}
                        disabled={lead.stage?.toLowerCase() === 'converted'}
                        className={`bg-dark border border-gray-border text-white px-3 py-2 rounded text-sm focus:outline-none transition ${
                          lead.stage?.toLowerCase() === 'converted' 
                            ? 'opacity-50 cursor-not-allowed' 
                            : 'cursor-pointer hover:border-accent focus:border-accent'
                        }`}
                      >
                        <option value="contacted">Contacted</option>
                        <option value="converted">Converted</option>
                        
                      </select>
                      <button
                        onClick={(e) => handleOpenNote(e, lead)}
                        className="px-3 py-2 bg-blue-900/20 border border-blue-500/30 rounded text-blue-400 hover:bg-blue-900/40 transition text-sm font-medium"
                        title="Add / view notes"
                      >
                        📝
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
            className="bg-dark-light border border-gray-border rounded-lg p-4 hover:border-accent transition"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-white font-medium text-base mb-1">{lead.name}</h3>
                <div className="text-gray-text text-sm flex items-center gap-1">
                  <span>📞</span> {lead.phone}
                </div>
              </div>
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
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-border">
              <div className="flex items-center gap-2">
                <select
                  value={lead.stage?.toLowerCase() || 'new'}
                  onChange={(e) => handleStatusChange(e, lead)}
                  onClick={(e) => e.stopPropagation()}
                  disabled={lead.stage?.toLowerCase() === 'converted'}
                  className={`bg-dark border border-gray-border text-white px-3 py-1.5 rounded text-sm focus:outline-none transition ${
                    lead.stage?.toLowerCase() === 'converted'
                      ? 'opacity-50 cursor-not-allowed'
                      : 'focus:border-accent'
                  }`}
                >
                  <option value="">Change Status...</option>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="converted">Converted</option>
                  <option value="lost">Discard</option>
                </select>
                <button
                  onClick={(e) => handleOpenNote(e, lead)}
                  className="px-3 py-1.5 bg-blue-900/20 border border-blue-500/30 rounded text-blue-400 hover:bg-blue-900/40 transition text-sm"
                  title="Add / view notes"
                >
                  📝
                </button>
              </div>
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

      {/* Notes Popup Modal */}
      {noteModal.open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
          onClick={() => setNoteModal(prev => ({ ...prev, open: false }))}
        >
          <div
            className="bg-dark-light border border-gray-border rounded-xl w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-border">
              <div>
                <h2 className="text-white font-bold text-lg">📝 Contact Notes</h2>
                <p className="text-gray-text text-sm mt-0.5">{noteModal.lead?.name}</p>
              </div>
              <button
                onClick={() => setNoteModal(prev => ({ ...prev, open: false }))}
                className="text-gray-text hover:text-white text-xl leading-none transition"
              >
                ✕
              </button>
            </div>

            {/* New note entry */}
            <div className="px-6 pt-5 pb-4 border-b border-gray-border">
              <label className="block text-sm font-medium text-gray-text mb-2">New Note</label>
              <textarea
                rows={3}
                value={noteModal.newNote}
                onChange={(e) => setNoteModal(prev => ({ ...prev, newNote: e.target.value }))}
                placeholder="What did you discuss with this lead?"
                className="w-full bg-dark border border-gray-border rounded px-3 py-2 text-white placeholder-gray-text focus:outline-none focus:border-accent transition text-sm resize-none"
              />
              <button
                onClick={handleSaveNote}
                disabled={!noteModal.newNote.trim() || noteModal.saving}
                className="mt-3 w-full bg-accent hover:bg-yellow-500 disabled:opacity-40 disabled:cursor-not-allowed text-dark font-semibold px-4 py-2 rounded transition text-sm"
              >
                {noteModal.saving ? 'Saving…' : 'Save Note'}
              </button>
            </div>

            {/* Previous notes */}
            <div className="px-6 py-4 overflow-y-auto flex-1">
              <h3 className="text-gray-text text-xs font-semibold uppercase tracking-wider mb-3">History</h3>
              {noteModal.loadingNotes ? (
                <p className="text-gray-text text-sm text-center py-6">Loading notes…</p>
              ) : noteModal.notes.length === 0 ? (
                <p className="text-gray-text text-sm text-center py-6">No notes yet. Add the first one above.</p>
              ) : (
                <div className="space-y-3">
                  {noteModal.notes.map((entry, i) => (
                    <div key={entry.id ?? i} className="bg-dark border border-gray-border rounded-lg px-4 py-3">
                      {(entry.createdAt || entry.timestamp) && (
                        <p className="text-gray-text text-xs mb-1">
                          {new Date(entry.createdAt || entry.timestamp).toLocaleString('en-IN', {
                            day: '2-digit', month: 'short', year: 'numeric',
                            hour: '2-digit', minute: '2-digit',
                          })}
                        </p>
                      )}
                      <p className="text-white text-sm whitespace-pre-wrap">{entry.note ?? entry.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
