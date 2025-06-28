





import express from 'express';
import Announcement from '../models/Announcement.js'; // Correct import for default export

const router = express.Router();

// Create a new announcement
router.post('/', async (req, res) => {
  const { title, content, createdBy } = req.body;

  try {
    const newAnnouncement = new Announcement({
      title,
      content,
      createdBy,
    });

    const savedAnnouncement = await newAnnouncement.save();
    res.status(201).json(savedAnnouncement);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create announcement', error });
  }
});

// Fetch all announcements
router.get('/', async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ date: -1 }); // Sort by date descending
    res.status(200).json(announcements); // Return the announcements as JSON response
  } catch (error) {
    res.status(500).json({ message: 'Error fetching announcements', error });
  }
});

// Edit an existing announcement by ID
router.put('/:id', async (req, res) => {
  const { title, content, createdBy } = req.body;

  try {
    const updatedAnnouncement = await Announcement.findByIdAndUpdate(
      req.params.id,
      { title, content, createdBy, date: new Date() }, // Update date to current time
      { new: true } // Return the updated document
    );

    if (!updatedAnnouncement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }

    res.status(200).json(updatedAnnouncement);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update announcement', error });
  }
});

// Delete an announcement by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedAnnouncement = await Announcement.findByIdAndDelete(req.params.id);

    if (!deletedAnnouncement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }

    res.status(200).json({ message: 'Announcement deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete announcement', error });
  }
});

// Export the router to be used in the server
export default router;