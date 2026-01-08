import React, { useState } from "react";

export default function Header() {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="bg-dark-light border-b border-gray-border px-4 md:px-6 py-4 flex items-center gap-2 md:gap-4">
      {/* Mobile Search Toggle */}
      <button
        onClick={() => setShowSearch(!showSearch)}
        className="lg:hidden text-accent hover:text-white p-2 rounded-full hover:bg-gray-border transition"
      >
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8"/>
          <path d="M21 21l-4.35-4.35"/>
        </svg>
      </button>

      {/* Search Bar */}
      <div className={`flex-1 relative ${showSearch ? 'block' : 'hidden lg:block'}`}>
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-text">
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
        </span>
        <input
          className="w-full bg-dark border border-gray-border rounded px-10 py-2.5 text-white placeholder-gray-text focus:outline-none focus:border-accent transition text-sm"
          placeholder="Search projects, clients, designs..."
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1 md:gap-2">
        <button className="text-accent hover:text-white p-2 rounded-full hover:bg-gray-border transition relative">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
        </button>
        <button className="hidden md:block text-accent hover:text-white p-2 rounded-full hover:bg-gray-border transition">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        </button>
        <button className="text-accent hover:text-white p-2 rounded-full hover:bg-gray-border transition">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </button>
      </div>
    </header>
  );
}
