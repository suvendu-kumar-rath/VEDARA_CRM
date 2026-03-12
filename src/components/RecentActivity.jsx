import React, { useState, useEffect } from "react";
import { getActivities, timeAgo } from "../utils/activityLog";

const TYPE_ICON = { quotation: "📄", lead: "👥", client: "🏠" };

function formatApiActivity(entry) {
  const icon = TYPE_ICON[entry.type] || "🔔";
  let desc = "";
  if (entry.meta?.status) desc += `Status: ${entry.meta.status}`;
  if (entry.meta?.amount) desc += `${desc ? " · " : ""}₹${Number(entry.meta.amount).toLocaleString("en-IN")}`;
  return { icon, title: entry.title, desc: desc || entry.type, timestamp: entry.time };
}

export default function RecentActivity({ apiActivities, loading }) {
  const [localActivities, setLocalActivities] = useState(getActivities);

  useEffect(() => {
    const refresh = () => setLocalActivities(getActivities());
    window.addEventListener("vedara_activity_updated", refresh);
    return () => window.removeEventListener("vedara_activity_updated", refresh);
  }, []);

  // Prefer API data when available
  const activities = (apiActivities && apiActivities.length > 0)
    ? apiActivities.map(formatApiActivity)
    : localActivities;

  return (
    <div className="bg-dark-light border border-gray-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="text-white font-semibold text-lg">Recent Activity</div>
      </div>
      <div className="flex flex-col gap-4">
        {loading ? (
          <p className="text-gray-text text-sm text-center py-6">Loading activity…</p>
        ) : activities.length === 0 ? (
          <p className="text-gray-text text-sm text-center py-6">No activity yet. Actions you take will appear here.</p>
        ) : (
          activities.map((a, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded hover:bg-dark transition">
              <span className="bg-accent text-dark rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                {a.icon}
              </span>
              <div className="flex-1">
                <div className="text-white font-medium text-sm">{a.title}</div>
                <div className="text-gray-text text-xs mt-1">{a.desc}</div>
                <div className="text-gray-text text-xs mt-1">{timeAgo(a.timestamp)}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
