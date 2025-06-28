// components/property/PropertyFilters.jsx
import React from 'react';
import Button from '../ui/Button';

const PropertyFilters = ({ filters, onFilterChange, onReset }) => {
  const propertyTypes = ['House', 'Flat', 'Building', 'Land', 'Commercial Land'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="font-bold text-lg text-gray-800 mb-4">Filter Properties</h2>

      <div className="space-y-4">
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
            Property Type
          </label>
          <select
            id="type"
            name="type"
            value={filters.type}
            onChange={handleChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">All Types</option>
            {propertyTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {(filters.type === 'House' || filters.type === 'Flat' || filters.type === '') && (
          <>
            <div>
              <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-1">
                Bedrooms
              </label>
              <select
                id="bedrooms"
                name="bedrooms"
                value={filters.bedrooms}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
              </select>
            </div>

            <div>
              <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700 mb-1">
                Bathrooms
              </label>
              <select
                id="bathrooms"
                name="bathrooms"
                value={filters.bathrooms}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>
          </>
        )}

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label htmlFor="minSize" className="block text-sm font-medium text-gray-700 mb-1">
              Min Size (marla)
            </label>
            <select
              id="minSize"
              name="minSize"
              value={filters.minSize}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Any</option>
              <option value="5">5+</option>
              <option value="10">10+</option>
              <option value="15">15+</option>
              <option value="20">20+</option>
              <option value="30">30+</option>
            </select>
          </div>

          <div>
            <label htmlFor="maxSize" className="block text-sm font-medium text-gray-700 mb-1">
              Max Size (marla)
            </label>
            <select
              id="maxSize"
              name="maxSize"
              value={filters.maxSize}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Any</option>
              <option value="10">Up to 10</option>
              <option value="15">Up to 15</option>
              <option value="20">Up to 20</option>
              <option value="30">Up to 30</option>
              <option value="50">Up to 50</option>
            </select>
          </div>
        </div>

        <div className="pt-2">
          <Button variant="outline" fullWidth onClick={onReset}>
            Reset Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PropertyFilters;
