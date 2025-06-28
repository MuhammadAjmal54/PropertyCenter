// // backend/controllers/propertyController.js



import Property from '../models/Property.js';
import cloudinary from '../config/cloudinary.js'; // Make sure path is correct
import streamifier from 'streamifier';

// Upload to Cloudinary helper function for multiple files
const uploadToCloudinary = (buffers) => {
  return new Promise((resolve, reject) => {
    const promises = buffers.map(buffer => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'properties' }, // optional folder in your Cloudinary
          (error, result) => {
            if (result) resolve(result.secure_url);
            else reject(error);
          }
        );
        streamifier.createReadStream(buffer).pipe(stream);
      });
    });

    Promise.all(promises)
      .then(results => resolve(results)) // Collect all the URLs
      .catch(error => reject(error));
  });
};

export const createProperty = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'At least one image is required' });
    }

    // Upload images to Cloudinary
    const imageUrls = await uploadToCloudinary(req.files.map(file => file.buffer));

    const {
      city,
      address,
      price,
      size, // frontend sends in marla
      type,
      bedrooms,
      bathrooms,
      username,
      email,
      phoneNumber
    } = req.body;

    // Convert size from marla to sqft (1 marla = 272.25 sqft)
    const sizeInSqft = parseFloat(size) * 272.25;

    const newProperty = new Property({
      city,
      address,
      price: Number(price),
      size: sizeInSqft,
      type,
      bedrooms: bedrooms ? Number(bedrooms) : 0,
      bathrooms: bathrooms ? Number(bathrooms) : 0,
      images: imageUrls, // Array of Cloudinary image URLs
      username,
      email,
      phoneNumber,
    });

    await newProperty.save();

    return res.status(201).json({ message: 'Property created', property: newProperty });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const getProperties = async (req, res) => {
  try {
    const {
      type,
      city,
      bedrooms,
      bathrooms,
      minSize, // expected in sqft
      maxSize, // expected in sqft
      minPrice,
      maxPrice,
    } = req.query;

    let filters = {};

    if (type) filters.type = type;
    if (city) filters.city = city;
    if (bedrooms) filters.bedrooms = { $gte: Number(bedrooms) };
    if (bathrooms) filters.bathrooms = { $gte: Number(bathrooms) };
    if (minSize || maxSize) {
      filters.size = {};
      if (minSize) filters.size.$gte = Number(minSize);
      if (maxSize) filters.size.$lte = Number(maxSize);
    }
    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) filters.price.$gte = Number(minPrice);
      if (maxPrice) filters.price.$lte = Number(maxPrice);
    }

    const properties = await Property.find(filters).sort({ createdAt: -1 });

    return res.json(properties);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};
