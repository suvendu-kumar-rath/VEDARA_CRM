import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const navItems = [
  { label: "Dashboard", icon: "📊", path: "/", roles: ["admin", "lead"] },
  { label: "Leads", icon: "👥", path: "/leads", roles: ["admin", "lead"] },
  { label: "Clients", icon: "👤", path: "/clients", roles: ["admin", "lead"] },
  // { label: "Projects", icon: "📁", path: "/projects", roles: ["admin", "lead"] },
  { label: "Designs", icon: "🎨", path: "/designs", roles: ["admin", "lead", "designer"] },
  { label: "Quotations", icon: "📄", path: "/quotations", roles: ["admin", "lead"] },
  { label: "Forms", icon: "📋", path: "/forms", roles: ["admin", "lead"] },
  { label: "Employee", icon: "👥", path: "/users", roles: ["admin"] },
  { label: "Settings", icon: "⚙️", path: "/settings", roles: ["admin", "lead"] },
];

export default function Sidebar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const canAccessNavItem = (navItem) => {
    if (!user) return false;
    return navItem.roles.includes(user.role);
  };

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'from-blue-500 to-blue-600';
      case 'lead': return 'from-green-500 to-green-600';
      case 'designer': return 'from-purple-500 to-purple-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getRoleDisplayName = (role) => {
    switch (role) {
      case 'admin': return 'Administrator';
      case 'lead': return 'Lead Manager';
      case 'designer': return 'Designer';
      default: return role;
    }
  };

  // Filter navigation items based on user role
  const accessibleNavItems = navItems.filter(canAccessNavItem);

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
            {accessibleNavItems.map((item) => (
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
        <div className="space-y-3 mt-10">
          {/* User Profile */}
          <div className="flex items-center gap-3 p-3 rounded bg-gray-border/50">
            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${getRoleColor(user?.role)} flex items-center justify-center`}>
              <span className="text-white font-bold text-sm">
                {user?.email ? user.email.charAt(0).toUpperCase() : 'U'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-sm font-semibold truncate">{user?.email || 'User'}</div>
              <div className="text-gray-text text-xs">{getRoleDisplayName(user?.role)}</div>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded text-left text-sm font-medium text-gray-text hover:bg-red-900/20 hover:text-red-400 transition"
          >
            <span className="text-base">🚪</span>
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
