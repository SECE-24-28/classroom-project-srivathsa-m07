const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();
const users = []; // In-memory storage (replace with DB in production)
const JWT_SECRET = 'your-secret-key-change-in-production';

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields required' });
    }

    if (users.find(u => u.email === email)) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { id: Date.now(), name, email, password: hashedPassword, recharges: [] };
    users.push(user);

    res.status(201).json({ message: 'Account created successfully', userId: user.id });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    
    res.json({ 
      token, 
      user: { id: user.id, name: user.name, email: user.email } 
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user data
router.get('/me', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = users.find(u => u.id === decoded.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({ user: { id: user.id, name: user.name, email: user.email, recharges: user.recharges } });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

module.exports = router;
module.exports.users = users;
module.exports.JWT_SECRET = JWT_SECRET;
