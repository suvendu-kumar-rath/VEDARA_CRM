import React, { useState } from "react";

const projectsData = [
  {
    id: 1,
    projectId: "VED-2024-001",
    name: "Luxury Villa - Juhu",
    client: "Rajesh Patel",
    type: "Residential",
    phase: "Execution",
    progress: 65,
    assignedManager: {
      name: "Arjun K.",
      avatar: "AK"
    },
    startDate: "Jan 15, 2024",
    status: "On Track",
    statusColor: "green"
  },
  {
    id: 2,
    projectId: "VED-2024-002",
    name: "Corporate Office - BKC",
    client: "Neha Sharma",
    type: "Commercial",
    phase: "Design",
    progress: 30,
    assignedManager: {
      name: "Priya S.",
      avatar: "PS"
    },
    startDate: "Feb 01, 2024",
    status: "On Track",
    statusColor: "green"
  },
  {
    id: 3,
    projectId: "VED-2023-045",
    name: "Penthouse - Worli",
    client: "Amit Desai",
    type: "Residential",
    phase: "Execution",
    progress: 42,
    assignedManager: {
      name: "Rohan M.",
      avatar: "RM"
    },
    startDate: "Dec 10, 2023",
    status: "Delayed",
    statusColor: "red"
  },
  {
    id: 4,
    projectId: "VED-2024-003",
    name: "Boutique Hotel - Goa",
    client: "Kavita Mehta",
    type: "Commercial",
    phase: "Design",
    progress: 18,
    assignedManager: {
      name: "Ananya R.",
      avatar: "AR"
    },
    startDate: "Feb 20, 2024",
    status: "On Track",
    statusColor: "green"
  },
  {
    id: 5,
    projectId: "VED-2023-042",
    name: "Modern Apartment - Powai",
    client: "Vikram Singh",
    type: "Residential",
    phase: "Completed",
    progress: 100,
    assignedManager: {
      name: "Karan P.",
      avatar: "KP"
    },
    startDate: "Oct 05, 2023",
    status: "Completed",
    statusColor: "yellow"
  },
  {
    id: 6,
    projectId: "VED-2024-004",
    name: "Café Interiors - Bandra",
    client: "Sanjay Kumar",
    type: "Commercial",
    phase: "Execution",
    progress: 78,
    assignedManager: {
      name: "Priya S.",
      avatar: "PS"
    },
    startDate: "Jan 08, 2024",
    status: "On Track",
    statusColor: "green"
  }
];

