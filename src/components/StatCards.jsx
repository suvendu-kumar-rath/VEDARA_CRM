import React, { useState, useEffect } from "react";
import apiService from "../services/api";

export default function StatCards() {
  const [totalLeads, setTotalLeads] = useState("—");
  const [totalClients, setTotalClients] = useState("—");
  const [monthlyRevenue] = useState("₹45.8L");

  useEffect(() => {
    apiService.getLeads().then(res => {
      const items = res?.data?.items || res?.data || [];
      setTotalLeads(Array.isArray(items) ? items.length : "—");
    }).catch(() => setTotalLeads("—"));

    apiService.getClients().then(res => {
      const items = res?.data?.items || res?.data || [];
      setTotalClients(Array.isArray(items) ? items.length : "—");
    }).catch(() => setTotalClients("—"));
  }, []);

  const stats = [
    { label: "Total Leads", value: totalLeads, icon: "👥" },
    { label: "Total Clients", value: totalClients, icon: "🏠" },
    { label: "Monthly Revenue", value: monthlyRevenue, icon: "💰" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-dark-light border border-gray-border rounded-lg p-5 flex flex-col gap-3 hover:border-accent transition">
          <div className="text-3xl">{stat.icon}</div>
          <div className="text-3xl font-bold text-white">{stat.value}</div>
          <div className="text-gray-text text-sm">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
