const { MongoClient } = require('mongodb');

// Simple working MongoDB Atlas connection
const uri = 'mongodb+srv://rechargeuser:recharge123@cluster0.mongodb.net/recharge_pro?retryWrites=true&w=majority';

async function testConnection() {
  console.log('🔄 Testing MongoDB Atlas connection...');
  
  let client;
  try {
    client = new MongoClient(uri);
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    
    console.log('✅ Connected to MongoDB Atlas successfully!');
    
    // Test database operations
    const db = client.db('recharge_pro');
    const result = await db.collection('test').insertOne({ 
      test: true, 
      timestamp: new Date(),
      message: 'Connection successful'
    });
    
    console.log('✅ Database write test passed');
    
    await db.collection('test').deleteOne({ _id: result.insertedId });
    console.log('✅ Database delete test passed');
    
    console.log('🎉 All tests passed! MongoDB Atlas is working.');
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    process.exit(1);
  } finally {
    if (client) await client.close();
  }
}

testConnection();