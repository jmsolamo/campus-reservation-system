import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";

// Import pages
import LoginPage from "./Pages/LoginPage/loginPage";
import RegisterPage from "./Pages/RegisterPage/registerPage";
import ClientDashboard from "./Pages/Client/Dashboard/clientDashboard";
import AdminDashboard from "./Pages/Admin/Dashboard/adminDashboard";
import RequestEvent from "./Pages/Client/RequestEvent/requestEvent";
import Navbar from "./Componets/Navbar";

// Import admin pages
import AdminEvents from "./Pages/Admin/Events/adminEvents";
import AdminCreateEvent from "./Pages/Admin/CreateEvent/adminCreateEvent";
import AdminUsers from "./Pages/Admin/Users/adminUsers";
import AdminRequests from "./Pages/Admin/Requests/adminRequests";

function AppContent() {
  const location = useLocation();

  // Determine if navbar should be shown
  const showNavbar =
    location.pathname !== "/" && location.pathname !== "/register";

  return (
    <>
      {showNavbar && <Navbar isAdminPage={location.pathname.startsWith("/admin")} />}

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Client routes */}
        <Route path="/dashboard" element={<ClientDashboard />} />
        <Route path="/requestEvent" element={<RequestEvent />} />

        {/* Admin routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/events" element={<AdminEvents />} />
        <Route path="/admin/requests" element={<AdminRequests />} />
        <Route path="/admin/create-event" element={<AdminCreateEvent />} />
        <Route path="/admin/users" element={<AdminUsers />} />
      </Routes>
    </>
  );
}

function App() {
  return <Router>{<AppContent />}</Router>;
}

export default App;