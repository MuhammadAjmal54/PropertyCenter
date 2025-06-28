// // pages/admin/ManageAnnouncements.jsx



import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit } from 'lucide-react';
import Button from '../../components/ui/Button.jsx';

const ManageAnnouncements = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    createdBy: 'Admin', // Default value
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [announcementsList, setAnnouncementsList] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Fetch announcements when component mounts
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/announcements');
        if (!response.ok) {
          throw new Error('Failed to fetch announcements');
        }
        const data = await response.json();
        setAnnouncementsList(data); // Set the announcements list from database
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };

    fetchAnnouncements();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      // Update existing announcement
      try {
        const response = await fetch(`http://localhost:5000/api/announcements/${editingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error('Failed to update announcement');
        }

        const updatedAnnouncement = await response.json();
        setAnnouncementsList((prev) =>
          prev.map((item) => (item._id === updatedAnnouncement._id ? updatedAnnouncement : item))
        );
        setIsModalOpen(false);
        setEditingId(null); // Clear editing state
        setFormData({ title: '', content: '', createdBy: 'Admin' });
      } catch (error) {
        console.error('Error updating announcement:', error);
      }
    } else {
      // Create new announcement
      try {
        const response = await fetch('http://localhost:5000/api/announcements', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error('Failed to create announcement');
        }

        const newAnnouncement = await response.json();
        setAnnouncementsList((prev) => [newAnnouncement, ...prev]);
        setFormData({ title: '', content: '', createdBy: 'Admin' });
        setIsModalOpen(false);
      } catch (error) {
        console.error('Error creating announcement:', error);
      }
    }
  };

  const handleEditClick = (announcement) => {
    setEditingId(announcement._id);
    setFormData({
      title: announcement.title,
      content: announcement.content,
      createdBy: announcement.createdBy,
    });
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/announcements/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete announcement');
      }

      setAnnouncementsList((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error('Error deleting announcement:', error);
    }
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center mb-6"
      >
        <h1 className="text-2xl font-bold text-gray-900">Manage Announcements</h1>
        <Button variant="primary" onClick={() => setIsModalOpen(true)} className="flex items-center">
          <Plus className="w-5 h-5 mr-1" />
          New Announcement
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Content
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {announcementsList.map((announcement) => (
                <tr key={announcement._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {announcement.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {announcement.content}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(announcement.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEditClick(announcement)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(announcement._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {editingId ? 'Edit Announcement' : 'Add New Announcement'}
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Title*</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Content*</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  rows={5}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  required
                ></textarea>
              </div>

              <div className="flex justify-end space-x-3">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  {editingId ? 'Update' : 'Add'} Announcement
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ManageAnnouncements;