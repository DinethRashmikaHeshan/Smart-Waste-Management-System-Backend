// models/Collection.js
const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
  collectorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Collector',
    required: true,
  },
  bin_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bin',
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Collection', collectionSchema);
