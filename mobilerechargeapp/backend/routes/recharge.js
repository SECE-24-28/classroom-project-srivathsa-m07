const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db');
const { JWT_SECRET } = require('./auth');

const router = express.Router();

// Middleware to verify token
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

// Create recharge
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { mobileNumber, operator, plan } = req.body;

    if (!mobileNumber || !operator || !plan) {
      return res.status(400).json({ error: 'All fields required' });
    }

    const recharge = {
      userId: req.userId,
      mobileNumber,
      operator,
      plan,
      date: new Date(),
      status: 'success'
    };

    const result = await db.rechargeOps.create(recharge);

    res.status(201).json({ 
      message: 'Recharge successful', 
      recharge: { ...recharge, _id: result.insertedId } 
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user recharges
router.get('/', authMiddleware, async (req, res) => {
  try {
    const recharges = await db.rechargeOps.findByUserId(req.userId);
    res.json({ recharges });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get recharge stats
router.get('/stats', authMiddleware, async (req, res) => {
  try {
    const stats = await db.rechargeOps.getStats(req.userId);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
