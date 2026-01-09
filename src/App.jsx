import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import DashboardPage from "./pages/DashboardPage";
import LeadsPage from "./pages/LeadsPage";
import LeadDetails from "./pages/LeadDetails";
import ClientsPage from "./pages/ClientsPage";
// import QuotationsPage from "./pages/QuotationsPage";
// import ProjectsPage from "./pages/ProjectsPage";
// import DesignsPage from "./pages/DesignsPage";
// import SettingsPage from "./pages/SettingsPage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex bg-dark min-h-screen font-sans">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/leads" element={<LeadsPage />} />
            <Route path="/leads/:id" element={<LeadDetails />} />
            <Route path="/clients" element={<ClientsPage />} />
            {/* <Route path="/quotations" element={<QuotationsPage />} /> */}
            {/* <Route path="/projects" element={<ProjectsPage />} /> */}
            {/* <Route path="/designs" element={<DesignsPage />} /> */}
            {/* <Route path="/settings" element={<SettingsPage />} /> */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
