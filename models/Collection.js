const mongoose = require("mongoose");

const CollectionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming you have a User model
      required: true,
    },
    deviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Device", // Mapping to Device model
      required: true,
    },
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    wasteType: { type: String, required: true },
    details: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    isCollected: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Collection", CollectionSchema);
