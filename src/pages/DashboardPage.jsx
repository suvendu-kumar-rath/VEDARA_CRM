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
  // ...existing code...

  // ...existing code...

  return (
    <main className="flex-1 p-6 md:p-10 bg-dark">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
          <p className="text-gray-text mt-1">Welcome back, Arpita. Here's what's happening today.</p>
        </div>
        {/* Quick Actions removed */}
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

      {/* Add Lead and Quotation Modals removed */}
    </main>
  );
}
