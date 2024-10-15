// models/Collector.js
const mongoose = require('mongoose');

const collectorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  collectedBins: {
    type: Number,
    default: 0,
  },
  totalWeight: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

module.exports = mongoose.model('Collector', collectorSchema);
