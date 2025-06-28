// // // components/layout/UserNavbar.jsx






import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Home, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';

const UserNavbar = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleLogout = () => {
    // Clear user auth here (e.g., localStorage.removeItem('token'))
    navigate('/login');
  };

  const navItems = [
    { to: '/user', label: 'Home' },
    { to: '/user/buy', label: 'Buy' },
    { to: '/user/sell', label: 'Sell' },
    { to: '/user/prediction', label: 'Prediction' },
    { to: '/user/faqs', label: 'FAQs' },
    { to: '/user/announcements', label: 'Announcements' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/user" className="flex items-center space-x-2">
          <Home className="w-8 h-8 text-blue-900" />
          <span className="font-bold text-xl text-blue-900">PropertyCenter</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-blue-900 border-b-2 border-blue-900'
                    : 'text-gray-600 hover:text-blue-900'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <Button variant="primary" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600 hover:text-blue-900 transition-colors"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white shadow-lg"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `text-sm font-medium p-2 rounded transition-colors ${
                      isActive ? 'bg-blue-50 text-blue-900' : 'text-gray-600 hover:bg-gray-50'
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
              <Button variant="primary" size="sm" fullWidth onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default UserNavbar;


