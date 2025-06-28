// // // // // pages/Admin/AddSellingProperty.jsx



// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Upload } from 'lucide-react';
// import Button from '../../components/ui/Button.jsx';

// const SellPage = () => {
//   const [formData, setFormData] = useState({
//     city: '',
//     address: '',
//     price: '',
//     size: '',
//     type: '',
//     bedrooms: '',
//     bathrooms: '',
//     images: [], // This will store multiple images
//     username: '',
//     email: '',
//     phoneNumber: ''
//   });

//   const [preview, setPreview] = useState([]); // To store previews for all images
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [imageError, setImageError] = useState('');

//   const propertyTypes = ['House', 'Flat', 'Building', 'Land', 'Commercial Land'];

//   // Handle changes to the input fields (excluding images)
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle image file changes
//   const handleImageChange = (e, index) => {
//     const files = e.target.files;
//     if (files.length > 0) {
//       const newImages = [...formData.images];
//       newImages[index] = files[0]; // Store image at the correct index
//       setFormData({ ...formData, images: newImages });

//       const newPreviews = [...preview];
//       newPreviews[index] = URL.createObjectURL(files[0]); // Set preview at the correct index
//       setPreview(newPreviews);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setErrorMessage('');
//     setSuccessMessage('');
//     setImageError('');

//     // Check if at least the first image is uploaded
//     if (!formData.images[0]) {
//       setImageError('At least one image is required.');
//       setIsSubmitting(false);
//       return;
//     }

//     // Prepare form data for sending multipart/form-data
//     const data = new FormData();
//     Object.entries(formData).forEach(([key, value]) => {
//       if (value !== null && value !== '') {
//         if (key === 'images') {
//           value.forEach((file) => data.append('images', file)); // Append all images
//         } else {
//           data.append(key, value);
//         }
//       }
//     });

//     try {
//       const response = await fetch('http://localhost:5000/api/properties', {
//         method: 'POST',
//         body: data,
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         setErrorMessage(errorData.message || 'Failed to list property');
//       } else {
//         setSuccessMessage('Your property has been successfully listed for sale!');
//         setFormData({
//           city: '',
//           address: '',
//           price: '',
//           size: '',
//           type: '',
//           bedrooms: '',
//           bathrooms: '',
//           images: [],
//           username: '',
//           email: '',
//           phoneNumber: ''
//         });
//         setPreview([]); // Reset previews
//       }
//     } catch (error) {
//       setErrorMessage('Network error. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="mb-8 text-center"
//       >
//         <h1 className="text-3xl font-bold text-gray-900">Sell Your Property</h1>
//         <p className="text-gray-600 mt-2">Fill out the form below to list your property for sale</p>
//       </motion.div>

//       {successMessage && (
//         <motion.div
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6"
//         >
//           <span>{successMessage}</span>
//         </motion.div>
//       )}

//       {errorMessage && (
//         <motion.div
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6"
//         >
//           <span>{errorMessage}</span>
//         </motion.div>
//       )}

//       {imageError && (
//         <motion.div
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-6"
//         >
//           <span>{imageError}</span>
//         </motion.div>
//       )}

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: 0.2 }}
//         className="bg-white rounded-lg shadow-md p-6 md:p-8 max-w-3xl mx-auto"
//       >
//         <form onSubmit={handleSubmit} encType="multipart/form-data">
//           {/* Image upload */}
//           <div className="mb-6">
//             <label className="block text-gray-700 text-sm font-bold mb-2">Property Images</label>

//             {/* Image 1 (Compulsory) */}
//             <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
//               {preview[0] ? (
//                 <div className="space-y-2">
//                   <img src={preview[0]} alt="Property Image 1" className="mx-auto h-64 w-full object-cover rounded" />
//                 </div>
//               ) : (
//                 <div className="space-y-1 text-center">
//                   <Upload className="mx-auto h-12 w-12 text-gray-400" />
//                   <div className="flex text-sm text-gray-600">
//                     <label
//                       htmlFor="image-upload-1"
//                       className="relative cursor-pointer bg-white rounded-md font-medium text-blue-900 hover:text-blue-800"
//                     >
//                       <span>Upload first image</span>
//                       <input
//                         id="image-upload-1"
//                         name="images"
//                         type="file"
//                         className="sr-only"
//                         accept="image/*"
//                         onChange={(e) => handleImageChange(e, 0)}
//                         required
//                       />
//                     </label>
//                     <p className="pl-1">or drag and drop</p>
//                   </div>
//                   <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
//                 </div>
//               )}
//             </div>

