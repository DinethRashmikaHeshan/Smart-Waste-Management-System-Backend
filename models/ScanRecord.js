const mongoose = require('mongoose');

const ScanRecordSchema = new mongoose.Schema({
  deviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Device',
    required: true,
  },
  collectorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Collector',
    required: true,
  },
  collectionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Collection',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  capacity: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('ScanRecord', ScanRecordSchema);
