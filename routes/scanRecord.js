// routes/scanRecord.js
const express = require('express');
const ScanRecord = require('../models/ScanRecord');
const Device = require('../models/Device');
const Collection = require('../models/Collection');

const router = express.Router();

// Endpoint to get scan records for the logged-in collector
router.get('/history/:collectorId', async (req, res) => {
  try {
    const { collectorId } =req.params; // Clean the collectorId by trimming any whitespace or newlines

    // Continue with the rest of your logic using the cleaned collectorId
    ;

    // Fetch scan records for the logged-in collector
    const scanRecords = await ScanRecord.find({ collectorId })
      .populate('deviceId')  // Populate the device information (including qrCode)
      .populate('collectionId');  // Populate collection details

    // Map over scan records and include the QR code (Base64 image string)
    const response = scanRecords.map(record => ({
      deviceId: record.deviceId.deviceId,
      qrCode: record.deviceId.qrCode,
      collectionDetails: record.collectionId.details,
      capacity: record.capacity,
      date: record.date,
    }));

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
