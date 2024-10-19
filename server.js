// server.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');


const wasteRoutes = require('./routes/waste');
const deviceRoutes = require('./routes/device');

const cors = require("cors");
const bodyParser = require("body-parser");

const authRoutes = require('./routes/authRoutes');
const scanRoutes = require('./routes/scanRoutes');
const scanRecords = require('./routes/scanRecord');


// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Use Routes
app.use(express.json());
app.use('/api/collector', require('./routes/collectorRoutes'));
app.use('/api/pickup', require('./routes/pickupRoutes'));
app.use('/api/scan', scanRoutes);
app.use('/api/records', scanRecords);
app.use('/api/auth', authRoutes);

app.use('/api/waste', wasteRoutes);
app.use('/api/device', deviceRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
