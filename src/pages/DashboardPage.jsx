import React, { useState, useEffect } from "react";
import StatCards from "../components/StatCards";
import RecentActivity from "../components/RecentActivity";
import { useNavigate } from "react-router-dom";
import AddLeadModal from "../components/AddLeadModal";
import apiService from "../services/api";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [totals, setTotals] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loadingDash, setLoadingDash] = useState(true);

  useEffect(() => {
    apiService.getDashboard()
      .then(res => {
        if (res?.data) {
          setTotals(res.data.totals || null);
          setRecentActivity(res.data.recentActivity || []);
        }
      })
      .catch(err => console.error('Dashboard fetch error:', err))
      .finally(() => setLoadingDash(false));
  }, []);

  return (
    <main className="flex-1 p-6 md:p-10 bg-dark">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
          <p className="text-gray-text mt-1">Welcome back, Arpita. Here's what's happening today.</p>
        </div>
      </div>
      <StatCards totals={totals} loading={loadingDash} />
      <div className="mt-6">
        <RecentActivity apiActivities={recentActivity} loading={loadingDash} />
      </div>
    </main>
  );
}
