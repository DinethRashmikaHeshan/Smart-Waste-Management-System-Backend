// controllers/wasteRecordController.js
const WasteRecord = require('../models/WasteRecord');
const Device = require('../models/Device');

exports.createWasteRecord = async (req, res) => {
    try {
        const { weight, deviceId } = req.body;

        // Check if the device exists
        const device = await Device.findOne({ deviceId });
        if (!device) {
            return res.status(404).json({ message: 'Device not found' });
        }

        // Create a new waste record
        const newWasteRecord = new WasteRecord({
            weight,
            deviceId,
        });

        // Save the new waste record
        await newWasteRecord.save();

        // Update the device's spaceLeft
        const totalWasteWeight = await WasteRecord.aggregate([
            { $match: { deviceId } },
            { $group: { _id: null, totalWeight: { $sum: '$weight' } } }
        ]);

        const totalWeight = totalWasteWeight[0]?.totalWeight || 0;
        const newSpaceLeft = device.capacity - totalWeight;

        // Update the device with the new spaceLeft
        device.spaceLeft = newSpaceLeft;
        await device.save();

        res.status(201).json(newWasteRecord);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getWasteRecordsByDeviceId = async (req, res) => {
    try {
        const { deviceId } = req.params;
        const records = await WasteRecord.find({ deviceId }).sort({ date: -1 });
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// New function: Add manual waste record
exports.addManualWasteRecord = async (req, res) => {
    try {
        const { weight, deviceId } = req.body;

        // Check if the device exists
        const device = await Device.findOne({ deviceId });
        if (!device) {
            return res.status(404).json({ message: 'Device not found' });
        }

        // Create a new waste record
        const newWasteRecord = new WasteRecord({
            weight,
            deviceId,
        });

        // Save the new waste record
        await newWasteRecord.save();

        // Update the device's spaceLeft
        const totalWasteWeight = await WasteRecord.aggregate([
            { $match: { deviceId } },
            { $group: { _id: null, totalWeight: { $sum: '$weight' } } }
        ]);

        const totalWeight = totalWasteWeight[0]?.totalWeight || 0;
        const newSpaceLeft = device.capacity - totalWeight;

        // Update the device with the new spaceLeft
        device.spaceLeft = newSpaceLeft;
        await device.save();

        res.status(201).json(newWasteRecord);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};