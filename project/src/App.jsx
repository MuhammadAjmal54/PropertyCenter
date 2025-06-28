



import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import UserLayout from './components/layout/UserLayout.jsx';
import AdminLayout from './components/layout/AdminLayout.jsx';

// User Pages
import HomePage from './pages/user/HomePage.jsx';
import BuyPage from './pages/user/BuyPage.jsx';
import SellPage from './pages/user/SellPage.jsx';
import PredictionPage from './pages/user/PredictionPage.jsx';
import FAQsPage from './pages/user/FAQsPage.jsx';
import AnnouncementsPage from './pages/user/AnnouncementsPage.jsx';

// Admin Pages
import Dashboard from './pages/admin/Dashboard.jsx';
import BuyListings from './pages/admin/BuyListings.jsx';
import SellListings from './pages/admin/SellListings.jsx';
import ManageAnnouncements from './pages/admin/ManageAnnouncements.jsx';
import AddSellingProperty from './pages/admin/AddSellingProperty.jsx';

// Auth Pages
import LoginPage from './pages/auth/LoginPage.jsx';
import SignupPage from './pages/auth/SignupPage.jsx';
import AdminLoginPage from './pages/admin/AdminLoginPage.jsx';

// Admin Route Guard
import AdminRoute from './components/AdminRoute.jsx';

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root "/" to signup page */}
        <Route path="/" element={<Navigate to="/signup" replace />} />

        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Admin Auth Route */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Protected Admin Routes */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="buy" element={<BuyListings />} />
            <Route path="sell" element={<SellListings />} />
            <Route path="announcements" element={<ManageAnnouncements />} />
            <Route path="add-property" element={<AddSellingProperty />} />
          </Route>
        </Route>

        {/* User Routes */}
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<HomePage />} />
          <Route path="buy" element={<BuyPage />} />
          <Route path="sell" element={<SellPage />} />
          <Route path="prediction" element={<PredictionPage />} />
          <Route path="faqs" element={<FAQsPage />} />
          <Route path="announcements" element={<AnnouncementsPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/signup" replace />} />
      </Routes>
    </Router>
  );
}

export default App;