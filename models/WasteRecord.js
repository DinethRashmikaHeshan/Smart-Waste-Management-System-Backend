// models/WasteRecord.js
const mongoose = require('mongoose');

const WasteRecordSchema = new mongoose.Schema({
    weight: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['Pending', 'Scheduled', 'Collected'],
        default: 'Pending',
    },
    deviceId: {
        type: String,
        required: true, // To link to the specific device
    }
});

module.exports = mongoose.model('WasteRecord', WasteRecordSchema);
