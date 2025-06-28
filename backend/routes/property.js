// // // backend/routes/property.js

// import express from 'express';
// import upload from '../middleware/multer.js';
// import { createProperty, getProperties } from '../controllers/propertyController.js';

// const router = express.Router();

// router.post('/', upload, createProperty); // Use the multer upload middleware
// router.get('/', getProperties);

// export default router;



import express from 'express';
import upload from '../middleware/multer.js';
import { createProperty, getProperties } from '../controllers/propertyController.js';
import Property from '../models/Property.js';

const router = express.Router();

router.post('/', upload, createProperty); // Use the multer upload middleware
router.get('/', getProperties);

// Delete a property by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedProperty = await Property.findByIdAndDelete(req.params.id);

    if (!deletedProperty) {
      return res.status(404).json({ message: 'Property not found' });
    }

    return res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;