// routes/binRoutes.js
const express = require('express');
const { collectGarbage } = require('../controllers/binController');
const router = express.Router();

router.post('/collect', collectGarbage);

module.exports = router;
