// models/PickupPoint.js
const mongoose = require('mongoose');

const pickupPointSchema = new mongoose.Schema({
  location: {
    type: { lat: Number, lng: Number },
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending',
  },
}, { timestamps: true });

module.exports = mongoose.model('PickupPoint', pickupPointSchema);
