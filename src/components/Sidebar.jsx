import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Dashboard", icon: "📊", path: "/" },
  { label: "Leads", icon: "👥", path: "/leads" },
  { label: "Clients", icon: "👤", path: "/clients" },
  { label: "Projects", icon: "📁", path: "/projects" },
  { label: "Designs", icon: "🎨", path: "/designs" },
  { label: "Quotations", icon: "📄", path: "/quotations" },
  { label: "Vendors", icon: "🏪", path: "/vendors" },
  { label: "Site Updates", icon: "📍", path: "/site-updates" },
  { label: "Reports", icon: "📈", path: "/reports" },
  { label: "Settings", icon: "⚙️", path: "/settings" },
];

export default function Sidebar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-dark-light border border-gray-border p-2 rounded text-accent"
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          {isMobileMenuOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M3 12h18M3 6h18M3 18h18" />
          )}
        </svg>
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`w-64 bg-dark-light border-r border-gray-border flex flex-col justify-between py-6 px-4 min-h-screen fixed lg:sticky top-0 z-40 transition-transform duration-300 ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div>
          <div className="mb-10">
            <h2 className="text-accent text-2xl font-bold tracking-wide">VEDARA</h2>
            <div className="text-gray-text text-xs mt-1">Interior Design Studio</div>
          </div>
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded text-left text-sm font-medium transition ${
                  isActive(item.path)
                    ? "bg-gray-border text-accent"
                    : "text-gray-text hover:bg-gray-border hover:text-white"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3 mt-10 p-3 rounded hover:bg-gray-border cursor-pointer transition">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-yellow-600 flex items-center justify-center">
            <span className="text-dark font-bold text-sm">PS</span>
          </div>
          <div>
            <div className="text-white text-sm font-semibold">Priya Sharma</div>
            <div className="text-gray-text text-xs">Design Director</div>
          </div>
        </div>
      </aside>
    </>
  );
}
