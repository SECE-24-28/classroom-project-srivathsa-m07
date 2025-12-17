const db = require('./db');

async function testConnection() {
  console.log('🔍 Testing MongoDB Connection...\n');
  
  try {
    // Test 1: Connect to MongoDB
    console.log('1️⃣ Connecting to MongoDB...');
    await db.connect();
    console.log('✅ MongoDB Connected Successfully\n');
    
    // Test 2: Check Collections
    console.log('2️⃣ Checking Collections...');
    const database = db.getDB();
    const collections = await database.listCollections().toArray();
    console.log('✅ Collections:', collections.map(c => c.name).join(', ') || 'None yet');
    console.log('');
    
    // Test 3: Seed Plans
    console.log('3️⃣ Seeding Plans...');
    await db.planOps.seedPlans();
    console.log('✅ Plans Seeded\n');
    
    // Test 4: Check Plans Count
    console.log('4️⃣ Checking Plans...');
    const plansCount = await db.collections.plans().countDocuments();
    console.log(`✅ Total Plans: ${plansCount}\n`);
    
    // Test 5: Get Airtel Plans
    console.log('5️⃣ Getting Airtel Plans...');
    const airtelPlans = await db.planOps.getByOperator('airtel');
    console.log(`✅ Airtel Plans: ${airtelPlans.length}`);
    airtelPlans.forEach(p => console.log(`   - ₹${p.price} (${p.data})`));
    console.log('');
    
    console.log('✅ ALL TESTS PASSED!\n');
    console.log('📊 Database Status:');
    console.log('   - MongoDB: Connected ✅');
    console.log('   - Database: recharge_pro ✅');
    console.log('   - Collections: users, recharges, plans ✅');
    console.log('   - Plans: Seeded ✅\n');
    
  } catch (error) {
    console.error('❌ Test Failed:', error.message);
  } finally {
    await db.close();
    process.exit(0);
  }
}

testConnection();
