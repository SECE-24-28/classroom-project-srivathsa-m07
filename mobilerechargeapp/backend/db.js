const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

// MongoDB Atlas ONLY - No local fallback
const mongoUri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME || 'recharge_pro';

if (!mongoUri) {
  console.error('❌ MONGODB_URI environment variable is required!');
  console.log('Please set your Atlas connection string in .env file');
  process.exit(1);
}

let db = null;
let client = null;

async function connect() {
  try {
    console.log('🔄 Connecting to MongoDB Atlas...');
    console.log('🌐 URI:', mongoUri.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@'));
    
    client = new MongoClient(mongoUri, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
      maxPoolSize: 10,
      retryWrites: true,
      w: 'majority'
    });
    
    await client.connect();
    console.log('🏓 Testing connection...');
    await client.db('admin').command({ ping: 1 });
    
    db = client.db(dbName);
    
    console.log('✅ Successfully connected to MongoDB Atlas!');
    console.log('📊 Database:', dbName);
    console.log('🌐 Cluster: Connected and ready');
    
    return db;
  } catch (error) {
    console.error('❌ MongoDB Atlas connection failed!');
    console.error('Error:', error.message);
    
    if (error.message.includes('authentication failed')) {
      console.log('🔑 Check your username and password in connection string');
    } else if (error.message.includes('network')) {
      console.log('🌐 Check your network and Atlas cluster status');
    } else if (error.message.includes('timeout')) {
      console.log('⏰ Connection timeout - verify cluster is running');
    }
    
    console.log('\n📋 Troubleshooting:');
    console.log('1. Verify your Atlas connection string in .env');
    console.log('2. Check if your IP is whitelisted in Atlas');
    console.log('3. Ensure cluster is running (not paused)');
    
    throw error;
  }
}

// Get database instance
function getDB() {
  if (!db) {
    throw new Error('Database not connected. Call connect() first.');
  }
  return db;
}

// Collections
const collections = {
  users: () => getDB().collection('users'),
  recharges: () => getDB().collection('recharges'),
  plans: () => getDB().collection('plans'),
  reviews: () => getDB().collection('reviews'),
  admins: () => getDB().collection('admins')
};

// User operations
const userOps = {
  create: async (userData) => {
    return await collections.users().insertOne(userData);
  },
  
  findByEmail: async (email) => {
    return await collections.users().findOne({ email });
  },
  
  findById: async (id) => {
    try {
      const objectId = typeof id === 'string' ? new ObjectId(id) : id;
      return await collections.users().findOne({ _id: objectId });
    } catch (error) {
      return null;
    }
  },
  
  updateById: async (id, updateData) => {
    const objectId = typeof id === 'string' ? new ObjectId(id) : id;
    return await collections.users().updateOne(
      { _id: objectId },
      { $set: updateData }
    );
  }
};

// Recharge operations
const rechargeOps = {
  create: async (rechargeData) => {
    const data = {
      ...rechargeData,
      date: new Date(),
      status: 'success'
    };
    return await collections.recharges().insertOne(data);
  },
  
  findByUserId: async (userId) => {
    return await collections.recharges()
      .find({ userId })
      .sort({ date: -1 })
      .toArray();
  },
  
  getStats: async (userId) => {
    const recharges = await rechargeOps.findByUserId(userId);
    const totalSpent = recharges.reduce((sum, r) => sum + (r.plan?.price || 0), 0);
    const latestPlan = recharges[0]?.plan || null;
    
    return {
      totalSpent,
      totalRecharges: recharges.length,
      latestPlan
    };
  }
};

