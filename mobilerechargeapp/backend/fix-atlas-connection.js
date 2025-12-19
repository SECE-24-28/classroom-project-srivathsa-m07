const { MongoClient } = require('mongodb');

// Try multiple connection strings to find the working one
const connectionStrings = [
  'mongodb+srv://srivathsa:128797@cluster0.hioiwxu.mongodb.net/recharge_pro?retryWrites=true&w=majority',
  'mongodb+srv://srivathsa:128797@cluster0.hioiwxu.mongodb.net/?retryWrites=true&w=majority',
  'mongodb://srivathsa:128797@cluster0-shard-00-00.hioiwxu.mongodb.net:27017,cluster0-shard-00-01.hioiwxu.mongodb.net:27017,cluster0-shard-00-02.hioiwxu.mongodb.net:27017/recharge_pro?ssl=true&replicaSet=atlas-default-shard-0&authSource=admin&retryWrites=true&w=majority'
];

async function findWorkingConnection() {
  for (let i = 0; i < connectionStrings.length; i++) {
    const uri = connectionStrings[i];
    console.log(`\n🔄 Testing connection ${i + 1}/${connectionStrings.length}...`);
    
    let client;
    try {
      client = new MongoClient(uri, {
        serverSelectionTimeoutMS: 10000,
        connectTimeoutMS: 10000
      });
      
      await client.connect();
      await client.db('admin').command({ ping: 1 });
      
      console.log(`✅ Connection ${i + 1} WORKS!`);
      console.log(`Working URI: ${uri.replace(/\/\/.*:.*@/, '//***:***@')}`);
      
      // Test database operations
      const db = client.db('recharge_pro');
      await db.collection('test').insertOne({ test: true, timestamp: new Date() });
      await db.collection('test').deleteOne({ test: true });
      
      console.log('✅ Database operations successful!');
      return uri;
      
    } catch (error) {
      console.log(`❌ Connection ${i + 1} failed: ${error.message}`);
    } finally {
      if (client) await client.close();
    }
  }
  
  console.log('\n❌ All connection attempts failed!');
  console.log('\n🔧 Please check:');
  console.log('1. MongoDB Atlas cluster is running');
  console.log('2. IP address is whitelisted');
  console.log('3. Username/password are correct');
  console.log('4. Internet connection is stable');
  
  return null;
}

findWorkingConnection();