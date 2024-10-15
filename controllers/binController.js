// controllers/binController.js
const Bin = require('../models/Bin');
const Collection = require('../models/Collection');

exports.collectGarbage = async (req, res) => {
  const { qr_code, weight, collectorId } = req.body;
  try {
    let bin = await Bin.findOne({ qr_code });
    if (!bin) return res.status(404).json({ error: 'Bin not found' });

    bin.status = 'collected';
    await bin.save();

    const collection = new Collection({
      bin_id: bin._id,
      weight,
      collectorId,
    });

    await collection.save();
    res.json({ message: 'Garbage collected successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
