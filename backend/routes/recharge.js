const express = require('express');
const jwt = require('jsonwebtoken');
const authModule = require('./auth');
const users = authModule.users;
const JWT_SECRET = authModule.JWT_SECRET;

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
router.post('/', authMiddleware, (req, res) => {
  try {
    const { mobileNumber, operator, plan } = req.body;

    if (!mobileNumber || !operator || !plan) {
      return res.status(400).json({ error: 'All fields required' });
    }

    const user = users.find(u => u.id === req.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const recharge = {
      id: Date.now(),
      mobileNumber,
      operator,
      plan,
      date: new Date().toISOString(),
      status: 'success'
    };

    user.recharges.unshift(recharge);

    res.status(201).json({ 
      message: 'Recharge successful', 
      recharge 
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user recharges
router.get('/', authMiddleware, (req, res) => {
  try {
    const user = users.find(u => u.id === req.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({ recharges: user.recharges || [] });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get recharge stats
router.get('/stats', authMiddleware, (req, res) => {
  try {
    const user = users.find(u => u.id === req.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const recharges = user.recharges || [];
    const totalSpent = recharges.reduce((sum, r) => sum + r.plan.price, 0);
    const latestPlan = recharges[0]?.plan;

    res.json({
      totalSpent,
      totalRecharges: recharges.length,
      latestPlan
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
