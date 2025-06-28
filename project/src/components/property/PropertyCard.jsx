// // // // components/property/PropertyCard.jsx


// import React from 'react';

// const PropertyCard = ({ property }) => {
//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-sm mx-auto">
//       {/* Image container with fixed height and aspect ratio */}
//       <div className="relative w-full h-64 overflow-hidden">
//         {property.images && property.images.length > 0 ? (
//           <img
//             src={property.images[0]}  // Show the first image as a primary image
//             alt={property.type || 'Property Image'}
//             className="absolute inset-0 w-full h-full object-cover"
//             style={{ objectPosition: 'center center' }}
//           />
//         ) : (
//           <div className="w-full h-full flex items-center justify-center text-gray-400">No Image Available</div>
//         )}
//       </div>

//       {/* Property details */}
//       <div className="p-4">
//         <h2 className="text-xl font-semibold text-gray-900">{property.type}</h2>
//         <p className="text-gray-700">{property.city}</p>
//         <p className="text-gray-700">{property.address}</p>
//         <p className="text-gray-900 font-bold mt-2">PKR {property.price.toLocaleString()}</p>
//         <p className="text-gray-600 text-sm mt-1">
//           Size: {(property.size / 272.25).toFixed(2)} Marla | Bedrooms: {property.bedrooms} | Bathrooms: {property.bathrooms}
//         </p>

//         {/* Display additional images */}
//         <div className="mt-4 grid grid-cols-4 gap-2">
//           {property.images && property.images.length > 1 && (
//             property.images.slice(1).map((imageUrl, index) => (
//               <div key={index} className="w-full">
//                 <img
//                   src={imageUrl}
//                   alt={`Additional Image ${index + 2}`}
//                   className="w-full h-24 object-cover rounded-md"
//                 />
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PropertyCard;







import React, { useState } from 'react';

const PropertyCard = ({ property }) => {
  const [selectedImage, setSelectedImage] = useState(null); // State to track clicked image

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl); // Set the clicked image as the selected image to show in the modal
  };

  const closeModal = () => {
    setSelectedImage(null); // Close the modal by resetting selected image
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-sm mx-auto">
      {/* Image container with fixed height and aspect ratio */}
      <div className="relative w-full h-64 overflow-hidden">
        {property.images && property.images.length > 0 ? (
          <img
            src={property.images[0]}  // Show the first image as a primary image
            alt={property.type || 'Property Image'}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: 'center center' }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">No Image Available</div>
        )}
      </div>

      {/* Property details */}
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-900">{property.type}</h2>
        <p className="text-gray-700">{property.city}</p>
        <p className="text-gray-700">{property.address}</p>
        <p className="text-gray-900 font-bold mt-2">PKR {property.price.toLocaleString()}</p>
        <p className="text-gray-600 text-sm mt-1">
          Size: {(property.size / 272.25).toFixed(2)} Marla | Bedrooms: {property.bedrooms} | Bathrooms: {property.bathrooms}
        </p>

        {/* Display additional images */}
        <div className="mt-4 grid grid-cols-4 gap-2">
          {property.images && property.images.length > 1 && (
            property.images.slice(1).map((imageUrl, index) => (
              <div key={index} className="w-full h-24">
                <img
                  src={imageUrl}
                  alt={`Additional Image ${index + 2}`}
                  className="w-full h-full object-cover rounded-md cursor-pointer"
                  onClick={() => handleImageClick(imageUrl)} // Handle image click
                />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal for viewing larger image */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white p-4">
            <img
              src={selectedImage}
              alt="Selected Property"
              className="max-w-4xl max-h-80 object-contain"
            />
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 bg-gray-800 text-white p-2 rounded-full"
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyCard;
