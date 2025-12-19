const { MongoClient } = require('mongodb');
require('dotenv').config();

const atlasUri = process.env.MONGODB_URI || 'mongodb+srv://srivathsa:128797@cluster0.hioiwxu.mongodb.net/recharge_pro?retryWrites=true&w=majority&appName=RechargeApp';

async function testConnection() {
  console.log('🔄 Testing MongoDB Atlas connection...');
  console.log('URI:', atlasUri.replace(/\/\/.*:.*@/, '//***:***@')); // Hide credentials
  
  let client;
  
  try {
    client = new MongoClient(atlasUri, {
      serverSelectionTimeoutMS: 30000,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 0,
      maxPoolSize: 10,
      minPoolSize: 5,
      maxIdleTimeMS: 30000,
      waitQueueTimeoutMS: 5000,
      retryWrites: true,
      retryReads: true
    });
    
    console.log('🔗 Attempting to connect...');
    await client.connect();
    
    console.log('📡 Testing ping...');
    await client.db('admin').command({ ping: 1 });
    
    console.log('📊 Testing database access...');
    const db = client.db('recharge_pro');
    const collections = await db.listCollections().toArray();
    
    console.log('✅ CONNECTION SUCCESSFUL!');
    console.log('📋 Available collections:', collections.map(c => c.name));
    
    // Test basic operations
    console.log('🧪 Testing basic operations...');
    const testCollection = db.collection('connection_test');
    
    // Insert test document
    const insertResult = await testCollection.insertOne({ 
      test: true, 
      timestamp: new Date(),
      message: 'Connection test successful'
    });
    console.log('✅ Insert test passed');
    
    // Read test document
    const document = await testCollection.findOne({ _id: insertResult.insertedId });
    console.log('✅ Read test passed');
    
    // Delete test document
    await testCollection.deleteOne({ _id: insertResult.insertedId });
    console.log('✅ Delete test passed');
    
    console.log('\n🎉 ALL TESTS PASSED! MongoDB Atlas is working correctly.');
    
  } catch (error) {
    console.error('\n❌ CONNECTION FAILED!');
    console.error('Error:', error.message);
    
    if (error.message.includes('authentication failed')) {
      console.error('\n🔐 Authentication Issue:');
      console.error('- Check username and password in connection string');
      console.error('- Verify database user exists in MongoDB Atlas');
    } else if (error.message.includes('network') || error.message.includes('timeout')) {
      console.error('\n🌐 Network Issue:');
      console.error('- Check internet connection');
      console.error('- Verify IP whitelist in MongoDB Atlas');
      console.error('- Check firewall settings');
    } else if (error.message.includes('ENOTFOUND')) {
      console.error('\n🔍 DNS Issue:');
      console.error('- Check cluster URL');
      console.error('- Verify cluster is running');
    }
    
    process.exit(1);
  } finally {
    if (client) {
      await client.close();
      console.log('🔌 Connection closed');
    }
  }
}

testConnection();