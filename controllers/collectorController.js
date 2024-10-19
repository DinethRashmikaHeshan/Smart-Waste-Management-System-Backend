// controllers/collectorController.js
const Collection = require('../models/Collection');
const Collector = require('../models/Collector');

exports.getDashboard = async (req, res) => {
  const { collectorId } = req.params;
  try {
    const collections = await Collector.find({ collectorId });

    const totalWeight = collections.reduce((acc, collection) => acc + collection.weight, 0);
    const totalBins = collections.length;

    const currentWeek = new Date();
    currentWeek.setDate(currentWeek.getDate() - 7);
    const weeklyCollections = collections.filter(c => new Date(c.created_at) >= currentWeek);

    res.json({
      totalWeight,
      totalBins,
      weeklyData: weeklyCollections,
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
