// // pages/admin/BuyListings.jsx



import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import Button from '../../components/ui/Button.jsx';
import { formatCurrency } from '../../utils/format.js';

const BuyListings = () => {
  const [listings, setListings] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [error, setError] = useState(''); // Added error state for user feedback

  // Fetch listings from the server
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/properties');
        if (!response.ok) {
          throw new Error('Failed to fetch properties');
        }
        const data = await response.json();
        setListings(data);
      } catch (error) {
        console.error('Error fetching properties:', error);
        setError('Failed to load properties. Please try again later.');
      }
    };

    fetchListings();
  }, []);

  const handleDeleteClick = (id) => {
    setDeleteConfirmation(id);
    setError(''); // Clear any previous errors
  };

  const confirmDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/properties/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete property');
      }

      setListings((prev) => prev.filter((property) => property._id !== id));
      setDeleteConfirmation(null);
    } catch (error) {
      console.error('Error deleting property:', error);
      setError(error.message || 'Failed to delete property. Please try again.');
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmation(null);
    setError('');
  };

  return (
    <div className="px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center mb-6"
      >
        <h1 className="text-2xl font-bold text-gray-900">Buy Listings</h1>
        <p className="text-gray-600">Total: {listings.length} properties</p>
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6"
        >
          <span>{error}</span>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Property
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {listings.map((property) => (
                  <tr key={property._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-16 w-16 flex-shrink-0">
                          <img
                            className="h-16 w-16 object-cover rounded"
                            src={property.images[0] || '/placeholder-image.jpg'} // Fallback image
                            alt={property.type}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{property.type}</div>
                          <div className="text-sm text-gray-500">ID: {property._id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{property.city}</div>
                      <div className="text-sm text-gray-500">{property.address}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">{formatCurrency(property.price)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{(property.size / 272.25).toFixed(2)} marla</div>
                      {property.bedrooms > 0 && (
                        <div className="text-sm text-gray-500">
                          {property.bedrooms} bed, {property.bathrooms} bath
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(property.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {deleteConfirmation === property._id ? (
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={cancelDelete}>
                            Cancel
                          </Button>
                          <Button
                            variant="primary"
                            size="sm"
                            className="bg-red-600 hover:bg-red-700"
                            onClick={() => confirmDelete(property._id)}
                          >
                            Confirm
                          </Button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleDeleteClick(property._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BuyListings;