//             {/* Image 2 to Image 5 (Optional) */}
//             {[1, 2, 3, 4].map((index) => (
//               <div key={index} className="mt-4 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
//                 {preview[index] ? (
//                   <div className="space-y-2">
//                     <img src={preview[index]} alt={`Property Image ${index + 1}`} className="mx-auto h-64 w-full object-cover rounded" />
//                   </div>
//                 ) : (
//                   <div className="space-y-1 text-center">
//                     <Upload className="mx-auto h-12 w-12 text-gray-400" />
//                     <div className="flex text-sm text-gray-600">
//                       <label
//                         htmlFor={`image-upload-${index + 1}`}
//                         className="relative cursor-pointer bg-white rounded-md font-medium text-blue-900 hover:text-blue-800"
//                       >
//                         <span>Upload image {index + 1}</span>
//                         <input
//                           id={`image-upload-${index + 1}`}
//                           name="images"
//                           type="file"
//                           className="sr-only"
//                           accept="image/*"
//                           onChange={(e) => handleImageChange(e, index)}
//                         />
//                       </label>
//                       <p className="pl-1">or drag and drop</p>
//                     </div>
//                     <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* Other fields */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Property Fields */}
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2">City*</label>
//               <input
//                 className="shadow border rounded w-full py-2 px-3 text-gray-700"
//                 type="text"
//                 name="city"
//                 value={formData.city}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>

//             {/* Property Type */}
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2">Property Type*</label>
//               <select
//                 className="shadow border rounded w-full py-2 px-3 text-gray-700"
//                 name="type"
//                 value={formData.type}
//                 onChange={handleInputChange}
//                 required
//               >
//                 <option value="">Select Type</option>
//                 {propertyTypes.map((type) => (
//                   <option key={type} value={type}>
//                     {type}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Price */}
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2">Price (PKR)*</label>
//               <input
//                 className="shadow border rounded w-full py-2 px-3 text-gray-700"
//                 type="number"
//                 name="price"
//                 value={formData.price}
//                 onChange={handleInputChange}
//                 min="0"
//                 required
//               />
//             </div>

//             {/* Size */}
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2">Size (marla)*</label>
//               <input
//                 className="shadow border rounded w-full py-2 px-3 text-gray-700"
//                 type="number"
//                 name="size"
//                 value={formData.size}
//                 onChange={handleInputChange}
//                 min="0"
//                 required
//               />
//             </div>

//             {/* Bedrooms */}
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2">Bedrooms</label>
//               <input
//                 className="shadow border rounded w-full py-2 px-3 text-gray-700"
//                 type="number"
//                 name="bedrooms"
//                 value={formData.bedrooms}
//                 onChange={handleInputChange}
//                 min="0"
//               />
//             </div>

//             {/* Bathrooms */}
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2">Bathrooms</label>
//               <input
//                 className="shadow border rounded w-full py-2 px-3 text-gray-700"
//                 type="number"
//                 name="bathrooms"
//                 value={formData.bathrooms}
//                 onChange={handleInputChange}
//                 min="0"
//               />
//             </div>
//           </div>

//           {/* User Information */}
//           <div className="mb-6">
//             <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
//             <input
//               className="shadow border rounded w-full py-2 px-3 text-gray-700"
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleInputChange}
//               required
//             />
//           </div>

//           <div className="mb-6">
//             <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
//             <input
//               className="shadow border rounded w-full py-2 px-3 text-gray-700"
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               required
//             />
//           </div>

//           <div className="mb-6">
//             <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
//             <input
//               className="shadow border rounded w-full py-2 px-3 text-gray-700"
//               type="tel"
//               name="phoneNumber"
//               value={formData.phoneNumber}
//               onChange={handleInputChange}
//               required
//             />
//           </div>

//           <div className="mb-6">
//             <label className="block text-gray-700 text-sm font-bold mb-2">Address*</label>
//             <textarea
//               className="shadow border rounded w-full py-2 px-3 text-gray-700"
//               name="address"
//               value={formData.address}
//               onChange={handleInputChange}
//               rows={3}
//               required
//             ></textarea>
//           </div>

