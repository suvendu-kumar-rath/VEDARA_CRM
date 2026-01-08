import React from "react";

const activities = [
  {
    icon: "✓",
    bgColor: "bg-green-500",
    title: "Client Approval Received",
    desc: "Anand Residence – Living room design approved by client",
    time: "7 hours ago",
  },
  {
    icon: "⬆",
    bgColor: "bg-accent",
    title: "Design Upload",
    desc: "Mehta Villa – 3D renders for master bedroom uploaded",
    time: "12 hours ago",
  },
  {
    icon: "⚡",
    bgColor: "bg-accent",
    title: "Site Update",
    desc: "Shah Penthouse – Flooring work completed, moving to lighting",
    time: "1 day ago",
  },
  {
    icon: "₹",
    bgColor: "bg-green-500",
    title: "Payment Received",
    desc: "Kumar Office – ₹8.5L milestone payment received",
    time: "1 day ago",
  },
  {
    icon: "📝",
    bgColor: "bg-accent",
    title: "Quote Generated",
    desc: "New lead – Patel Residence 3BHK, quote sent for ₹16.5L",
    time: "2 days ago",
  },
  {
    icon: "★",
    bgColor: "bg-accent",
    title: "New Lead Added",
    desc: "Sharma Family – 5BHK Villa in Alibaug, budget ₹35L",
    time: "3 days ago",
  },
];

export default function RecentActivity() {
  return (
    <div className="bg-dark-light border border-gray-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="text-white font-semibold text-lg">Recent Activity</div>
        <button className="text-accent text-sm hover:underline font-medium">View All</button>
      </div>
      <div className="flex flex-col gap-4">
        {activities.map((a, i) => (
          <div key={i} className="flex items-start gap-3 p-3 rounded hover:bg-dark transition">
            <span className={`${a.bgColor} text-dark rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0`}>
              {a.icon}
            </span>
            <div className="flex-1">
              <div className="text-white font-medium text-sm">{a.title}</div>
              <div className="text-gray-text text-xs mt-1">{a.desc}</div>
              <div className="text-gray-text text-xs mt-1">{a.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
