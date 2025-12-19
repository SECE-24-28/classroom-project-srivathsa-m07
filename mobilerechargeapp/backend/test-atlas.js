const { MongoClient } = require('mongodb');
require('dotenv').config();

const mongoUri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME || 'recharge_pro';

async function testAtlasConnection() {
  console.log('🧪 Testing MongoDB Atlas Connection...');
  console.log('🌐 URI:', mongoUri.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@'));
  
  let client;
  try {
    client = new MongoClient(mongoUri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
    });
    
    console.log('🔄 Connecting...');
    await client.connect();
    
    console.log('🏓 Pinging database...');
    await client.db('admin').command({ ping: 1 });
    
    console.log('📊 Testing database operations...');
    const db = client.db(dbName);
    const testCollection = db.collection('test');
    
    // Test insert
    const insertResult = await testCollection.insertOne({ test: 'data', timestamp: new Date() });
    console.log('✅ Insert test passed:', insertResult.insertedId);
    
    // Test find
    const findResult = await testCollection.findOne({ _id: insertResult.insertedId });
    console.log('✅ Find test passed:', findResult.test);
    
    // Test update
    const updateResult = await testCollection.updateOne(
      { _id: insertResult.insertedId },
      { $set: { updated: true } }
    );
    console.log('✅ Update test passed:', updateResult.modifiedCount);
    
    // Test delete
    const deleteResult = await testCollection.deleteOne({ _id: insertResult.insertedId });
    console.log('✅ Delete test passed:', deleteResult.deletedCount);
    
    console.log('🎉 All MongoDB Atlas tests passed successfully!');
    return true;
    
  } catch (error) {
    console.log('❌ MongoDB Atlas connection failed:');
    console.log('Error:', error.message);
    
    if (error.message.includes('authentication failed')) {
      console.log('🔑 Check your username and password in the connection string');
    } else if (error.message.includes('network')) {
      console.log('🌐 Check your network connection and Atlas cluster status');
    } else if (error.message.includes('timeout')) {
      console.log('⏰ Connection timeout - check Atlas cluster is running');
    }
    
    return false;
  } finally {
    if (client) {
      await client.close();
      console.log('🔌 Connection closed');
    }
  }
}

// Run the test
testAtlasConnection().then(success => {
  process.exit(success ? 0 : 1);
});