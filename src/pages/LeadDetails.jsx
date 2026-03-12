import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import LeadSummaryCard from "../components/LeadSummaryCard";
import ActivityTimeline from "../components/ActivityTimeline";
import apiService from "../services/api";

export default function LeadDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [lead, setLead] = useState({
    id: id,
    name: "",
    phone: "",
    source: "",
    budget: "",
    property: "",
    city: "",
    followUp: "",
    stage: "",
    createdOn: "",
    email: "",
    address: ""
  });

  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    stage: "",
    followUp: "",
    email: "",
    address: "",
  });
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [savingNote, setSavingNote] = useState(false);

  useEffect(() => {
    fetchLeadDetails();
    fetchNotes();
  }, [id]);

  const extractNotes = (response) => {
    if (!response) return [];
    if (Array.isArray(response)) return response;
    if (Array.isArray(response.data)) return response.data;
    if (response.data && Array.isArray(response.data.notes)) return response.data.notes;
    if (response.data && Array.isArray(response.data.items)) return response.data.items;
    if (Array.isArray(response.notes)) return response.notes;
    if (Array.isArray(response.items)) return response.items;
    return [];
  };

  const fetchNotes = async () => {
    try {
      const response = await apiService.getLeadNotes(id);
      console.log('[Notes API response]', response);
      setNotes(extractNotes(response));
    } catch (error) {
      console.error('Failed to fetch notes:', error);
    }
  };

  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    try {
      setSavingNote(true);
      await apiService.addLeadNote(id, newNote.trim());
      setNewNote("");
      await fetchNotes();
    } catch (error) {
      console.error('Failed to save note:', error);
      alert(`Error saving note: ${error.message}`);
    } finally {
      setSavingNote(false);
    }
  };

  const fetchLeadDetails = async () => {
    try {
      setLoading(true);
      const response = await apiService.getLeads();
      
      if (response.success && response.data) {
        const leadsData = response.data.items || response.data || [];
        const currentLead = leadsData.find(l => l.id.toString() === id.toString());
        
        if (currentLead) {
          setLead({
            id: currentLead.id,
            name: currentLead.name,
            phone: currentLead.phone,
            email: currentLead.email,
            source: currentLead.source?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || currentLead.source,
            budget: currentLead.budgetRange,
            property: currentLead.propertyType,
            city: currentLead.city,
            stage: currentLead.status?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'New',
            notes: currentLead.notes,
            createdOn: currentLead.createdAt,
            address: currentLead.address
          });
          
          setFormData({
            stage: currentLead.status?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'New',
            followUp: currentLead.followUp || "",
            email: currentLead.email || "",
            address: currentLead.address || "",
          });
        }
      }
    } catch (error) {
      console.error('Failed to fetch lead details:', error);
    } finally {
      setLoading(false);
    }
  };

  const breadcrumbItems = [
    { label: "Dashboard", link: "/" },
    { label: "Leads", link: "/leads" },
    { label: "Lead Details" }
  ];

  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    try {
      setSaving(true);
      await apiService.updateLead(id, {
        status: formData.stage,
        followUp: formData.followUp,
        email: formData.email,
        address: formData.address,
      });
      setLead(prev => ({
        ...prev,
        stage: formData.stage,
        followUp: formData.followUp,
        email: formData.email,
        address: formData.address,
      }));
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save lead:', error);
      alert(`Error saving changes: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleConvert = async () => {
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
        city: lead.city,
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
          navigate('/leads');
        }
      } else {
        alert(`Failed to convert lead: ${response.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Convert lead error:', error);
      alert(`Error converting lead: ${error.message}`);
    }
  };

  const handleScheduleFollowup = () => {
    // Handle scheduling follow-up
    alert("Opening follow-up scheduler...");
  };

  return (
    <main className="flex-1 p-4 md:p-6 lg:p-10 bg-dark min-h-screen">
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Header with Actions */}
      <div className="flex flex-col gap-3 mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-white">Lead Details</h1>
          <p className="text-gray-text mt-1 text-sm">View and manage lead information</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => navigate('/leads')}
            className="border border-gray-border text-gray-text px-3 md:px-4 py-2 rounded hover:border-accent hover:text-accent transition text-xs md:text-sm font-medium"
          >
            ← Back to Leads
          </button>
          <button
            onClick={handleScheduleFollowup}
            className="border border-accent text-accent px-3 md:px-4 py-2 rounded hover:bg-accent hover:text-dark transition text-xs md:text-sm font-medium"
          >
            📅 Schedule Follow-up
          </button>
          <button
            onClick={handleConvert}
            className="bg-accent text-dark px-3 md:px-4 py-2 rounded hover:bg-yellow-500 transition text-xs md:text-sm font-medium"
          >
            ✓ Convert Lead
          </button>
        </div>
      </div>

      {/* Lead Summary Card */}
      <div className="mb-6">
        <LeadSummaryCard lead={lead} />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Left Column - Editable Fields */}
        <div className="lg:col-span-2 space-y-6">
          {/* Edit Lead Information */}
          <div className="bg-dark-light border border-gray-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">Lead Management</h3>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-accent hover:text-yellow-500 text-sm font-medium flex items-center gap-1"
                >
                  ✏️ Edit
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="border border-gray-border text-gray-text px-3 py-1 rounded text-sm hover:border-accent hover:text-accent transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-accent text-dark px-3 py-1 rounded text-sm hover:bg-yellow-500 transition disabled:opacity-60"
                  >
                    {saving ? "Saving..." : "Save"}
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {/* Stage */}
              <div>
                <label className="block text-gray-text text-sm mb-2">Stage</label>
                {isEditing ? (
                  <select
                    value={formData.stage}
                    onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                    className="w-full bg-dark border border-gray-border rounded px-4 py-2.5 text-white focus:outline-none focus:border-accent transition"
                  >
                    <option>New</option>
                    <option>Discussion</option>
                    <option>Site Visit</option>
                    <option>Quote Shared</option>
                    <option>Negotiation</option>
                    <option>Converted</option>
                    <option>Dropped</option>
                  </select>
                ) : (
                  <div className="text-white font-medium">{formData.stage}</div>
                )}
              </div>

              {/* Follow-up Date */}
              <div>
                <label className="block text-gray-text text-sm mb-2">Follow-up Date</label>
                {isEditing ? (
                  <input
                    type="date"
                    value={formData.followUp}
                    onChange={(e) => setFormData({ ...formData, followUp: e.target.value })}
                    className="w-full bg-dark border border-gray-border rounded px-4 py-2.5 text-white focus:outline-none focus:border-accent transition"
                  />
                ) : (
                  <div className="text-white font-medium">{formData.followUp}</div>
                )}
              </div>

              {/* Contact Details */}
              <div>
                <label className="block text-gray-text text-sm mb-2">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-dark border border-gray-border rounded px-4 py-2.5 text-white focus:outline-none focus:border-accent transition"
                  />
                ) : (
                  <div className="text-white font-medium">{formData.email}</div>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="block text-gray-text text-sm mb-2">Address</label>
                {isEditing ? (
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    rows="2"
                    className="w-full bg-dark border border-gray-border rounded px-4 py-2.5 text-white focus:outline-none focus:border-accent transition resize-none"
                  ></textarea>
                ) : (
                  <div className="text-white font-medium">{formData.address}</div>
                )}
              </div>

              {/* Notes Section */}
              <div>
                <label className="block text-gray-text text-sm mb-3">Notes</label>
                {/* Add new note */}
                <div className="flex flex-col gap-2 mb-4">
                  <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add a note about this lead..."
                    rows="3"
                    className="w-full bg-dark border border-gray-border rounded px-4 py-2.5 text-white placeholder-gray-text focus:outline-none focus:border-accent transition resize-none"
                  />
                  <button
                    onClick={handleAddNote}
                    disabled={savingNote || !newNote.trim()}
                    className="self-end bg-accent text-dark px-4 py-1.5 rounded text-sm font-medium hover:bg-yellow-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {savingNote ? "Saving..." : "Save Note"}
                  </button>
                </div>
                {/* Notes history */}
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {notes.length === 0 ? (
                    <p className="text-gray-text text-sm">No notes added yet.</p>
                  ) : (
                    notes.map((n, idx) => (
                      <div key={n.id || idx} className="bg-dark border border-gray-border rounded px-4 py-3">
                        <p className="text-white text-sm whitespace-pre-wrap">{n.note || n.content || n.text || ""}</p>
                        {(n.createdAt || n.created_at) && (
                          <p className="text-gray-text text-xs mt-1">
                            {new Date(n.createdAt || n.created_at).toLocaleString()}
                            {(n.createdBy || n.author) && ` · ${n.createdBy || n.author}`}
                          </p>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Activity Timeline */}
          <ActivityTimeline activities={[]} />
        </div>

        {/* Right Column - Quick Actions & Stats */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-dark-light border border-gray-border rounded-lg p-6">
            <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-dark border border-gray-border rounded px-4 py-3 text-left hover:border-accent transition flex items-center gap-3">
                <span className="text-xl">📞</span>
                <div className="flex-1">
                  <div className="text-white text-sm font-medium">Make a Call</div>
                  <div className="text-gray-text text-xs">Connect instantly</div>
                </div>
              </button>
              <button className="w-full bg-dark border border-gray-border rounded px-4 py-3 text-left hover:border-accent transition flex items-center gap-3">
                <span className="text-xl">📧</span>
                <div className="flex-1">
                  <div className="text-white text-sm font-medium">Send Email</div>
                  <div className="text-gray-text text-xs">Compose message</div>
                </div>
              </button>
              <button className="w-full bg-dark border border-gray-border rounded px-4 py-3 text-left hover:border-accent transition flex items-center gap-3">
                <span className="text-xl">💬</span>
                <div className="flex-1">
                  <div className="text-white text-sm font-medium">Send WhatsApp</div>
                  <div className="text-gray-text text-xs">Quick message</div>
                </div>
              </button>
              <button className="w-full bg-dark border border-gray-border rounded px-4 py-3 text-left hover:border-accent transition flex items-center gap-3">
                <span className="text-xl">📄</span>
                <div className="flex-1">
                  <div className="text-white text-sm font-medium">Generate Quote</div>
                  <div className="text-gray-text text-xs">Create proposal</div>
                </div>
              </button>
              <button className="w-full bg-dark border border-gray-border rounded px-4 py-3 text-left hover:border-accent transition flex items-center gap-3">
                <span className="text-xl">🏠</span>
                <div className="flex-1">
                  <div className="text-white text-sm font-medium">Schedule Site Visit</div>
                  <div className="text-gray-text text-xs">Book appointment</div>
                </div>
              </button>
            </div>
          </div>

          {/* Lead Stats */}
          <div className="bg-dark-light border border-gray-border rounded-lg p-6">
            <h3 className="text-lg font-bold text-white mb-4">Lead Statistics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-text text-sm">Total Interactions</span>
                <span className="text-white font-bold">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-text text-sm">Calls Made</span>
                <span className="text-white font-bold">5</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-text text-sm">Emails Sent</span>
                <span className="text-white font-bold">3</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-text text-sm">Meetings</span>
                <span className="text-white font-bold">2</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-text text-sm">Days in Pipeline</span>
                <span className="text-white font-bold">8 days</span>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-border">
                <span className="text-gray-text text-sm">Conversion Probability</span>
                <span className="text-accent font-bold">75%</span>
              </div>
            </div>
          </div>

          {/* Assigned To */}
          <div className="bg-dark-light border border-gray-border rounded-lg p-6">
            <h3 className="text-lg font-bold text-white mb-4">Assigned To</h3>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-dark font-bold text-lg">
                PS
              </div>
              <div>
                <div className="text-white font-medium">Arpita Singh</div>
                <div className="text-gray-text text-sm">Sales Manager</div>
              </div>
            </div>
            <button className="w-full mt-4 border border-gray-border text-gray-text px-4 py-2 rounded hover:border-accent hover:text-accent transition text-sm">
              Reassign Lead
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
