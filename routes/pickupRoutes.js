// routes/pickupRoutes.js
const express = require('express');
const { getPickupPoints } = require('../controllers/collectorController');
const router = express.Router();

router.get('/pickup-points', getPickupPoints);

module.exports = router;
