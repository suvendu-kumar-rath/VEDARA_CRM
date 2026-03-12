import React from "react";

function formatRevenue(value) {
  if (!value || value === 0) return "₹0";
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)}Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(2)}L`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(1)}K`;
  return `₹${value}`;
}

export default function StatCards({ totals, loading }) {
  const stats = [
    { label: "Total Leads", value: loading ? "…" : (totals?.leads ?? "—"), icon: "👥" },
    { label: "Total Clients", value: loading ? "…" : (totals?.clients ?? "—"), icon: "🏠" },
    { label: "Monthly Revenue", value: loading ? "…" : formatRevenue(totals?.monthlyRevenue), icon: "💰" },
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
