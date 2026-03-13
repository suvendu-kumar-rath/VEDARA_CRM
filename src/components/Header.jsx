import React from "react";

export default function Header() {
  return (
    <header className="bg-black border-b border-accent/20 px-4 md:px-6 py-4 flex items-center justify-end gap-2 md:gap-4">
      {/* Action Buttons */}
      <div className="flex items-center gap-1 md:gap-2">
        <button className="text-accent hover:text-white p-2 rounded-full hover:bg-gray-border transition relative">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
        </button>
      </div>
    </header>
  );
}
