const express = require('express');
const Device = require('../models/Device');
const Collection = require('../models/Collection');
const ScanRecord = require('../models/ScanRecord');

const router = express.Router();

// QR Scan Endpoint
router.post('/scan', async (req, res) => {
  try {
    const { deviceId,collectorId } = req.body;

    // Find device by QR code
    const device = await Device.findOne({ deviceId });
    if (!device) {
      return res.status(404).json({ message: 'Device not found' });
    }

    const collection = await Collection.findOne({ 'deviceId': device._id});
    if(!collection.isCollected){
      // Set spaceLeft to 0 because full capacity is collected
      const collectedAmount = device.capacity-device.spaceLeft;
      device.spaceLeft = device.capacity;
  
      await device.save();
  
      // Find the collection related to the device by location or deviceId and update
      // const collection = await Collection.findOne({ 'deviceId': device._id});
      // console.log(device._id,collection);
      if (collection) {
        // Update Collection model fields based on full collection
        collection.isCollected = true;
        
        await collection.save();
      }
  
      // Create a scan record for audit
      const scanRecord = new ScanRecord({
        deviceId: device._id,
        collectorId:collectorId,
        collectionId: collection._id,
        capacity: collectedAmount, // Full capacity collected
      });
      await scanRecord.save();
  
      res.status(200).json({ message: 'QR code scan successful, full capacity collected', scanRecord });
    }else{
      res.status(200).json({ message: 'This Bin is already collected'});
    }
    
    
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
