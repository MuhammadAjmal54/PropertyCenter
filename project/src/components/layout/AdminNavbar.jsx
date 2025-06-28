// components/layout/AdminNavbar.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, LogOut } from 'lucide-react';

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any admin auth tokens or state here if you have them
    // For example: localStorage.removeItem('adminToken');

    navigate('/admin/login');
  };

  return (
    <div className="bg-blue-900 text-white px-6 py-3 flex justify-between items-center">
      <Link to="/admin" className="flex items-center space-x-2">
        <Home className="w-6 h-6" />
        <span className="font-bold text-lg">PropertyCenter Admin</span>
      </Link>
      
      <button
        onClick={handleLogout}
        className="flex items-center space-x-1 hover:text-orange-300 transition-colors"
      >
        <LogOut className="w-5 h-5" onClick={handleLogout} />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default AdminNavbar;
