// components/layout/UserFooter.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const UserFooter = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Home className="w-6 h-6 text-orange-500" />
              <span className="font-bold text-xl">PropertyCenter</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted partner in finding the perfect property. We help you make informed decisions for your real estate investments.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 border-b border-gray-700 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-orange-500 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/buy" className="text-gray-400 hover:text-orange-500 transition-colors">Buy Property</Link>
              </li>
              <li>
                <Link to="/sell" className="text-gray-400 hover:text-orange-500 transition-colors">Sell Property</Link>
              </li>
              <li>
                <Link to="/prediction" className="text-gray-400 hover:text-orange-500 transition-colors">Price Prediction</Link>
              </li>
              <li>
                <Link to="/faqs" className="text-gray-400 hover:text-orange-500 transition-colors">FAQs</Link>
              </li>
              <li>
                <Link to="/announcements" className="text-gray-400 hover:text-orange-500 transition-colors">Announcements</Link>
              </li>
            </ul>
          </div>

          {/* About Us */}
          <div>
            <h3 className="font-semibold text-lg mb-4 border-b border-gray-700 pb-2">About Us</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Our Story</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Our Team</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Careers</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Terms of Service</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4 border-b border-gray-700 pb-2">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-orange-500 mt-0.5" />
                <span className="text-gray-400">123 Property Lane, Real Estate City, 54321</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-orange-500" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-orange-500" />
                <span className="text-gray-400">contact@propertycenter.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} PropertyCenter. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default UserFooter;
