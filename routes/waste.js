// routes/waste.js
const express = require('express');
const { createWasteRecord, getWasteRecordsByDeviceId, addManualWasteRecord } = require('../controllers/wasteRecordController');
const router = express.Router();

router.post('/update', createWasteRecord);
router.get('/:deviceId', getWasteRecordsByDeviceId);
router.post('/add', addManualWasteRecord);


module.exports = router;

