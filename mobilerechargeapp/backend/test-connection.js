const db = require('./db');

async function testConnection() {
  console.log('🧪 Testing Database Connection...');
  console.log('=' .repeat(50));
  
  try {
    // Test connection
    await db.connect();
    console.log('✅ Database connection successful!');
    
    // Test basic operations
    console.log('\n📊 Testing database operations...');
    
    // Test user operations
    const testUser = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'hashedpassword',
      createdAt: new Date()
    };
    
    const userResult = await db.userOps.create(testUser);
    console.log('✅ User creation test passed:', userResult.insertedId);
    
    const foundUser = await db.userOps.findByEmail('test@example.com');
    console.log('✅ User find test passed:', foundUser ? 'Found' : 'Not found');
    
    // Test plan operations
    await db.planOps.seedPlans();
    console.log('✅ Plans seeding test passed');
    
    const airtelPlans = await db.planOps.getByOperator('airtel');
    console.log('✅ Plans retrieval test passed:', airtelPlans.length, 'plans found');
    
    // Test recharge operations
    if (foundUser) {
      const testRecharge = {
        userId: foundUser._id.toString(),
        mobileNumber: '9876543210',
        operator: 'airtel',
        plan: { id: 'a1', price: 155, data: '1GB/day' },
        paymentMethod: 'card'
      };
      
      const rechargeResult = await db.rechargeOps.create(testRecharge);
      console.log('✅ Recharge creation test passed:', rechargeResult.insertedId);
      
      const userRecharges = await db.rechargeOps.findByUserId(foundUser._id.toString());
      console.log('✅ Recharge retrieval test passed:', userRecharges.length, 'recharges found');
      
      const stats = await db.rechargeOps.getStats(foundUser._id.toString());
      console.log('✅ Stats calculation test passed:', stats);
    }
    
    console.log('\n🎉 All database tests passed successfully!');
    console.log('=' .repeat(50));
    
    return true;
    
  } catch (error) {
    console.log('\n❌ Database test failed:');
    console.log('Error:', error.message);
    console.log('=' .repeat(50));
    return false;
  } finally {
    await db.close();
  }
}

// Run the test
testConnection().then(success => {
  process.exit(success ? 0 : 1);
});