const express = require('express');
const db = require('../db');
const jwt = require('jsonwebtoken');

const router = express.Router();
const JWT_SECRET = 'your-secret-key-change-in-production';

// JWT middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Get all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await db.reviewOps.getAll();
    res.json({ reviews });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create review
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const user = await db.userOps.findById(req.userId);
    
    // Allow multiple reviews per user
    
    await db.reviewOps.create({
      userId: req.userId,
      userName: user.name,
      rating,
      comment
    });
    
    res.json({ message: 'Review submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
