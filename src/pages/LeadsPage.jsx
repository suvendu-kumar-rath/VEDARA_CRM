import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddLeadModal from "../components/AddLeadModal";

const initialLeadsData = [
  {
    id: 1,
    name: "Rajesh Sharma",
    phone: "+91 98705 43210",
    source: "Instagram",
    budget: "₹25-35 Lakhs",
    property: "Apartment",
    city: "Mumbai",
    followUp: "20 Jan",
    stage: "Site Visit",
    stageColor: "yellow"
  },
  {
    id: 2,
    name: "Ananya Patel",
    phone: "+91 87654 32109",
    source: "Referral",
    budget: "₹40-50 Lakhs",
    property: "Villa",
    city: "Bangalore",
    followUp: "18 Jan",
    stage: "Quote Shared",
    stageColor: "green"
  },
  {
    id: 3,
    name: "Vikram Malhotra",
    phone: "+91 76543 21098",
    source: "Website",
    budget: "₹15-20 Lakhs",
    property: "Apartment",
    city: "Delhi",
    followUp: "22 Jan",
    stage: "New",
    stageColor: "blue"
  },
  {
    id: 4,
    name: "Meera Krishnan",
    phone: "+91 65432 10987",
    source: "Google Ads",
    budget: "₹60-80 Lakhs",
    property: "Penthouse",
    city: "Chennai",
    followUp: "19 Jan",
    stage: "Discussion",
    stageColor: "yellow"
  },
  {
    id: 5,
    name: "Arjun Reddy",
    phone: "+91 54321 09876",
    source: "Instagram",
    budget: "₹30-40 Lakhs",
    property: "Villa",
    city: "Hyderabad",
    followUp: "21 Jan",
    stage: "Site Visit",
    stageColor: "yellow"
  },
  {
    id: 6,
    name: "Kavitha Nair",
    phone: "+91 43210 98765",
    source: "Referral",
    budget: "₹20-25 Lakhs",
    property: "Apartment",
    city: "Kochi",
    followUp: "23 Jan",
    stage: "New",
    stageColor: "blue"
  },
  {
    id: 7,
    name: "Sanjay Kapoor",
    phone: "+91 32109 87654",
    source: "Walk-in",
    budget: "₹1-1.5 Crore",
    property: "Commercial",
    city: "Mumbai",
    followUp: "17 Jan",
    stage: "Quote Shared",
    stageColor: "green"
  },
  {
    id: 8,
    name: "Deepa Iyer",
    phone: "+91 21098 76543",
    source: "Website",
    budget: "₹35-45 Lakhs",
    property: "Bungalow",
    city: "Pune",
    followUp: "24 Jan",
    stage: "Discussion",
    stageColor: "yellow"
  }
];

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
  const [leads, setLeads] = useState(initialLeadsData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddLead = (formData) => {
    const newLead = {
      id: leads.length + 1,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      source: formData.source,
      budget: formData.budget,
      property: formData.property,
      city: formData.city,
      followUp: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
      stage: "New",
      stageColor: "blue"
    };
    
    setLeads(prev => [newLead, ...prev]);
  };

  const filteredLeads = leads.filter(lead =>
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.phone.includes(searchTerm) ||
    lead.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <div className="text-2xl font-bold text-white">8</div>
              <div className="text-sm text-gray-text">Total Leads</div>
            </div>
          </div>
        </div>
        <div className="bg-dark-light border border-gray-border rounded-lg p-5">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🔥</div>
            <div>
              <div className="text-2xl font-bold text-white">4</div>
              <div className="text-sm text-gray-text">Hot Leads</div>
            </div>
          </div>
        </div>
        <div className="bg-dark-light border border-gray-border rounded-lg p-5">
          <div className="flex items-center gap-3">
            <div className="text-2xl">✅</div>
            <div>
              <div className="text-2xl font-bold text-white">3</div>
              <div className="text-sm text-gray-text">Converted</div>
            </div>
          </div>
        </div>
        <div className="bg-dark-light border border-gray-border rounded-lg p-5">
          <div className="flex items-center gap-3">
            <div className="text-2xl">❌</div>
            <div>
              <div className="text-2xl font-bold text-white">1</div>
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
            <option>All Stages</option>
            <option>New</option>
            <option>Site Visit</option>
            <option>Discussion</option>
            <option>Quote Shared</option>
          </select>
          <select className="bg-dark border border-gray-border rounded px-4 py-2.5 text-gray-text focus:outline-none focus:border-accent transition">
            <option>All Sources</option>
            <option>Instagram</option>
            <option>Website</option>
            <option>Referral</option>
            <option>Google Ads</option>
            <option>Walk-in</option>
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
                <th className="text-left p-4 text-gray-text font-medium text-sm">Follow-up</th>
                <th className="text-left p-4 text-gray-text font-medium text-sm">Stage</th>
                <th className="text-left p-4 text-gray-text font-medium text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
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
                  <td className="p-4 text-gray-text">
                    <span className="flex items-center gap-1">
                      <span>📅</span> {lead.followUp}
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
        {filteredLeads.map((lead) => (
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
              <div className="flex items-center gap-1 text-gray-text text-sm">
                <span>📅</span> {lead.followUp}
              </div>
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
