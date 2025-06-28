
//middleware/multer.js

import multer from 'multer';

// Set up multer for memory storage
const storage = multer.memoryStorage();

// Allows up to 5 images
const upload = multer({ storage }).array('images', 5); // 'images' is the input name

export default upload;