//           <div className="flex justify-center">
//             <Button
//               type="submit"
//               variant="primary"
//               size="lg"
//               className="w-full sm:w-auto px-8"
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? 'Submitting...' : 'List My Property'}
//             </Button>
//           </div>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// export default SellPage;













// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Upload } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import Button from '../../components/ui/Button.jsx';

// const AddSellingProperty = () => {
//   const [formData, setFormData] = useState({
//     city: '',
//     address: '',
//     price: '',
//     size: '',
//     type: '',
//     bedrooms: '',
//     bathrooms: '',
//     images: [], // This will store multiple images
//     username: '',
//     email: '',
//     phoneNumber: ''
//   });

//   const [preview, setPreview] = useState([]); // To store previews for all images
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [imageError, setImageError] = useState('');
//   const navigate = useNavigate();

//   const propertyTypes = ['House', 'Flat', 'Building', 'Land', 'Commercial Land'];

//   // Handle changes to the input fields (excluding images)
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle image file changes
//   const handleImageChange = (e, index) => {
//     const files = e.target.files;
//     if (files.length > 0) {
//       const newImages = [...formData.images];
//       newImages[index] = files[0]; // Store image at the correct index
//       setFormData({ ...formData, images: newImages });

//       const newPreviews = [...preview];
//       newPreviews[index] = URL.createObjectURL(files[0]); // Set preview at the correct index
//       setPreview(newPreviews);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setErrorMessage('');
//     setImageError('');

//     // Check if at least the first image is uploaded
//     if (!formData.images[0]) {
//       setImageError('At least one image is required.');
//       setIsSubmitting(false);
//       return;
//     }

//     // Prepare form data for sending multipart/form-data
//     const data = new FormData();
//     Object.entries(formData).forEach(([key, value]) => {
//       if (value !== null && value !== '') {
//         if (key === 'images') {
//           value.forEach((file) => data.append('images', file)); // Append all images
//         } else {
//           data.append(key, value);
//         }
//       }
//     });

//     try {
//       const response = await fetch('http://localhost:5000/api/properties', {
//         method: 'POST',
//         body: data,
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         setErrorMessage(errorData.message || 'Failed to list property');
//       } else {
//         setFormData({
//           city: '',
//           address: '',
//           price: '',
//           size: '',
//           type: '',
//           bedrooms: '',
//           bathrooms: '',
//           images: [],
//           username: '',
//           email: '',
//           phoneNumber: ''
//         });
//         setPreview([]); // Reset previews
//         navigate('/admin/sell', { state: { successMessage: 'Your property has been successfully listed for sale!' } });
//       }
//     } catch (error) {
//       setErrorMessage('Network error. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="mb-8 text-center"
//       >
//         <h1 className="text-3xl font-bold text-gray-900">Sell Your Property</h1>
//         <p className="text-gray-600 mt-2">Fill out the form below to list your property for sale</p>
//       </motion.div>

//       {errorMessage && (
//         <motion.div
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6"
//         >
//           <span>{errorMessage}</span>
//         </motion.div>
//       )}

//       {imageError && (
//         <motion.div
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-6"
//         >
//           <span>{imageError}</span>
//         </motion.div>
//       )}

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: 0.2 }}
//         className="bg-white rounded-lg shadow-md p-6 md:p-8 max-w-3xl mx-auto"
//       >
//         <form onSubmit={handleSubmit} encType="multipart/form-data">
//           {/* Image upload */}
//           <div className="mb-6">
//             <label className="block text-gray-700 text-sm font-bold mb-2">Property Images</label>

//             {/* Image 1 (Compulsory) */}
//             <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
//               {preview[0] ? (
//                 <div className="space-y-2">
//                   <img src={preview[0]} alt="Property Image 1" className="mx-auto h-64 w-full object-cover rounded" />
//                 </div>
//               ) : (
//                 <div className="space-y-1 text-center">
//                   <Upload className="mx-auto h-12 w-12 text-gray-400" />
//                   <div className="flex text-sm text-gray-600">
//                     <label
//                       htmlFor="image-upload-1"
//                       className="relative cursor-pointer bg-white rounded-md font-medium text-blue-900 hover:text-blue-800"
//                     >
//                       <span>Upload first image</span>
//                       <input
//                         id="image-upload-1"
//                         name="images"
//                         type="file"
//                         className="sr-only"
//                         accept="image/*"
//                         onChange={(e) => handleImageChange(e, 0)}
//                         required
//                       />
//                     </label>
//                     <p className="pl-1">or drag and drop</p>
//                   </div>
//                   <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
//                 </div>
//               )}
//             </div>

