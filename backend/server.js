const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const server = express();
const PORT = 3000;

// Middleware
server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(session({
  secret: 'recharge-pro-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// API Routes
server.use('/api/auth', require('./routes/auth'));
server.use('/api/recharge', require('./routes/recharge'));
server.use('/api/plans', require('./routes/plans'));

// Serve React build files
server.use(express.static(path.join(__dirname, '../dist')));

// All other routes serve React app
server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

server.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
  console.log(`📡 API endpoints available at http://localhost:${PORT}/api`);
});
