import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import LeadSummaryCard from "../components/LeadSummaryCard";
import ActivityTimeline from "../components/ActivityTimeline";

export default function LeadDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Default lead structure - should be fetched from API using the id
  const lead = {
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
  };

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    stage: lead.stage,
    followUp: lead.followUp,
    notes: ""
  });

  const breadcrumbItems = [
    { label: "Dashboard", link: "/" },
    { label: "Leads", link: "/leads" },
    { label: "Lead Details" }
  ];

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
    console.log("Saving lead data:", formData);
  };

  const handleConvert = () => {
    // Handle lead conversion
    alert("Converting lead to client...");
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
                    className="bg-accent text-dark px-3 py-1 rounded text-sm hover:bg-yellow-500 transition"
                  >
                    Save
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
                    defaultValue={lead.email}
                    className="w-full bg-dark border border-gray-border rounded px-4 py-2.5 text-white focus:outline-none focus:border-accent transition"
                  />
                ) : (
                  <div className="text-white font-medium">{lead.email}</div>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="block text-gray-text text-sm mb-2">Address</label>
                {isEditing ? (
                  <textarea
                    defaultValue={lead.address}
                    rows="2"
                    className="w-full bg-dark border border-gray-border rounded px-4 py-2.5 text-white focus:outline-none focus:border-accent transition resize-none"
                  ></textarea>
                ) : (
                  <div className="text-white font-medium">{lead.address}</div>
                )}
              </div>

              {/* Notes */}
              <div>
                <label className="block text-gray-text text-sm mb-2">Notes</label>
                {isEditing ? (
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Add notes about this lead..."
                    rows="4"
                    className="w-full bg-dark border border-gray-border rounded px-4 py-2.5 text-white placeholder-gray-text focus:outline-none focus:border-accent transition resize-none"
                  ></textarea>
                ) : (
                  <div className="text-gray-text text-sm">
                    {formData.notes || "No notes added yet"}
                  </div>
                )}
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
