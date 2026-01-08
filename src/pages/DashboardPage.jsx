import React, { useState } from "react";
import StatCards from "../components/StatCards";
import ProjectProgress from "../components/ProjectProgress";
import PaymentOverview from "../components/PaymentOverview";
import RecentActivity from "../components/RecentActivity";
import QuickStats from "../components/QuickStats";
import { useNavigate } from "react-router-dom";
import AddLeadModal from "../components/AddLeadModal";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddLead = (formData) => {
    // In a real app, this would save to backend or global state
    console.log("New lead added:", formData);
    // Navigate to leads page to see the new lead
    navigate('/leads');
  };

  return (
    <main className="flex-1 p-6 md:p-10 bg-dark">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
          <p className="text-gray-text mt-1">Welcome back, Arpita. Here's what's happening today.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="border border-accent text-accent px-4 py-2 rounded flex items-center gap-2 hover:bg-accent hover:text-dark transition text-sm font-medium"
          >
            <span className="text-lg">👤</span> Add Lead
          </button>
          <button className="bg-accent text-dark px-4 py-2 rounded flex items-center gap-2 hover:bg-yellow-500 transition text-sm font-medium">
            <span className="text-lg">📁</span> Create Project
          </button>
          <button className="border border-accent text-accent px-4 py-2 rounded flex items-center gap-2 hover:bg-accent hover:text-dark transition text-sm font-medium">
            <span className="text-lg">📄</span> Generate Quote
          </button>
          <button className="border border-accent text-accent px-4 py-2 rounded flex items-center gap-2 hover:bg-accent hover:text-dark transition text-sm font-medium">
            <span className="text-lg">⬆</span> Upload Design
          </button>
        </div>
      </div>
      <StatCards />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <ProjectProgress />
          <RecentActivity />
        </div>
        <div className="flex flex-col gap-6">
          <PaymentOverview />
          <QuickStats />
        </div>
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
