import React from "react";

const stats = [
  { label: "Designs Pending", value: 7 },
  { label: "Site Visits Scheduled", value: 5 },
  { label: "Vendor Orders", value: 12 },
  { label: "Quotes Awaiting", value: 4 },
  { label: "Team Members", value: 18 },
  { label: "Avg. Project Value", value: "₹22.5L", highlight: true },
];

export default function QuickStats() {
  return (
    <div className="bg-dark-light border border-gray-border rounded-lg p-6">
      <div className="text-white font-semibold text-lg mb-5">Quick Stats</div>
      <div className="flex flex-col gap-4">
        {stats.map((s) => (
          <div key={s.label} className="flex justify-between items-center py-2 border-b border-gray-border last:border-b-0">
            <span className="text-gray-text text-sm">{s.label}</span>
            <span className={`font-bold text-lg ${s.highlight ? "text-accent" : "text-white"}`}>
              {s.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
