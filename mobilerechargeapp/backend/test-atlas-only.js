const db = require('./db');

async function testAtlasConnection() {
  console.log('🌐 Testing MongoDB Atlas Connection ONLY');
  console.log('=' .repeat(50));
  
  try {
    await db.connect();
    console.log('✅ Atlas connection successful!');
    
    // Test operations
    console.log('\n📊 Testing database operations...');
    
    // Test collections
    const collections = ['users', 'recharges', 'plans', 'reviews', 'admins'];
    for (const collName of collections) {
      const count = await db.collections[collName]().countDocuments();
      console.log(`✅ ${collName}: ${count} documents`);
    }
    
    // Seed plans if empty
    await db.planOps.seedPlans();
    
    const plansCount = await db.collections.plans().countDocuments();
    console.log(`✅ Plans after seeding: ${plansCount} documents`);
    
    console.log('\n🎉 MongoDB Atlas is working perfectly!');
    return true;
    
  } catch (error) {
    console.log('\n❌ Atlas connection failed:');
    console.log('Error:', error.message);
    return false;
  } finally {
    await db.close();
  }
}

testAtlasConnection().then(success => {
  process.exit(success ? 0 : 1);
});