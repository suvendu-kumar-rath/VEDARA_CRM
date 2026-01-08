import React from "react";

export default function PaymentOverview() {
  return (
    <div className="bg-dark-light border border-gray-border rounded-lg p-6 flex flex-col">
      <div className="text-white font-semibold text-lg mb-6">Payment Overview</div>
      <div className="flex flex-col items-center justify-center flex-1">
        <div className="relative w-40 h-40">
          <svg viewBox="0 0 100 100" className="transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#232323"
              strokeWidth="12"
            />
            {/* Received portion (72.4%) */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#FFD600"
              strokeWidth="12"
              strokeDasharray={`${72.4 * 2.513} ${100 * 2.513}`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-white text-2xl font-bold">72.4%</div>
            <div className="text-gray-text text-xs">Received</div>
          </div>
        </div>
        <div className="flex gap-6 mt-6">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-accent rounded-full inline-block" />
            <span className="text-gray-text text-sm">Received</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-gray-border rounded-full inline-block" />
            <span className="text-gray-text text-sm">Pending</span>
          </div>
        </div>
        <div className="mt-4 text-center">
          <div className="text-gray-text text-xs">27.6% Pending</div>
        </div>
      </div>
    </div>
  );
}
