
// // backend/models/Property.js


import mongoose from 'mongoose';

const PropertySchema = new mongoose.Schema({
  city: { type: String, required: true },
  address: { type: String, required: true },
  price: { type: Number, required: true },
  size: { type: Number, required: true }, // stored in sqft
  type: { type: String, required: true },
  bedrooms: { type: Number, default: 0 },
  bathrooms: { type: Number, default: 0 },
  images: { type: [String], required: true }, // Array for multiple image URLs
  username: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Property', PropertySchema);