//             {/* Image 2 to Image 5 (Optional) */}
//             {[1, 2, 3, 4].map((index) => (
//               <div key={index} className="mt-4 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
//                 {preview[index] ? (
//                   <div className="space-y-2">
//                     <img src={preview[index]} alt={`Property Image ${index + 1}`} className="mx-auto h-64 w-full object-cover rounded" />
//                   </div>
//                 ) : (
//                   <div className="space-y-1 text-center">
//                     <Upload className="mx-auto h-12 w-12 text-gray-400" />
//                     <div className="flex text-sm text-gray-600">
//                       <label
//                         htmlFor={`image-upload-${index + 1}`}
//                         className="relative cursor-pointer bg-white rounded-md font-medium text-blue-900 hover:text-blue-800"
//                       >
//                         <span>Upload image {index + 1}</span>
//                         <input
//                           id={`image-upload-${index + 1}`}
//                           name="images"
//                           type="file"
//                           className="sr-only"
//                           accept="image/*"
//                           onChange={(e) => handleImageChange(e, index)}
//                         />
//                       </label>
//                       <p className="pl-1">or drag and drop</p>
//                     </div>
//                     <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* Other fields */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Property Fields */}
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2">City*</label>
//               <input
//                 className="shadow border rounded w-full py-2 px-3 text-gray-700"
//                 type="text"
//                 name="city"
//                 value={formData.city}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>

//             {/* Property Type */}
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2">Property Type*</label>
//               <select
//                 className="shadow border rounded w-full py-2 px-3 text-gray-700"
//                 name="type"
//                 value={formData.type}
//                 onChange={handleInputChange}
//                 required
//               >
//                 <option value="">Select Type</option>
//                 {propertyTypes.map((type) => (
//                   <option key={type} value={type}>
//                     {type}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Price */}
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2">Price (PKR)*</label>
//               <input
//                 className="shadow border rounded w-full py-2 px-3 text-gray-700"
//                 type="number"
//                 name="price"
//                 value={formData.price}
//                 onChange={handleInputChange}
//                 min="0"
//                 required
//               />
//             </div>

//             {/* Size */}
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2">Size (marla)*</label>
//               <input
//                 className="shadow border rounded w-full py-2 px-3 text-gray-700"
//                 type="number"
//                 name="size"
//                 value={formData.size}
//                 onChange={handleInputChange}
//                 min="0"
//                 required
//               />
//             </div>

//             {/* Bedrooms */}
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2">Bedrooms</label>
//               <input
//                 className="shadow border rounded w-full py-2 px-3 text-gray-700"
//                 type="number"
//                 name="bedrooms"
//                 value={formData.bedrooms}
//                 onChange={handleInputChange}
//                 min="0"
//               />
//             </div>

//             {/* Bathrooms */}
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2">Bathrooms</label>
//               <input
//                 className="shadow border rounded w-full py-2 px-3 text-gray-700"
//                 type="number"
//                 name="bathrooms"
//                 value={formData.bathrooms}
//                 onChange={handleInputChange}
//                 min="0"
//               />
//             </div>
//           </div>

//           {/* User Information */}
//           <div className="mb-6">
//             <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
//             <input
//               className="shadow border rounded w-full py-2 px-3 text-gray-700"
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleInputChange}
//               required
//             />
//           </div>

//           <div className="mb-6">
//             <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
//             <input
//               className="shadow border rounded w-full py-2 px-3 text-gray-700"
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               required
//             />
//           </div>

//           <div className="mb-6">
//             <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
//             <input
//               className="shadow border rounded w-full py-2 px-3 text-gray-700"
//               type="tel"
//               name="phoneNumber"
//               value={formData.phoneNumber}
//               onChange={handleInputChange}
//               required
//             />
//           </div>

//           <div className="mb-6">
//             <label className="block text-gray-700 text-sm font-bold mb-2">Address*</label>
//             <textarea
//               className="shadow border rounded w-full py-2 px-3 text-gray-700"
//               name="address"
//               value={formData.address}
//               onChange={handleInputChange}
//               rows={3}
//               required
//             ></textarea>
//           </div>

