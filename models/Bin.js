// models/Bin.js
const mongoose = require('mongoose');

const binSchema = new mongoose.Schema({
  qr_code: {
    type: String,
    unique: true,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'collected'],
    default: 'pending',
  },
  location: {
    type: { lat: Number, lng: Number },
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Bin', binSchema);
