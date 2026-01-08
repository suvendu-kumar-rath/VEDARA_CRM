import React from "react";

const activityIcons = {
  "Site Visit": "🏠",
  "Discussion": "💬",
  "Quote Shared": "📄",
  "Payment": "💰",
  "Call": "📞",
  "Email": "📧",
  "Meeting": "👥",
  "Follow-up": "📅"
};

const activityColors = {
  "Site Visit": "bg-accent",
  "Discussion": "bg-blue-500",
  "Quote Shared": "bg-green-500",
  "Payment": "bg-green-500",
  "Call": "bg-blue-500",
  "Email": "bg-purple-500",
  "Meeting": "bg-accent",
  "Follow-up": "bg-orange-500"
};

export default function ActivityTimeline({ activities }) {
  return (
    <div className="bg-dark-light border border-gray-border rounded-lg p-4 md:p-6">
      <h3 className="text-base md:text-lg font-bold text-white mb-4 md:mb-6">Activity Timeline</h3>
      <div className="space-y-4 md:space-y-6">
        {activities.map((activity, index) => (
          <div key={index} className="flex gap-3 md:gap-4">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 md:w-10 md:h-10 ${activityColors[activity.type]} rounded-full flex items-center justify-center text-base md:text-lg flex-shrink-0`}>
                {activityIcons[activity.type]}
              </div>
              {index < activities.length - 1 && (
                <div className="w-0.5 h-full bg-gray-border mt-2"></div>
              )}
            </div>
            <div className="flex-1 pb-4 md:pb-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-1">
                <h4 className="text-white font-medium text-sm md:text-base">{activity.title}</h4>
                <span className="text-gray-text text-xs md:text-sm whitespace-nowrap">{activity.time}</span>
              </div>
              <p className="text-gray-text text-xs md:text-sm mb-2">{activity.description}</p>
              {activity.note && (
                <div className="bg-dark border border-gray-border rounded p-2 md:p-3 text-xs md:text-sm text-gray-text mt-2">
                  {activity.note}
                </div>
              )}
              {activity.by && (
                <div className="text-xs text-gray-text mt-2">By {activity.by}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
