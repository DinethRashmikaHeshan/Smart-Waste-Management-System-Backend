// routes/collectorRoutes.js
const express = require('express');
const { getDashboard, getHistory } = require('../controllers/collectorController');
const router = express.Router();

router.get('/dashboard/:collectorId', getDashboard);
router.get('/history/:collectorId', getHistory);

module.exports = router;
