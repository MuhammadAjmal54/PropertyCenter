// // // pages/user/BuyPage.jsx



import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PropertyCard from '../../components/property/PropertyCard.jsx';

const BuyPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [filters, setFilters] = useState({
    type: '',
    city: '',
    bedrooms: '',
    bathrooms: '',
    minSize: '',  // Marla
    maxSize: '',  // Marla
    minPrice: '',
    maxPrice: '',
  });

  const handleFilterChange = (name, value) => {
    setFilters({ ...filters, [name]: value });
  };

  const resetFilters = () => {
    setFilters({
      type: '',
      city: '',
      bedrooms: '',
      bathrooms: '',
      minSize: '',
      maxSize: '',
      minPrice: '',
      maxPrice: '',
    });
  };

  // Helper to build query string from filters
  const buildQueryString = (filters) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== '') {
        params.append(key, value);
      }
    });
    return params.toString();
  };

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      setError('');
      try {
        const filtersWithSizeInSqft = { ...filters };
        if (filters.minSize) {
          filtersWithSizeInSqft.minSize = (parseFloat(filters.minSize) * 272.25).toFixed(2);
        }
        if (filters.maxSize) {
          filtersWithSizeInSqft.maxSize = (parseFloat(filters.maxSize) * 272.25).toFixed(2);
        }

        const queryString = buildQueryString(filtersWithSizeInSqft);
        const url = `http://localhost:5000/api/properties?${queryString}`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch properties');
        }
        const data = await response.json();
        setProperties(data);
      } catch (err) {
        setError(err.message || 'Error loading properties');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [filters]);

  // Cities of Pakistan
  const citiesOfPakistan = [
    'Karachi', 'Lahore', 'Islamabad', 'Sargodha', 'Rawalpindi', 'Faisalabad',
    'Multan', 'Peshawar', 'Quetta', 'Sialkot', 'Gujranwala', 'Hyderabad',
    'Sukkur', 'Mardan', 'Bahawalpur', 'Dera Ghazi Khan', 'Murree', 'Gujrat',
    'Larkana', 'Khuzdar', 'Chiniot',
  ];

  // Property Types
  const propertyTypes = ['House', 'Flat', 'Building', 'Land', 'Commercial Land'];

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Properties for Sale</h1>
        <p className="text-gray-600 mt-2">Browse our curated selection of properties available for purchase</p>
      </motion.div>

      {/* Filters at the top */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-4 justify-start">
          <div className="flex items-center">
            <label htmlFor="type" className="mr-2 text-sm text-gray-600">Type</label>
            <select
              id="type"
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              className="px-4 py-2 border rounded-md"
            >
              <option value="">All Types</option>
              {propertyTypes.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center">
            <label htmlFor="city" className="mr-2 text-sm text-gray-600">City</label>
            <select
              id="city"
              value={filters.city}
              onChange={(e) => handleFilterChange('city', e.target.value)}
              className="px-4 py-2 border rounded-md"
            >
              <option value="">All Cities</option>
              {citiesOfPakistan.map((city, index) => (
                <option key={index} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center">
            <label htmlFor="bedrooms" className="mr-2 text-sm text-gray-600">Bedrooms</label>
            <input
              id="bedrooms"
              type="number"
              value={filters.bedrooms}
              onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
              className="px-4 py-2 border rounded-md"
              placeholder="Enter number of bedrooms"
              min={0}
            />
          </div>

          <div className="flex items-center">
            <label htmlFor="bathrooms" className="mr-2 text-sm text-gray-600">Bathrooms</label>
            <input
              id="bathrooms"
              type="number"
              value={filters.bathrooms}
              onChange={(e) => handleFilterChange('bathrooms', e.target.value)}
              className="px-4 py-2 border rounded-md"
              placeholder="Enter number of bathrooms"
              min={0}
            />
          </div>

          <div className="flex items-center">
            <label htmlFor="minSize" className="mr-2 text-sm text-gray-600">Min Size (Marla)</label>
            <input
              id="minSize"
              type="number"
              value={filters.minSize}
              onChange={(e) => handleFilterChange('minSize', e.target.value)}
              className="px-4 py-2 border rounded-md"
              placeholder="Enter minimum size"
              min={0}
            />
          </div>

          <div className="flex items-center">
            <label htmlFor="maxSize" className="mr-2 text-sm text-gray-600">Max Size (Marla)</label>
            <input
              id="maxSize"
              type="number"
              value={filters.maxSize}
              onChange={(e) => handleFilterChange('maxSize', e.target.value)}
              className="px-4 py-2 border rounded-md"
              placeholder="Enter maximum size"
              min={0}
            />
          </div>

          <div className="flex items-center">
            <label htmlFor="minPrice" className="mr-2 text-sm text-gray-600">Min Price</label>
            <input
              id="minPrice"
              type="number"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              className="px-4 py-2 border rounded-md"
              placeholder="Enter minimum price"
              min={0}
            />
          </div>

          <div className="flex items-center">
            <label htmlFor="maxPrice" className="mr-2 text-sm text-gray-600">Max Price</label>
            <input
              id="maxPrice"
              type="number"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              className="px-4 py-2 border rounded-md"
              placeholder="Enter maximum price"
              min={0}
            />
          </div>

          <button
            onClick={resetFilters}
            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Display the filtered properties */}
      {loading && <p>Loading properties...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.length > 0 ? (
            properties.map((property, index) => (
              <motion.div
                key={property._id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <PropertyCard property={property} />
              </motion.div>
            ))
          ) : (
            <div className="bg-white p-8 rounded-lg shadow text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
              <p className="text-gray-600">Try adjusting your filters to see more results.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BuyPage;
