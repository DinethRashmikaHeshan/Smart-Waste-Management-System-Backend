const express = require('express');
const { loginCollector , signup} = require('../controllers/authController');
const router = express.Router();

// POST request to login the collector
router.post('/login', loginCollector);
router.post('/signup', signup);

module.exports = router;
