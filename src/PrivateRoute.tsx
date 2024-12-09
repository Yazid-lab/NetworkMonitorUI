import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Check if user is authenticated
const isAuthenticated = () => {
  return !!localStorage.getItem('authenticationToken');
};

const PrivateRoute: React.FC = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
