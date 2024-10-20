// controllers/collectorController.js
const ScanRecord = require('../models/ScanRecord');
const Collection = require('../models/Collection');
const Collector = require('../models/Collector');

// Function to get bins and total capacity collected by the collector
exports.getDashboard = async (req, res) => {
  const { collectorId } = req.params;

  try {
    // Retrieve all scan records for the specified collector
    const collections = await ScanRecord.find({ collectorId });

    // Helper function to filter collections by a date range
    const filterByDateRange = (records, daysAgo) => {
      const dateThreshold = new Date();
      dateThreshold.setDate(dateThreshold.getDate() - daysAgo);
      return records.filter(record => new Date(record.date) >= dateThreshold);
    };

    // Filter collections based on date range (daily, weekly, monthly)
    const dailyCollections = filterByDateRange(collections, 1); // Last 1 day
    const weeklyCollections = filterByDateRange(collections, 7); // Last 7 days
    const monthlyCollections = filterByDateRange(collections, 30); // Last 30 days

    // Calculate total bins collected and capacity for each period
    const calculateTotals = (records) => {
      const totalBins = records.length;
      const totalCapacity = records.reduce((acc, record) => acc + record.capacity, 0);
      return { totalBins, totalCapacity };
    };

    // Calculate totals for daily, weekly, and monthly collections
    const dailyTotals = calculateTotals(dailyCollections);
    const weeklyTotals = calculateTotals(weeklyCollections);
    const monthlyTotals = calculateTotals(monthlyCollections);

    // Return the collected data
    res.json({
      daily: dailyTotals,
      weekly: weeklyTotals,
      monthly: monthlyTotals,
      totalBinsCollected: collections.length, // Total bins for all time
      totalCapacityCollected: collections.reduce((acc, record) => acc + record.capacity, 0) // Total capacity for all time
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.getHistory = async (req, res) => {
  const { collectorId } = req.params;
  try {
    const history = await Collection.find({ collectorId }).populate('bin_id');
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPickupPoints = async (req, res) => {
  try {
    const pickupPoints = await PickupPoint.find({ status: 'pending' });
    res.json(pickupPoints);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
