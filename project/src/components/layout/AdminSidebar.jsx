// components/layout/AdminSidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Home, Tag, Megaphone } from 'lucide-react';

const AdminSidebar = () => {
  return (
    <div className="w-64 bg-gray-800 h-screen fixed left-0 top-0 pt-16">
      <div className="p-4">
        <nav className="space-y-2">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`
            }
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/admin/buy"
            className={({ isActive }) =>
              `flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`
            }
          >
            <Home className="w-5 h-5" />
            <span>Buy Listings</span>
          </NavLink>

          <NavLink
            to="/admin/sell"
            className={({ isActive }) =>
              `flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`
            }
          >
            <Tag className="w-5 h-5" />
            <span>Sell Listings</span>
          </NavLink>

          <NavLink
            to="/admin/announcements"
            className={({ isActive }) =>
              `flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`
            }
          >
            <Megaphone className="w-5 h-5" />
            <span>Announcements</span>
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default AdminSidebar;
