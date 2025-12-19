const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const db = require('../db');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'admin-secret-key-change-in-production';

// Admin middleware
const adminMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded.isAdmin) return res.status(403).json({ error: 'Not authorized' });
    req.adminId = decoded.adminId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Admin Signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, secretKey } = req.body;
    
    // Secret key validation (change this in production)
    if (secretKey !== 'ADMIN_SECRET_2024') {
      return res.status(403).json({ error: 'Invalid secret key' });
    }
    
    const existing = await db.adminOps.findByEmail(email);
    if (existing) {
      return res.status(400).json({ error: 'Admin already exists' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.adminOps.create({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date()
    });
    
    res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const admin = await db.adminOps.findByEmail(email);
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { adminId: admin._id, isAdmin: true },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({
      token,
      admin: { id: admin._id, name: admin.name, email: admin.email }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get Admin Profile
router.get('/me', adminMiddleware, async (req, res) => {
  try {
    const admin = await db.adminOps.findById(req.adminId);
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    
    res.json({
      admin: { id: admin._id, name: admin.name, email: admin.email }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Dashboard Stats
router.get('/dashboard/stats', adminMiddleware, async (req, res) => {
  try {
    const [users, recharges, plans, reviews] = await Promise.all([
      db.collections.users().countDocuments(),
      db.collections.recharges().countDocuments(),
      db.collections.plans().countDocuments(),
      db.collections.reviews().countDocuments()
    ]);
    
    const totalRevenue = await db.collections.recharges()
      .aggregate([
        { $group: { _id: null, total: { $sum: '$plan.price' } } }
      ]).toArray();
    
    res.json({
      users,
      recharges,
      plans,
      reviews,
      revenue: totalRevenue[0]?.total || 0
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Recharges by Operator
router.get('/dashboard/operator-stats', adminMiddleware, async (req, res) => {
  try {
    const stats = await db.collections.recharges()
      .aggregate([
        {
          $group: {
            _id: '$operator',
            count: { $sum: 1 },
            revenue: { $sum: '$plan.price' }
          }
        }
      ]).toArray();
    
    res.json({ stats });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Daily Revenue (Last 7 days)
router.get('/dashboard/daily-revenue', adminMiddleware, async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const stats = await db.collections.recharges()
      .aggregate([
        { $match: { date: { $gte: sevenDaysAgo } } },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
            revenue: { $sum: '$plan.price' },
            count: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } }
      ]).toArray();
    
    res.json({ stats });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Plan Popularity
router.get('/dashboard/plan-stats', adminMiddleware, async (req, res) => {
  try {
    const stats = await db.collections.recharges()
      .aggregate([
        {
          $group: {
            _id: '$plan.price',
            count: { $sum: 1 }
          }
        },
        { $sort: { count: -1 } },
        { $limit: 10 }
      ]).toArray();
    
    res.json({ stats });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get All Plans
router.get('/plans', adminMiddleware, async (req, res) => {
  try {
    const plans = await db.collections.plans().find({}).toArray();
    res.json({ plans });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Add Plan
router.post('/plans', adminMiddleware, async (req, res) => {
  try {
    const { operator, type, price, validity, data, description } = req.body;
    
    const plan = {
      operator,
      id: `${operator.charAt(0)}${Date.now()}`,
      type,
      price: parseInt(price),
      validity,
      data,
      description,
      createdAt: new Date()
    };
    
    await db.collections.plans().insertOne(plan);
    res.status(201).json({ message: 'Plan added successfully', plan });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update Plan
router.put('/plans/:id', adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { operator, type, price, validity, data, description } = req.body;
    
    await db.collections.plans().updateOne(
      { id },
      {
        $set: {
          operator,
          type,
          price: parseInt(price),
          validity,
          data,
          description,
          updatedAt: new Date()
        }
      }
    );
    
    res.json({ message: 'Plan updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete Plan
router.delete('/plans/:id', adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    await db.collections.plans().deleteOne({ id });
    res.json({ message: 'Plan deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
module.exports.JWT_SECRET = JWT_SECRET;
