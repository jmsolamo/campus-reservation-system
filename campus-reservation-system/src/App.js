import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import './App.css';

// Import pages
import LoginPage from './Pages/LoginPage/loginPage';
import RegisterPage from './Pages/RegisterPage/registerPage';
import ClientDashboard from './Pages/Client/Dashboard/clientDashboard';
import AdminDashboard from './Pages/Admin/Dashboard/adminDashboard';
import RequestEvent from './Pages/Client/RequestEvent/requestEvent';
import Settings from './Pages/Settings/settings';
import Navbar from './Componets/Navbar';

// Import admin pages
import AdminEvents from './Pages/Admin/Events/adminEvents';
import AdminCreateEvent from './Pages/Admin/CreateEvent/adminCreateEvent';
import AdminUsers from './Pages/Admin/Users/adminUsers';
import AdminRequests from './Pages/Admin/Requests/adminRequests';

// Authentication context
export const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Mock login function
  const login = (credentials) => {
    console.log("Mock login with:", credentials);
    // Create a mock user based on credentials
    const mockUser = {
      id: 1,
      username: credentials.username,
      firstname: 'Mock',
      lastname: 'User',
      email: `${credentials.username}@example.com`,
      role: credentials.username.includes('admin') ? 'admin' : 'user'
    };
    setUser(mockUser);
    setIsAuthenticated(true);
    return { success: true, user: mockUser };
  };

  // Mock logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    return { success: true };
  };

  // Mock register function
  const register = (userData) => {
    console.log("Mock register with:", userData);
    return { success: true };
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

// Protected route component
const ProtectedRoute = ({ element, requiredRole }) => {
  const { user, isAuthenticated } = React.useContext(AuthContext);
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return element;
};

function AppContent() {
  const location = useLocation();
  
  // Check if current route is an admin route
  const isAdminRoute = location.pathname.startsWith('/admin');
  
  // Show navbar on these routes
  const clientNavbarRoutes = ['/dashboard', '/requestEvent', '/settings'];
  const adminNavbarRoutes = ['/admin/dashboard', '/admin/events', '/admin/requests', '/admin/create-event', '/admin/users', '/admin/settings'];
  
  // Determine if navbar should be shown
  const showNavbar = clientNavbarRoutes.includes(location.pathname) || adminNavbarRoutes.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar isAdminPage={isAdminRoute} />}
      
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Client routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute element={<ClientDashboard />} />
        } />
        <Route path="/requestEvent" element={
          <ProtectedRoute element={<RequestEvent />} />
        } />
        <Route path="/settings" element={
          <ProtectedRoute element={<Settings />} />
        } />
        
        {/* Admin routes */}
        <Route path="/admin/dashboard" element={
          <ProtectedRoute element={<AdminDashboard />} requiredRole="admin" />
        } />
        <Route path="/admin/events" element={
          <ProtectedRoute element={<AdminEvents />} requiredRole="admin" />
        } />
        <Route path="/admin/requests" element={
          <ProtectedRoute element={<AdminRequests />} requiredRole="admin" />
        } />
        <Route path="/admin/create-event" element={
          <ProtectedRoute element={<AdminCreateEvent />} requiredRole="admin" />
        } />
        <Route path="/admin/users" element={
          <ProtectedRoute element={<AdminUsers />} requiredRole="admin" />
        } />
        <Route path="/admin/settings" element={
          <ProtectedRoute element={<Settings />} requiredRole="admin" />
        } />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;