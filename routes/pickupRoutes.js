const express = require('express');
const Collection = require('../models/Collection');
const Device = require('../models/Device');
const router = express.Router();

// Get all collection details with device info
router.get('/collections', async (req, res) => {
  try {
    const collections = await Collection.find()
      .populate('deviceId', 'deviceId status capacity spaceLeft') // Get relevant fields from Device
      .populate('userId', 'name email'); // Get relevant fields from User
    res.json(collections);
  } catch (error) {
    console.error('Error fetching collections:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get pending pickup points with location (lat, lng) for uncollected garbage
router.get('/pickup-points', async (req, res) => {
  try {
    const pickupPoints = await Collection.find({ isCollected: false }, 'location deviceId');
    res.json(pickupPoints);
  } catch (error) {
    console.error('Error fetching pickup points:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/collections
router.post('/collections', async (req, res) => {
    const { userId, deviceId, location, wasteType, details, date, time } = req.body;
  
    try {
      // Create a new collection document
      const newCollection = new Collection({
        userId,
        deviceId,  // Link to the device
        location,
        wasteType,
        details,
        date,
        time,
        isCollected: false,
      });
  
      const savedCollection = await newCollection.save();
      res.status(201).json(savedCollection);
    } catch (error) {
      console.error('Error creating collection:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

module.exports = router;