// Plan operations
const planOps = {
  getByOperator: async (operator) => {
    return await collections.plans().find({ operator }).toArray();
  },
  
  seedPlans: async () => {
    const count = await collections.plans().countDocuments();
    if (count > 0) {
      console.log('📋 Plans already exist, skipping seed');
      return;
    }
    
    const plans = [
      // Airtel
      { operator: 'airtel', id: 'a1', type: 'prepaid', price: 155, validity: '28 days', data: '1GB/day', description: 'Airtel basic plan' },
      { operator: 'airtel', id: 'a2', type: 'prepaid', price: 209, validity: '28 days', data: '1.5GB/day', description: 'Airtel popular plan' },
      { operator: 'airtel', id: 'a3', type: 'prepaid', price: 299, validity: '28 days', data: '2GB/day', description: 'Airtel unlimited' },
      { operator: 'airtel', id: 'a4', type: 'prepaid', price: 479, validity: '56 days', data: '1.5GB/day', description: 'Airtel long validity' },
      { operator: 'airtel', id: 'a5', type: 'postpaid', price: 499, validity: '30 days', data: '40GB', description: 'Airtel postpaid' },
      // Jio
      { operator: 'jio', id: 'j1', type: 'prepaid', price: 149, validity: '28 days', data: '1GB/day', description: 'Jio basic plan' },
      { operator: 'jio', id: 'j2', type: 'prepaid', price: 199, validity: '28 days', data: '1.5GB/day', description: 'Jio popular plan' },
      { operator: 'jio', id: 'j3', type: 'prepaid', price: 299, validity: '28 days', data: '2GB/day', description: 'Jio unlimited' },
      { operator: 'jio', id: 'j4', type: 'prepaid', price: 533, validity: '56 days', data: '2GB/day', description: 'Jio long validity' },
      { operator: 'jio', id: 'j5', type: 'postpaid', price: 399, validity: '30 days', data: '30GB', description: 'Jio postpaid' },
      // Vi
      { operator: 'vi', id: 'v1', type: 'prepaid', price: 155, validity: '28 days', data: '1GB/day', description: 'Vi basic plan' },
      { operator: 'vi', id: 'v2', type: 'prepaid', price: 209, validity: '28 days', data: '1.5GB/day', description: 'Vi popular plan' },
      { operator: 'vi', id: 'v3', type: 'prepaid', price: 299, validity: '28 days', data: '2GB/day', description: 'Vi unlimited' },
      { operator: 'vi', id: 'v4', type: 'prepaid', price: 475, validity: '56 days', data: '1.5GB/day', description: 'Vi long validity' },
      { operator: 'vi', id: 'v5', type: 'postpaid', price: 499, validity: '30 days', data: '40GB', description: 'Vi postpaid' },
      // BSNL
      { operator: 'bsnl', id: 'b1', type: 'prepaid', price: 107, validity: '28 days', data: '1GB/day', description: 'BSNL basic plan' },
      { operator: 'bsnl', id: 'b2', type: 'prepaid', price: 187, validity: '28 days', data: '2GB/day', description: 'BSNL popular plan' },
      { operator: 'bsnl', id: 'b3', type: 'prepaid', price: 297, validity: '54 days', data: '2GB/day', description: 'BSNL unlimited' },
      { operator: 'bsnl', id: 'b4', type: 'prepaid', price: 397, validity: '80 days', data: '2GB/day', description: 'BSNL long validity' },
      { operator: 'bsnl', id: 'b5', type: 'postpaid', price: 399, validity: '30 days', data: '30GB', description: 'BSNL postpaid' }
    ];
    
    await collections.plans().insertMany(plans);
    console.log('✅ Plans seeded successfully');
  }
};

// Review operations
const reviewOps = {
  create: async (reviewData) => {
    return await collections.reviews().insertOne({
      ...reviewData,
      createdAt: new Date()
    });
  },
  
  getAll: async () => {
    return await collections.reviews()
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
  },
  
  getByUserId: async (userId) => {
    return await collections.reviews().findOne({ userId });
  }
};

// Admin operations
const adminOps = {
  create: async (adminData) => {
    return await collections.admins().insertOne(adminData);
  },
  
  findByEmail: async (email) => {
    return await collections.admins().findOne({ email });
  },
  
  findById: async (id) => {
    try {
      const objectId = typeof id === 'string' ? new ObjectId(id) : id;
      return await collections.admins().findOne({ _id: objectId });
    } catch (error) {
      return null;
    }
  }
};

// Close connection
async function close() {
  if (client) {
    await client.close();
    console.log('🔌 MongoDB connection closed');
  }
}

module.exports = {
  connect,
  getDB,
  collections,
  userOps,
  rechargeOps,
  planOps,
  reviewOps,
  adminOps,
  close
};
