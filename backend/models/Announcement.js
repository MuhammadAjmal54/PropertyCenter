

import mongoose from 'mongoose';

// Define the schema for an announcement
const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdBy: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

// Export the model using default export
const Announcement = mongoose.model('Announcement', announcementSchema);
export default Announcement;
