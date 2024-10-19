// routes/device.js
const express = require('express');
const { updateDeviceStatus, getDeviceStatus, addDevice,getAllDevices } = require('../controllers/deviceController');
const router = express.Router();

router.post('/status', updateDeviceStatus);
router.get('/:deviceId', getDeviceStatus);

// New route: Add new device manually
router.post('/add', addDevice);
// Fetch all devices
router.get('/', getAllDevices);


module.exports = router;