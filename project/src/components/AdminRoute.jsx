import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
  const isAdminAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';

  return isAdminAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default AdminRoute;
