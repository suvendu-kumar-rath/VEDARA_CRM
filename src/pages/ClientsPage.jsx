import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddClientModal from "../components/AddClientModal";

const initialClientsData = [
  {
    id: 1,
    name: "Aditya & Priya Verma",
    email: "verma.family@email.com",
    type: "Residential",
    projects: 2,
    city: "Mumbai",
    totalValue: "₹45.0 L",
    manager: "Priya Mehta",
    status: "Active",
    statusColor: "green"
  },
  {
    id: 2,
    name: "TechCorp Solutions Pvt Ltd",
    email: "facilities@techcorp.com",
    type: "Commercial",
    projects: 1,
    city: "Bangalore",
    totalValue: "₹1.2 Cr",
    manager: "Vikram Singh",
    status: "Active",
    statusColor: "green"
  },
  {
    id: 3,
    name: "Rohit & Sneha Joshi",
    email: "joshi.couple@email.com",
    type: "Residential",
    projects: 1,
    city: "Delhi",
    totalValue: "₹28.0 L",
    manager: "Neha Gupta",
    status: "Completed",
    statusColor: "yellow"
  },
  {
    id: 4,
    name: "Dr. Suresh Menon",
    email: "dr.menon@email.com",
    type: "Residential",
    projects: 1,
    city: "Chennai",
    totalValue: "₹65.0 L",
    manager: "Priya Mehta",
    status: "Active",
    statusColor: "green"
  },
  {
    id: 5,
    name: "Café Mocha Chain",
    email: "design@cafemocha.in",
    type: "Commercial",
    projects: 3,
    city: "Multiple",
    totalValue: "₹85.0 L",
    manager: "Vikram Singh",
    status: "Active",
    statusColor: "green"
  },
  {
    id: 6,
    name: "Kiran & Lakshmi Rao",
    email: "rao.family@email.com",
    type: "Residential",
    projects: 1,
    city: "Hyderabad",
    totalValue: "₹32.0 L",
    manager: "Neha Gupta",
    status: "On Hold",
    statusColor: "orange"
  }
];

const statusColors = {
  green: "border-green-500 text-green-400",
  yellow: "border-yellow-500 text-yellow-400",
  orange: "border-orange-500 text-orange-400"
};

export default function ClientsPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [clients, setClients] = useState(initialClientsData);
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);

  const handleAddClient = (formData) => {
    const newClient = {
      id: clients.length + 1,
      name: formData.name,
      email: formData.email,
      type: formData.type,
      projects: 0,
      city: formData.city,
      totalValue: "₹0 L",
      manager: formData.manager,
      status: "Active",
      statusColor: "green"
    };
    
    setClients(prev => [newClient, ...prev]);
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalClients = clients.length;
  const activeClients = clients.filter(c => c.status === "Active").length;
  const completedProjects = 1;
  const totalRevenue = "₹3.8 Cr";

  return (
    <main className="flex-1 p-6 md:p-10 bg-dark">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Clients</h1>
          <p className="text-gray-text mt-1">Manage your customer relationships</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsAddClientModalOpen(true)}
            className="bg-dark border border-gray-border text-white px-4 py-2 rounded flex items-center gap-2 hover:border-accent hover:text-accent transition text-sm font-medium"
          >
            <span className="text-lg">+</span> Add Client
          </button>
          <button 
            className="bg-accent text-dark px-4 py-2 rounded flex items-center gap-2 hover:bg-yellow-500 transition text-sm font-medium"
          >
            <span className="text-lg">📁</span> Create Project
          </button>
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
              <div className="text-2xl font-bold text-white">{totalRevenue}</div>
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
              {filteredClients.map((client) => (
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
                    <div className="flex items-center gap-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('New project for client:', client.id);
                        }}
                        className="bg-accent text-dark px-4 py-1.5 rounded text-sm font-medium hover:bg-yellow-500 transition flex items-center gap-1"
                      >
                        <span>📁</span> New Project
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
        {filteredClients.map((client) => (
          <div
            key={client.id}
            className="bg-dark-light border border-gray-border rounded-lg p-4 cursor-pointer hover:border-accent transition"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-white font-medium text-base mb-1">{client.name}</h3>
                <div className="text-gray-text text-sm flex items-center gap-1">
                  <span>✉</span> {client.email}
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
