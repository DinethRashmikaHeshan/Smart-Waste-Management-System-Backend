const express = require('express');
const Collector = require('../models/Collector'); // Adjust based on your project structure
const bcrypt = require('bcrypt'); // For password hashing
const jwt = require('jsonwebtoken'); // For generating JWT

const loginCollector = async (req, res) => {
  const { email, password } = req.body;
  try {
    const collector = await Collector.findOne({ email });
    if (!collector) {
      return res.status(404).json({ message: 'Collector not found' });
    }

    const isMatch = await bcrypt.compare(password, collector.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: collector._id }, 'gbCollector', { expiresIn: '1h' });

    res.json({
      message: 'Login successful',
      token,
      collector: {
        id: collector._id,
        name: collector.name,
        email: collector.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please provide all required fields.' });
  }

  try {
    // Check if the email already exists
    const existingCollector = await Collector.findOne({ email });
    if (existingCollector) {
      return res.status(400).json({ message: 'Email already exists.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new collector instance
    const newCollector = new Collector({
      name,
      email,
      password: hashedPassword,
    });

    // Save the collector to the database
    await newCollector.save();

    // Generate a JWT token for the new user
    const token = jwt.sign({ id: newCollector._id }, 'your_jwt_secret', { expiresIn: '1h' });

    // Send response
    res.status(201).json({
      message: 'Collector registered successfully!',
      token,
      collector: {
        id: newCollector._id,
        name: newCollector.name,
        email: newCollector.email,
      },
    });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { loginCollector , signup};
