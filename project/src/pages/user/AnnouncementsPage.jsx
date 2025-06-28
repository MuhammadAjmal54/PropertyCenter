// // pages/user/AnnouncementsPage.jsx



import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnnouncementCard from '../../components/announcement/AnnouncementCard.jsx';

const AnnouncementsPage = () => {
  const [announcements, setAnnouncements] = useState([]); // State to store announcements
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(''); // Error state

  // Fetch announcements from the backend when the component mounts
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/announcements'); // Call the backend API
        if (!response.ok) {
          throw new Error('Failed to fetch announcements');
        }
        const data = await response.json();
        // Sort announcements by date in descending order (newest first)
        const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setAnnouncements(sortedData); // Store the sorted data in the state
      } catch (err) {
        setError(err.message); // Handle errors
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchAnnouncements();
  }, []); // Empty dependency array so it only runs once when the component mounts

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl font-bold text-gray-900">Announcements</h1>
        <p className="text-gray-600 mt-2">
          Stay updated with the latest news and announcements from PropertyCenter
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        {loading ? (
          <div className="text-center">Loading announcements...</div>
        ) : error ? (
          <div className="bg-red-100 p-4 rounded-md text-red-700">
            Error: {error}
          </div>
        ) : announcements.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {announcements.map((announcement, index) => (
              <motion.div
                key={announcement._id} // Updated to use _id
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <AnnouncementCard announcement={announcement} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No announcements available
            </h3>
            <p className="text-gray-600">
              Check back later for updates and news.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnnouncementsPage;