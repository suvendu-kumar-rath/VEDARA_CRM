import React, { useState } from "react";

const designsData = [
  {
    id: 1,
    title: "Luxury Villa - Living Room",
    project: "Juhu Villa Project",
    version: "Living Room v.V3",
    status: "Approved",
    statusColor: "yellow",
    date: "Mar 15, 2024",
    imageColor: "#F5F5F5" // Light cream/white
  },
  {
    id: 2,
    title: "Corporate Office - Reception",
    project: "BKC Office Project",
    version: "Reception v.V2",
    status: "Pending Approval",
    statusColor: "orange",
    date: "Mar 12, 2024",
    imageColor: "#2C3E50" // Dark blue-grey
  },
  {
    id: 3,
    title: "Penthouse - Master Bedroom",
    project: "Worli Penthouse",
    version: "Bedroom v.V1",
    status: "Changes Requested",
    statusColor: "orange",
    date: "Mar 10, 2024",
    imageColor: "#8B7355" // Warm brown
  },
  {
    id: 4,
    title: "Boutique Hotel - Lobby",
    project: "Goa Hotel Project",
    version: "Lobby v.V2",
    status: "Approved",
    statusColor: "yellow",
    date: "Mar 08, 2024",
    imageColor: "#4A4A4A" // Dark grey
  },
  {
    id: 5,
    title: "Modern Apartment - Kitchen",
    project: "Powai Apartment",
    version: "Kitchen v.V1",
    status: "Approved",
    statusColor: "yellow",
    date: "Mar 05, 2024",
    imageColor: "#D4B896" // Light wood tone
  },
  {
    id: 6,
    title: "Café Interiors - Main Seating",
    project: "Bandra Cafe Project",
    version: "Seating Area v.V3",
    status: "Pending Approval",
    statusColor: "orange",
    date: "Mar 03, 2024",
    imageColor: "#5A9B9B" // Teal
  },
  {
    id: 7,
    title: "Villa - Master Bathroom",
    project: "Juhu Villa Project",
    version: "Bathroom v.V2",
    status: "Approved",
    statusColor: "yellow",
    date: "Feb 28, 2024",
    imageColor: "#E8E8E8" // Light grey marble
  },
  {
    id: 8,
    title: "Office - Conference Room",
    project: "BKC Office Project",
    version: "Conference v.V1",
    status: "Changes Requested",
    statusColor: "orange",
    date: "Feb 25, 2024",
    imageColor: "#F5F5F5" // White/grey
  }
];

const statusStyles = {
  yellow: "bg-accent text-dark",
  orange: "bg-orange-500/10 border border-orange-500 text-orange-400"
};

