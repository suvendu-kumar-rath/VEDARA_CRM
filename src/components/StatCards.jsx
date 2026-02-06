import React from "react";

const stats = [
  {
    label: "Active Projects",
    value: "24",
    icon: "📁",
    change: "+12%",
    changeColor: "text-green-400",
  },
  {
    label: "Pending Payments",
    value: "₹12.4L",
    icon: "💰",
    change: "-8%",
    changeColor: "text-red-400",
  },
  {
    label: "Monthly Revenue",
    value: "₹45.8L",
    icon: "💼",
    change: "+23%",
    changeColor: "text-green-400",
  },
  {
    label: "New Leads",
    value: "16",
    icon: "👥",
    change: "+18%",
    changeColor: "text-green-400",
  },
];

export default function StatCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-dark-light border border-gray-border rounded-lg p-5 flex flex-col gap-3 hover:border-accent transition">
          <div className="flex items-center justify-between">
            <div className="text-3xl">{stat.icon}</div>
            <div className={`text-xs font-bold ${stat.changeColor}`}>{stat.change}</div>
          </div>
          <div className="text-3xl font-bold text-white">{stat.value}</div>
          <div className="text-gray-text text-sm">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
// This component displays a set of statistic cards with icons, values, and percentage changes. Each card is styled with a dark background, borders, and hover effects for better interactivity. The data for the cards is defined in an array, making it easy to update or add new statistics in the future.