# ✅ How to Check if Everything is Working

## 1️⃣ Check MongoDB Connection
Open browser and go to:
```
http://localhost:3000/api/health
```
**Expected Result:** `{"status":"ok","message":"Server is running"}`

---

## 2️⃣ Check Plans API (MongoDB Data)
Open browser and go to:
```
http://localhost:3000/api/plans
```
**Expected Result:** List of operators (Airtel, Jio, Vi, BSNL)

---

## 3️⃣ Check Airtel Plans (MongoDB Query)
Open browser and go to:
```
http://localhost:3000/api/plans/airtel
```
**Expected Result:** List of 5 Airtel plans with prices

---

## 4️⃣ Test Full Application Flow

### Step 1: Create Account
1. Go to: http://localhost:3000
2. Click "Sign Up"
3. Fill form:
   - Name: Test User
   - Email: test@example.com
   - Password: test123
4. Click "Create Account"
5. **Expected:** Success message → redirects to login

### Step 2: Login
1. Enter email: test@example.com
2. Enter password: test123
3. Click "Login"
4. **Expected:** Redirects to Dashboard

### Step 3: Make Recharge
1. Click "Plans" in navbar
2. Enter mobile number: 9876543210
3. Select operator: Airtel (or any)
4. Click on any plan card
5. Click "Recharge Now"
6. **Expected:** Success message → redirects to Dashboard

### Step 4: Check Dashboard
1. Go to Dashboard
2. **Expected:** 
   - Total Spent shows amount
   - Recharges count shows 1
   - Recent Recharges shows your transaction

---

## 5️⃣ Verify MongoDB Data Directly

Open Command Prompt and run:
```cmd
mongosh
```

Then run these commands:
```javascript
use recharge_pro
db.users.find().pretty()
db.recharges.find().pretty()
db.plans.countDocuments()
```

**Expected:**
- users collection has your account
- recharges collection has your transaction
- plans collection has 20 plans

---

## ✅ Connection Status Summary

| Component | Status | How to Verify |
|-----------|--------|---------------|
| **Backend Server** | ✅ Running | http://localhost:3000/api/health |
| **MongoDB** | ✅ Connected | Plans API returns data |
| **Database** | ✅ recharge_pro | 3 collections created |
| **Plans Seeded** | ✅ 20 plans | http://localhost:3000/api/plans/airtel |
| **Frontend** | ✅ Served | http://localhost:3000 shows website |

---

## 🔍 Quick Test Commands

Run in Command Prompt:
```cmd
cd backend
node test-connection.js
```

This will test all MongoDB connections and show results.

---

## ❌ If Something Doesn't Work

1. **MongoDB not running?**
   - Start MongoDB service
   - Check: `mongosh --eval "db.version()"`

2. **Server not starting?**
   - Check if port 3000 is free
   - Look at server console for errors

3. **API not responding?**
   - Make sure server is running
   - Check: http://localhost:3000/api/health

4. **No data showing?**
   - Run: `node test-connection.js` to seed data
   - Check MongoDB: `mongosh` → `use recharge_pro` → `db.plans.find()`
