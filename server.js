// server.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const cors = require("cors");
const bodyParser = require("body-parser");


// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

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
app.get('/test', (req, res) => {
  res.send('App is running successfully');
});
app.use('/api/collector', require('./routes/collectorRoutes'));
app.use('/api/bin', require('./routes/binRoutes'));
app.use('/api/pickup', require('./routes/pickupRoutes'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
