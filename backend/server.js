const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const db = require('./db');

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

// API Routes (must come before static files)
server.use('/api/auth', require('./routes/auth'));
server.use('/api/recharge', require('./routes/recharge'));
server.use('/api/plans', require('./routes/plans'));
server.use('/api/reviews', require('./routes/reviews'));

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
    await db.planOps.seedPlans();
    server.listen(PORT, () => {
      console.log(`🚀 Server is running at http://localhost:${PORT}`);
      console.log(`📡 API endpoints available at http://localhost:${PORT}/api`);
    });
  })
  .catch(err => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });

// Graceful shutdown
process.on('SIGINT', async () => {
  await db.close();
  process.exit(0);
});
