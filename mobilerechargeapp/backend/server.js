const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
require('dotenv').config();
const db = require('./db');

const server = express();
const PORT = process.env.PORT || 3000;

// Middleware
server.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
  credentials: true
}));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(session({
  secret: process.env.SESSION_SECRET || 'recharge-pro-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// API Routes (must come before static files)
server.use('/api/auth', require('./routes/auth'));
server.use('/api/recharge', require('./routes/recharge'));
server.use('/api/plans', require('./routes/plans'));
server.use('/api/reviews', require('./routes/reviews'));
server.use('/api/admin', require('./routes/admin'));

// Health check
server.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Database status check
server.get('/api/db-status', async (req, res) => {
  try {
    const usersCount = await db.collections.users().countDocuments();
    const rechargesCount = await db.collections.recharges().countDocuments();
    const plansCount = await db.collections.plans().countDocuments();
    
    res.json({
      connected: true,
      database: 'recharge_pro',
      collections: {
        users: usersCount,
        recharges: rechargesCount,
        plans: plansCount
      }
    });
  } catch (error) {
    res.status(500).json({ connected: false, error: error.message });
  }
});

// Test endpoint
server.get('/test', (req, res) => {
  res.json({ 
    message: 'Server is working!',
    endpoints: {
      health: '/api/health',
      operators: '/api/plans',
      airtelPlans: '/api/plans/airtel',
      signup: 'POST /api/auth/signup',
      login: 'POST /api/auth/login'
    }
  });
});

// Serve React build files
server.use(express.static(path.join(__dirname, '../dist')));

// All other routes serve React app
server.get('*', (req, res) => {
  const indexPath = path.join(__dirname, '../dist/index.html');
  if (require('fs').existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(200).send(`
      <html>
        <body style="font-family: Arial; padding: 40px; background: #f5f5f5;">
          <h1>🚀 Server is Running!</h1>
          <p>Frontend not built yet. Run: <code>npm run build</code></p>
          <h3>Available API Endpoints:</h3>
          <ul>
            <li><a href="/api/health">/api/health</a> - Health check</li>
            <li><a href="/api/plans">/api/plans</a> - Get all operators</li>
            <li><a href="/api/plans/airtel">/api/plans/airtel</a> - Get Airtel plans</li>
            <li><a href="/test">/test</a> - Test endpoint</li>
          </ul>
        </body>
      </html>
    `);
  }
});

// Connect to MongoDB and start server
db.connect()
  .then(async () => {
    console.log('🌱 Seeding initial data...');
    try {
      await db.planOps.seedPlans();
      console.log('✅ Database setup complete');
    } catch (err) {
      console.log('⚠️  Seeding error (continuing):', err.message);
    }
    
    server.listen(PORT, (err) => {
      if (err) {
        if (err.code === 'EADDRINUSE') {
          console.error(`❌ Port ${PORT} is already in use!`);
          console.log('\n🔧 To fix this:');
          console.log('1. Kill existing process: taskkill /f /im node.exe');
          console.log('2. Or use different port: PORT=3001 npm start');
          process.exit(1);
        } else {
          console.error('Server error:', err);
          process.exit(1);
        }
      } else {
        console.log('\n🎉 SERVER STARTED SUCCESSFULLY!');
        console.log(`🚀 Server is running at http://localhost:${PORT}`);
        console.log(`📡 API endpoints available at http://localhost:${PORT}/api`);
        console.log(`🗄️  Database: ${process.env.DB_NAME || 'recharge_pro'}`);
        console.log('\n📋 Available endpoints:');
        console.log('   • GET  /api/health - Health check');
        console.log('   • GET  /api/plans - Get all operators');
        console.log('   • POST /api/auth/signup - User signup');
        console.log('   • POST /api/auth/login - User login');
        console.log('   • POST /api/recharge - Create recharge');
        console.log('   • GET  /api/recharge - Get user recharges');
        console.log('   • GET  /api/db-status - Database status');
      }
    });
  })
  .catch(err => {
    console.error('\n❌ FAILED TO START SERVER');
    console.error('Database connection failed:', err.message);
    console.log('\n🔧 Troubleshooting steps:');
    console.log('1. Install MongoDB locally or fix Atlas connection');
    console.log('2. Run: mongod --dbpath ./data/db');
    console.log('3. Or use the setup script: setup-local-mongodb.bat');
    console.log('4. Server will continue with in-memory storage');
    
    // Start server anyway with in-memory storage
    server.listen(PORT, () => {
      console.log(`\n⚠️  Server running with in-memory storage at http://localhost:${PORT}`);
    });
  });

// Graceful shutdown
process.on('SIGINT', async () => {
  await db.close();
  process.exit(0);
});
