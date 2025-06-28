// // pages/admin/Dashboard.jsx





import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, Building, Megaphone } from 'lucide-react';
import Card from '../../components/ui/Card.jsx';
import Button from '../../components/ui/Button.jsx';

const Dashboard = () => {
  const [listings, setListings] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from the backend API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch properties
        const propertiesResponse = await fetch('http://localhost:5000/api/properties');
        if (!propertiesResponse.ok) {
          throw new Error('Failed to fetch properties');
        }
        const propertiesData = await propertiesResponse.json();
        setListings(propertiesData);

        // Fetch announcements
        const announcementsResponse = await fetch('http://localhost:5000/api/announcements');
        if (!announcementsResponse.ok) {
          throw new Error('Failed to fetch announcements');
        }
        const announcementsData = await announcementsResponse.json();
        setAnnouncements(announcementsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  const stats = [
    {
      title: 'Total Properties',
      value: listings.length,
      icon: <Home className="w-8 h-8 text-blue-900" />,
      description: 'Properties currently listed',
    },
    {
      title: 'Buy Listings',
      value: listings.length,
      // value: listings.filter((property) => property.status === 'available').length, // Assuming "status" field exists
      icon: <Building className="w-8 h-8 text-blue-900" />,
      description: 'Properties available for purchase',
    },
    {
      title: 'Announcements',
      value: announcements.length,
      icon: <Megaphone className="w-8 h-8 text-blue-900" />,
      description: 'Active announcements',
    }
  ];

  const recentProperties = listings.slice(0, 5);
  const recentAnnouncements = announcements.slice(0, 3);

  return (
    <div className="px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{stat.title}</h3>
                <div className="p-2 bg-blue-100 rounded-lg">
                  {stat.icon}
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.description}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-8"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recently Added Properties</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Added</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentProperties.map((property) => (
                <tr key={property.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {property.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{property.city}</td>
                  <td className="px-6 py-4 whitespace-nowrap">PKR {property.price.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{property.size} marla</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(property.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Announcements</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentAnnouncements.map((announcement) => (
                <tr key={announcement.id}>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{announcement.title}</div>
                    <div className="text-sm text-gray-500 truncate max-w-md">{announcement.content}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(announcement.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;




