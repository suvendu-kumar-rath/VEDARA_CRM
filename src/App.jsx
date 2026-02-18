import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import DashboardPage from "./pages/DashboardPage";
import LeadsPage from "./pages/LeadsPage";
import LeadDetails from "./pages/LeadDetails";
import ClientsPage from "./pages/ClientsPage";
import QuotationsPage from "./pages/QuotationsPage";
import ProjectsPage from "./pages/ProjectsPage";
import DesignsPage from "./pages/DesignsPage";
import UsersPage from "./pages/UsersPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import FormsPage from "./pages/FormsPage";

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return (
    <div className="flex bg-dark min-h-screen font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <Routes>
          <Route path="/" element={
            <ProtectedRoute allowedRoles={["admin", "lead"]}>
              <DashboardPage />
            </ProtectedRoute>
          } />
          <Route path="/leads" element={
            <ProtectedRoute allowedRoles={["admin", "lead"]}>
              <LeadsPage />
            </ProtectedRoute>
          } />
          <Route path="/leads/:id" element={
            <ProtectedRoute allowedRoles={["admin", "lead"]}>
              <LeadDetails />
            </ProtectedRoute>
          } />
          <Route path="/clients" element={
            <ProtectedRoute allowedRoles={["admin", "lead"]}>
              <ClientsPage />
            </ProtectedRoute>
          } />
          <Route path="/quotations" element={
            <ProtectedRoute allowedRoles={["admin", "lead"]}>
              <QuotationsPage />
            </ProtectedRoute>
          } />
          <Route path="/projects" element={
            <ProtectedRoute allowedRoles={["admin", "lead"]}>
              <ProjectsPage />
            </ProtectedRoute>
          } />
          <Route path="/designs" element={
            <ProtectedRoute allowedRoles={["admin", "lead", "designer"]}>
              <DesignsPage />
            </ProtectedRoute>
          } />
          <Route path="/users" element={
            <ProtectedRoute requiredRole="admin">
              <UsersPage />
            </ProtectedRoute>
          } />
          <Route path="/forms" element={
            <ProtectedRoute allowedRoles={["admin", "lead"]}>
              <FormsPage />
            </ProtectedRoute>
          } />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}
