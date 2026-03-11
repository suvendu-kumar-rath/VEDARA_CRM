import React, { useState, useEffect } from "react";
import { getActivities, timeAgo } from "../utils/activityLog";

export default function RecentActivity() {
  const [activities, setActivities] = useState(getActivities);

  useEffect(() => {
    const refresh = () => setActivities(getActivities());
    window.addEventListener("vedara_activity_updated", refresh);
    return () => window.removeEventListener("vedara_activity_updated", refresh);
  }, []);

  return (
    <div className="bg-dark-light border border-gray-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="text-white font-semibold text-lg">Recent Activity</div>
      </div>
      <div className="flex flex-col gap-4">
        {activities.length === 0 ? (
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
