import React from "react";

const projects = [
  { name: "Anand Residence – Juhu", desc: "4BHK Luxury Apartment", percent: 78, color: "bg-accent" },
  { name: "Mehta Villa – Bandra", desc: "Duplex Villa Interior", percent: 62, color: "bg-accent" },
  { name: "Kumar Office – Worli", desc: "Corporate Office Design", percent: 45, color: "bg-accent" },
  { name: "Shah Penthouse – Malabar Hill", desc: "Premium Penthouse Renovation", percent: 91, color: "bg-accent" },
  { name: "Desai Boutique – Colaba", desc: "Retail Store Interior", percent: 28, color: "bg-accent" },
];

export default function ProjectProgress() {
  return (
    <div className="bg-dark-light border border-gray-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="text-white font-semibold text-lg">Project Progress</div>
        <button className="text-accent text-sm hover:underline font-medium">View All</button>
      </div>
      <div className="flex flex-col gap-5">
        {projects.map((p) => (
          <div key={p.name}>
            <div className="flex justify-between text-sm mb-2">
              <div className="text-white font-medium">{p.name}</div>
              <div className="text-accent font-bold">{p.percent}%</div>
            </div>
            <div className="text-xs text-gray-text mb-2">{p.desc}</div>
            <div className="w-full h-2 bg-gray-border rounded-full overflow-hidden">
              <div
                className={`h-2 rounded-full ${p.color} transition-all duration-500`}
                style={{ width: `${p.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
