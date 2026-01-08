import React from "react";

export default function LeadSummaryCard({ lead }) {
  const stageColors = {
    "Site Visit": "border-accent text-accent",
    "Quote Shared": "border-green-500 text-green-400",
    "New": "border-blue-500 text-blue-400",
    "Discussion": "border-accent text-accent"
  };

  return (
    <div className="bg-dark-light border border-gray-border rounded-lg p-4 md:p-6">
      <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-6">
        <div className="flex items-start gap-3 md:gap-4 w-full sm:w-auto">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-dark rounded-full flex items-center justify-center text-2xl md:text-3xl border border-gray-border flex-shrink-0">
            👤
          </div>
          <div className="flex-1">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-1">{lead.name}</h2>
            <div className="flex flex-wrap gap-2 md:gap-3 text-gray-text text-xs md:text-sm">
              <span className="flex items-center gap-1">
                📞 {lead.phone}
              </span>
              <span className="flex items-center gap-1">
                📍 {lead.city}
              </span>
            </div>
          </div>
        </div>
        <span className={`border ${stageColors[lead.stage]} px-3 md:px-4 py-1.5 rounded text-xs md:text-sm font-medium whitespace-nowrap`}>
          {lead.stage}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        <div>
          <div className="text-gray-text text-xs md:text-sm mb-1">Source</div>
          <div className="text-white font-medium text-sm md:text-base">{lead.source}</div>
        </div>
        <div>
          <div className="text-gray-text text-xs md:text-sm mb-1">Budget</div>
          <div className="text-white font-medium text-sm md:text-base">{lead.budget}</div>
        </div>
        <div>
          <div className="text-gray-text text-xs md:text-sm mb-1">Property Type</div>
          <div className="text-white font-medium text-sm md:text-base">{lead.property}</div>
        </div>
        <div>
          <div className="text-gray-text text-xs md:text-sm mb-1">Lead Score</div>
          <div className="text-white font-medium flex items-center gap-2 text-sm md:text-base">
            <span className="text-accent">⭐⭐⭐⭐</span>
            <span className="text-xs md:text-sm text-gray-text">(Hot)</span>
          </div>
        </div>
        <div>
          <div className="text-gray-text text-xs md:text-sm mb-1">Follow-up Date</div>
          <div className="text-white font-medium text-sm md:text-base">{lead.followUp}</div>
        </div>
        <div>
          <div className="text-gray-text text-xs md:text-sm mb-1">Created On</div>
          <div className="text-white font-medium text-sm md:text-base">{lead.createdOn}</div>
        </div>
      </div>
    </div>
  );
}
