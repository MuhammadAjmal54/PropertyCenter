// components/layout/UserLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import UserNavbar from './UserNavbar';
import UserFooter from './UserFooter';

const UserLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <UserNavbar />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <UserFooter />
    </div>
  );
};

export default UserLayout;