export default function DesignsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [designs] = useState(designsData);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredDesigns = designs.filter(design =>
    design.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    design.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
    design.version.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalDesigns = designs.length * 18; // 146 ≈ 8 * 18
  const pendingApproval = designs.filter(d => d.status === "Pending Approval").length * 6;
  const approvedDesigns = designs.filter(d => d.status === "Approved").length * 32;
  const revisionsRequested = designs.filter(d => d.status === "Changes Requested").length * 3;

  return (
    <main className="flex-1 p-6 md:p-10 bg-dark overflow-y-auto">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Designs</h1>
          <p className="text-gray-text mt-1">Visual designs, versions, and client approvals</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-accent text-dark px-4 py-2 rounded flex items-center gap-2 hover:bg-yellow-500 transition text-sm font-medium">
            <span className="text-lg">📤</span> Upload Design
          </button>
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`border px-4 py-2 rounded flex items-center gap-2 transition text-sm font-medium ${
              isFilterOpen 
                ? 'bg-accent text-dark border-accent' 
                : 'bg-dark-light border-gray-border text-white hover:border-accent'
            }`}
          >
            <span>▼</span> Filter
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-dark-light border border-gray-border rounded-lg p-5">
          <div className="text-sm text-gray-text mb-2">Total Designs</div>
          <div className="text-3xl font-bold text-accent">{totalDesigns}</div>
        </div>
        <div className="bg-dark-light border border-gray-border rounded-lg p-5">
          <div className="text-sm text-gray-text mb-2">Pending Approval</div>
          <div className="text-3xl font-bold text-accent">{pendingApproval}</div>
        </div>
        <div className="bg-dark-light border border-gray-border rounded-lg p-5">
          <div className="text-sm text-gray-text mb-2">Approved Designs</div>
          <div className="text-3xl font-bold text-accent">{approvedDesigns}</div>
        </div>
        <div className="bg-dark-light border border-gray-border rounded-lg p-5">
          <div className="text-sm text-gray-text mb-2">Revisions Requested</div>
          <div className="text-3xl font-bold text-accent">{revisionsRequested}</div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search designs, projects, rooms..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-dark-light border border-gray-border rounded px-4 py-2.5 text-white placeholder-gray-text focus:outline-none focus:border-accent transition"
        />
      </div>

      {/* Design Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredDesigns.map((design) => (
          <div
            key={design.id}
            className="bg-dark-light border border-gray-border rounded-lg overflow-hidden hover:border-accent transition cursor-pointer group"
          >
            {/* Design Image Placeholder */}
            <div 
              className="w-full h-48 relative overflow-hidden"
              style={{ backgroundColor: design.imageColor }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white/20 text-6xl">🏠</div>
              </div>
            </div>

            {/* Design Info */}
            <div className="p-4">
              <h3 className="text-white font-semibold text-base mb-1 line-clamp-1">
                {design.title}
              </h3>
              <p className="text-gray-text text-sm mb-2">{design.project}</p>
              <p className="text-gray-text text-xs mb-3">{design.version}</p>

              <div className="flex items-center justify-between">
                <span className="text-gray-text text-xs">{design.date}</span>
                <span className={`px-3 py-1 rounded text-xs font-medium ${statusStyles[design.statusColor]}`}>
                  {design.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredDesigns.length === 0 && (
        <div className="text-center py-20">
          <div className="text-gray-text text-lg mb-2">No designs found</div>
          <p className="text-gray-text text-sm">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Filter Sidebar (if needed in future) */}
      {isFilterOpen && (
        <>
          {/* Mobile Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => setIsFilterOpen(false)}
          />
          
          {/* Filter Sidebar */}
          <aside className="w-80 bg-dark-light border-l border-gray-border p-6 overflow-y-auto fixed right-0 top-0 bottom-0 z-40">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white">Filter Designs</h2>
              <button 
                onClick={() => setIsFilterOpen(false)}
                className="text-gray-text hover:text-white transition text-xl"
              >
                ✕
              </button>
            </div>

            {/* Status Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-white mb-3">
                Status
              </label>
              <div className="space-y-2">
                {["Approved", "Pending Approval", "Changes Requested"].map((status) => (
                  <label key={status} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-border bg-dark checked:bg-accent checked:border-accent focus:ring-0 focus:ring-offset-0"
                    />
                    <span className="text-gray-text text-sm">{status}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Room Type Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-white mb-2">
                Room Type
              </label>
              <select className="w-full bg-dark border border-gray-border rounded px-4 py-2.5 text-white focus:outline-none focus:border-accent transition">
                <option value="">All Rooms</option>
                <option value="living">Living Room</option>
                <option value="bedroom">Bedroom</option>
                <option value="kitchen">Kitchen</option>
                <option value="bathroom">Bathroom</option>
                <option value="office">Office</option>
              </select>
            </div>

            {/* Clear Filters */}
            <button className="w-full bg-dark border border-gray-border text-gray-text px-4 py-2.5 rounded hover:border-accent hover:text-white transition text-sm font-medium">
              Clear All Filters
            </button>
          </aside>
        </>
      )}
    </main>
  );
}
