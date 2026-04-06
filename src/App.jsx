import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import AppRoutes from './routes/AppRoutes';
import Login from './pages/Auth/Login';
import ResetPassword from './pages/Auth/ResetPassword';

function App() {
  // Simple authentication state for demonstration
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <Router>
      <Routes>
        {/* Public Route: Login */}
        <Route 
          path="/login" 
          element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <Login />
          } 
        />
        <Route 
          path="/reset-password" 
          element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <ResetPassword />
          } 
        />

        {/* Private Routes: Wrapped in AdminLayout */}
        <Route 
          path="/*" 
          element={
            isAuthenticated ? (
              <AdminLayout>
                <AppRoutes />
              </AdminLayout>
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