const statusColors = {
  green: "bg-green-500/10 border-green-500 text-green-400",
  red: "bg-red-500/10 border-red-500 text-red-400",
  yellow: "bg-yellow-500/10 border-yellow-500 text-yellow-400"
};

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [projects] = useState(projectsData);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Filter states
  const [filters, setFilters] = useState({
    projectType: "All Types",
    phases: {
      Design: false,
      Execution: false,
      Completed: false
    },
    statuses: {
      "On Track": false,
      Delayed: false,
      Completed: false
    },
    assignedManager: ""
  });

  const filteredProjects = projects.filter(project => {
    const matchesSearch = 
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.projectId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filters.projectType === "All Types" || project.type === filters.projectType;
    
    const hasPhaseFilter = Object.values(filters.phases).some(v => v);
    const matchesPhase = !hasPhaseFilter || filters.phases[project.phase];
    
    const hasStatusFilter = Object.values(filters.statuses).some(v => v);
    const matchesStatus = !hasStatusFilter || filters.statuses[project.status];
    
    const matchesManager = !filters.assignedManager || 
      project.assignedManager.name.toLowerCase().includes(filters.assignedManager.toLowerCase());

    return matchesSearch && matchesType && matchesPhase && matchesStatus && matchesManager;
  });

  const activeProjects = projects.filter(p => p.phase !== "Completed").length;
  const designPhase = projects.filter(p => p.phase === "Design").length;
  const inExecution = projects.filter(p => p.phase === "Execution").length;
  const delayedProjects = projects.filter(p => p.status === "Delayed").length;

  const handlePhaseChange = (phase) => {
    setFilters(prev => ({
      ...prev,
      phases: { ...prev.phases, [phase]: !prev.phases[phase] }
    }));
  };

  const handleStatusChange = (status) => {
    setFilters(prev => ({
      ...prev,
      statuses: { ...prev.statuses, [status]: !prev.statuses[status] }
    }));
  };

  return (
    <div className="flex-1 flex bg-dark">
      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {/* Header */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Projects</h1>
            <p className="text-gray-text mt-1">All ongoing and completed interior projects</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-accent text-dark px-4 py-2 rounded flex items-center gap-2 hover:bg-yellow-500 transition text-sm font-medium">
              <span className="text-lg">+</span> New Project
            </button>
            <button className="bg-dark-light border border-gray-border text-white px-4 py-2 rounded flex items-center gap-2 hover:border-accent transition text-sm font-medium">
              <span>🔀</span> View Timeline
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
            <div className="text-sm text-gray-text mb-2">Active Projects</div>
            <div className="text-3xl font-bold text-accent">{activeProjects}</div>
          </div>
          <div className="bg-dark-light border border-gray-border rounded-lg p-5">
            <div className="text-sm text-gray-text mb-2">Design Phase</div>
            <div className="text-3xl font-bold text-accent">{designPhase}</div>
          </div>
          <div className="bg-dark-light border border-gray-border rounded-lg p-5">
            <div className="text-sm text-gray-text mb-2">In Execution</div>
            <div className="text-3xl font-bold text-accent">{inExecution}</div>
          </div>
          <div className="bg-dark-light border border-gray-border rounded-lg p-5">
            <div className="text-sm text-gray-text mb-2">Delayed Projects</div>
            <div className="text-3xl font-bold text-accent">{delayedProjects}</div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search projects, clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-dark-light border border-gray-border rounded px-4 py-2.5 text-white placeholder-gray-text focus:outline-none focus:border-accent transition"
          />
        </div>

        {/* Projects Table - Desktop */}
        <div className="bg-dark-light border border-gray-border rounded-lg overflow-hidden hidden md:block">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-border">
                  <th className="text-left p-4 text-gray-text font-medium text-sm">Project Name</th>
                  <th className="text-left p-4 text-gray-text font-medium text-sm">Client Name</th>
                  <th className="text-left p-4 text-gray-text font-medium text-sm">Project Type</th>
                  <th className="text-left p-4 text-gray-text font-medium text-sm">Phase</th>
                  <th className="text-left p-4 text-gray-text font-medium text-sm">Progress</th>
                  <th className="text-left p-4 text-gray-text font-medium text-sm">Assigned Manager</th>
                  <th className="text-left p-4 text-gray-text font-medium text-sm">Start Date</th>
                  <th className="text-left p-4 text-gray-text font-medium text-sm">Status</th>
                  <th className="text-left p-4 text-gray-text font-medium text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((project) => (
                  <tr
                    key={project.id}
                    className="border-b border-gray-border hover:bg-dark transition"
                  >
                    <td className="p-4">
                      <div className="text-white font-medium">{project.name}</div>
                      <div className="text-gray-text text-xs">{project.projectId}</div>
                    </td>
                    <td className="p-4 text-gray-text">{project.client}</td>
                    <td className="p-4">
                      <span className="border border-yellow-500 text-yellow-400 px-3 py-1 rounded text-xs font-medium inline-block">
                        {project.type}
                      </span>
                    </td>
                    <td className="p-4 text-gray-text">{project.phase}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-gray-border rounded-full h-2 w-24">
                          <div
                            className="bg-accent h-2 rounded-full transition-all"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                        <span className="text-white text-sm font-medium min-w-[45px]">
                          {project.progress}%
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-accent text-dark flex items-center justify-center text-xs font-bold">
                          {project.assignedManager.avatar}
                        </div>
                        <span className="text-gray-text text-sm">{project.assignedManager.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-text text-sm">{project.startDate}</td>
                    <td className="p-4">
                      <span className={`border px-3 py-1 rounded text-xs font-medium inline-block ${statusColors[project.statusColor]}`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <button className="text-gray-text hover:text-white transition">
                        <span className="text-lg">⋮</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-dark-light border border-gray-border rounded-lg p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-white font-medium text-base mb-1">{project.name}</h3>
                  <div className="text-gray-text text-xs mb-2">{project.projectId}</div>
                  <span className="border border-yellow-500 text-yellow-400 px-2 py-0.5 rounded text-xs font-medium inline-block">
                    {project.type}
                  </span>
                </div>
                <button className="text-gray-text hover:text-white transition p-2">
                  <span className="text-lg">⋮</span>
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <div className="text-gray-text text-xs mb-0.5">Client</div>
                  <div className="text-white text-sm">{project.client}</div>
                </div>
                <div>
                  <div className="text-gray-text text-xs mb-0.5">Phase</div>
                  <div className="text-white text-sm">{project.phase}</div>
                </div>
                <div>
                  <div className="text-gray-text text-xs mb-0.5">Manager</div>
                  <div className="text-white text-sm">{project.assignedManager.name}</div>
                </div>
                <div>
                  <div className="text-gray-text text-xs mb-0.5">Start Date</div>
                  <div className="text-white text-sm">{project.startDate}</div>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-text text-xs">Progress</span>
                  <span className="text-white text-sm font-medium">{project.progress}%</span>
                </div>
                <div className="bg-gray-border rounded-full h-2">
                  <div
                    className="bg-accent h-2 rounded-full transition-all"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-border">
                <span className={`border px-3 py-1 rounded text-xs font-medium ${statusColors[project.statusColor]}`}>
                  {project.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Right Sidebar - Filter */}
      {isFilterOpen && (
        <>
          {/* Mobile Overlay */}
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => setIsFilterOpen(false)}
          />
          
          {/* Filter Sidebar */}
          <aside className="w-80 bg-dark-light border-l border-gray-border p-6 overflow-y-auto fixed right-0 top-0 bottom-0 lg:sticky lg:top-0 lg:h-screen z-40">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white">Filter Projects</h2>
              <button 
                onClick={() => setIsFilterOpen(false)}
                className="text-gray-text hover:text-white transition text-xl"
              >
                ✕
              </button>
            </div>

            {/* Project Type */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-white mb-2">
                Project Type
              </label>
              <select
                value={filters.projectType}
                onChange={(e) => setFilters(prev => ({ ...prev, projectType: e.target.value }))}
                className="w-full bg-dark border border-gray-border rounded px-4 py-2.5 text-white focus:outline-none focus:border-accent transition"
              >
                <option value="All Types">All Types</option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>

            {/* Phase */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-white mb-3">
                Phase
              </label>
              <div className="space-y-2">
                {["Design", "Execution", "Completed"].map((phase) => (
                  <label key={phase} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.phases[phase]}
                      onChange={() => handlePhaseChange(phase)}
                      className="w-4 h-4 rounded border-gray-border bg-dark checked:bg-accent checked:border-accent focus:ring-0 focus:ring-offset-0"
                    />
                    <span className="text-gray-text text-sm">{phase}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Status */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-white mb-3">
                Status
              </label>
              <div className="space-y-2">
                {["On Track", "Delayed", "Completed"].map((status) => (
                  <label key={status} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.statuses[status]}
                      onChange={() => handleStatusChange(status)}
                      className="w-4 h-4 rounded border-gray-border bg-dark checked:bg-accent checked:border-accent focus:ring-0 focus:ring-offset-0"
                    />
                    <span className="text-gray-text text-sm">{status}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Assigned Manager */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-white mb-2">
                Assigned Manager
              </label>
              <input
                type="text"
                placeholder="Search manager..."
                value={filters.assignedManager}
                onChange={(e) => setFilters(prev => ({ ...prev, assignedManager: e.target.value }))}
                className="w-full bg-dark border border-gray-border rounded px-4 py-2.5 text-white placeholder-gray-text focus:outline-none focus:border-accent transition"
              />
            </div>

            {/* Clear Filters */}
            <button
              onClick={() => setFilters({
                projectType: "All Types",
                phases: { Design: false, Execution: false, Completed: false },
                statuses: { "On Track": false, Delayed: false, Completed: false },
                assignedManager: ""
              })}
              className="w-full bg-dark border border-gray-border text-gray-text px-4 py-2.5 rounded hover:border-accent hover:text-white transition text-sm font-medium"
            >
              Clear All Filters
            </button>
          </aside>
        </>
      )}
    </div>
  );
}