//           <div className="flex justify-center">
//             <Button
//               type="submit"
//               variant="primary"
//               size="lg"
//               className="w-full sm:w-auto px-8"
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? 'Submitting...' : 'List My Property'}
//             </Button>
//           </div>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// export default AddSellingProperty;


















import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button.jsx';

const AddSellingProperty = () => {
  const [formData, setFormData] = useState({
    city: '',
    address: '',
    price: '',
    size: '',
    type: '',
    bedrooms: '',
    bathrooms: '',
    images: [],
    username: '',
    email: '',
    phoneNumber: ''
  });

  const [preview, setPreview] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({
    city: '',
    username: '',
    price: '',
    size: '',
    bedrooms: '',
    bathrooms: '',
    phoneNumber: '',
    images: '',
    general: ''
  });

  const navigate = useNavigate();
  const propertyTypes = ['House', 'Flat', 'Building', 'Land', 'Commercial Land'];

  // Validation regex
  const alphaRegex = /^[a-zA-Z\s]*$/; // Letters and spaces only
  const numberRegex = /^\d*\.?\d*$/; // Integers or floats
  const integerRegex = /^\d*$/; // Digits only

  // Validate individual field
  const validateField = (name, value) => {
    switch (name) {
      case 'city':
        return alphaRegex.test(value) ? '' : 'City can only contain letters and spaces';
      case 'username':
        return alphaRegex.test(value) ? '' : 'Username can only contain letters and spaces';
      case 'price':
        return numberRegex.test(value) ? '' : 'Price must be a number (e.g., 1000000 or 1000000.50)';
      case 'size':
        return numberRegex.test(value) ? '' : 'Size must be a number (e.g., 5 or 5.5)';
      case 'bedrooms':
        return value === '' || numberRegex.test(value) ? '' : 'Bedrooms must be a number';
      case 'bathrooms':
        return value === '' || numberRegex.test(value) ? '' : 'Bathrooms must be a number';
      case 'phoneNumber':
        return integerRegex.test(value) ? '' : 'Phone number must contain only digits';
      default:
        return '';
    }
  };

  // Handle input changes with validation
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setFormErrors((prev) => ({ ...prev, [name]: error }));

    // Update formData only if valid or empty
    if (error === '' || value === '') {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle image file changes
  const handleImageChange = (e, index) => {
    const files = e.target.files;
    if (files.length > 0) {
      const newImages = [...formData.images];
      newImages[index] = files[0];
      setFormData({ ...formData, images: newImages });

      const newPreviews = [...preview];
      newPreviews[index] = URL.createObjectURL(files[0]);
      setPreview(newPreviews);

      // Clear images error if first image is uploaded
      if (index === 0) {
        setFormErrors((prev) => ({ ...prev, images: '' }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormErrors((prev) => ({ ...prev, general: '', images: '' }));

    // Validate all fields
    const errors = {
      city: validateField('city', formData.city),
      username: validateField('username', formData.username),
      price: validateField('price', formData.price),
      size: validateField('size', formData.size),
      bedrooms: validateField('bedrooms', formData.bedrooms),
      bathrooms: validateField('bathrooms', formData.bathrooms),
      phoneNumber: validateField('phoneNumber', formData.phoneNumber),
      images: formData.images[0] ? '' : 'At least one image is required'
    };

    setFormErrors(errors);

    // Check for errors
    const hasErrors = Object.values(errors).some((error) => error !== '');
    if (hasErrors) {
      setIsSubmitting(false);
      return;
    }

    // Prepare form data
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== '') {
        if (key === 'images') {
          value.forEach((file) => data.append('images', file));
        } else {
          data.append(key, value);
        }
      }
    });

    try {
      const response = await fetch('http://localhost:5000/api/properties', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        const errorData = await response.json();
        setFormErrors((prev) => ({ ...prev, general: errorData.message || 'Failed to list property' }));
      } else {
        setFormData({
          city: '',
          address: '',
          price: '',
          size: '',
          type: '',
          bedrooms: '',
          bathrooms: '',
          images: [],
          username: '',
          email: '',
          phoneNumber: ''
        });
        setPreview([]);
        navigate('/admin/sell', { state: { successMessage: 'Your property has been successfully listed for sale!' } });
      }
    } catch (error) {
      setFormErrors((prev) => ({ ...prev, general: 'Network error. Please try again.' }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900">Sell Your Property</h1>
        <p className="text-gray-600 mt-2">Fill out the form below to list your property for sale</p>
      </motion.div>

      {formErrors.general && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6"
        >
          <span>{formErrors.general}</span>
        </motion.div>
      )}

      {formErrors.images && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-6"
        >
          <span>{formErrors.images}</span>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-lg shadow-md p-6 md:p-8 max-w-3xl mx-auto"
      >
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Image upload */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Property Images</label>

            {/* Image 1 (Compulsory) */}
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              {preview[0] ? (
                <div className="space-y-2">
                  <img src={preview[0]} alt="Property Image 1" className="mx-auto h-64 w-full object-cover rounded" />
                </div>
              ) : (
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="image-upload-1"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-900 hover:text-blue-800"
                    >
                      <span>Upload first image</span>
                      <input
                        id="image-upload-1"
                        name="images"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, 0)}
                        required
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              )}
            </div>
            {formErrors.images && (
              <p className="text-yellow-700 text-sm mt-1">{formErrors.images}</p>
            )}

            {/* Image 2 to Image 5 (Optional) */}
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className="mt-4 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                {preview[index] ? (
                  <div className="space-y-2">
                    <img src={preview[index]} alt={`Property Image ${index + 1}`} className="mx-auto h-64 w-full object-cover rounded" />
                  </div>
                ) : (
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor={`image-upload-${index + 1}`}
                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-900 hover:text-blue-800"
                      >
                        <span>Upload image {index + 1}</span>
                        <input
                          id={`image-upload-${index + 1}`}
                          name="images"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={(e) => handleImageChange(e, index)}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Other fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* City */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">City*</label>
              <input
                className="shadow border rounded w-full py-2 px-3 text-gray-700"
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
              {formErrors.city && (
                <p className="text-red-600 text-sm mt-1">{formErrors.city}</p>
              )}
            </div>

            {/* Property Type */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Property Type*</label>
              <select
                className="shadow border rounded w-full py-2 px-3 text-gray-700"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Type</option>
                {propertyTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Price (PKR)*</label>
              <input
                className="shadow border rounded w-full py-2 px-3 text-gray-700"
                type="text"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
              {formErrors.price && (
                <p className="text-red-600 text-sm mt-1">{formErrors.price}</p>
              )}
            </div>

            {/* Size */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Size (marla)*</label>
              <input
                className="shadow border rounded w-full py-2 px-3 text-gray-700"
                type="text"
                name="size"
                value={formData.size}
                onChange={handleInputChange}
                required
              />
              {formErrors.size && (
                <p className="text-red-600 text-sm mt-1">{formErrors.size}</p>
              )}
            </div>

            {/* Bedrooms */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Bedrooms</label>
              <input
                className="shadow border rounded w-full py-2 px-3 text-gray-700"
                type="text"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleInputChange}
              />
              {formErrors.bedrooms && (
                <p className="text-red-600 text-sm mt-1">{formErrors.bedrooms}</p>
              )}
            </div>

            {/* Bathrooms */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Bathrooms</label>
              <input
                className="shadow border rounded w-full py-2 px-3 text-gray-700"
                type="text"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleInputChange}
              />
              {formErrors.bathrooms && (
                <p className="text-red-600 text-sm mt-1">{formErrors.bathrooms}</p>
              )}
            </div>
          </div>

          {/* User Information */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
            <input
              className="shadow border rounded w-full py-2 px-3 text-gray-700"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
            {formErrors.username && (
              <p className="text-red-600 text-sm mt-1">{formErrors.username}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              className="shadow border rounded w-full py-2 px-3 text-gray-700"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
            <input
              className="shadow border rounded w-full py-2 px-3 text-gray-700"
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
            />
            {formErrors.phoneNumber && (
              <p className="text-red-600 text-sm mt-1">{formErrors.phoneNumber}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Address*</label>
            <textarea
              className="shadow border rounded w-full py-2 px-3 text-gray-700"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              rows={3}
              required
            ></textarea>
          </div>

          <div className="flex justify-center">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto px-8"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'List My Property'}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddSellingProperty;