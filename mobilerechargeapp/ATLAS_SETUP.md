# 🌐 MongoDB Atlas Setup Guide

## Step-by-Step Atlas Configuration

### 1. Create Atlas Account & Cluster
1. Go to https://www.mongodb.com/atlas
2. Sign in to your account
3. Click **"Build a Database"**
4. Choose **"M0 Sandbox"** (FREE)
5. Provider: **AWS**
6. Region: Choose closest to you
7. Cluster Name: `recharge-cluster`
8. Click **"Create Cluster"**

### 2. Create Database User
1. Click **"Database Access"** (left menu)
2. Click **"Add New Database User"**
3. Authentication Method: **Password**
4. Username: `rechargeuser`
5. Password: `recharge123`
6. Database User Privileges: **"Read and write to any database"**
7. Click **"Add User"**

### 3. Configure Network Access
1. Click **"Network Access"** (left menu)
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Click **"Confirm"**

### 4. Get Connection String
1. Go to **"Database"** (left menu)
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Driver: **Node.js**
5. Version: **4.1 or later**
6. Copy the connection string

### 5. Update Your Project
1. Open: `backend/.env`
2. Replace `PASTE_YOUR_ATLAS_CONNECTION_STRING_HERE` with your connection string
3. Make sure to replace `<password>` with `recharge123`

**Example connection string:**
```
mongodb+srv://rechargeuser:recharge123@recharge-cluster.xxxxx.mongodb.net/recharge_pro?retryWrites=true&w=majority
```

### 6. Test Connection
```bash
cd backend
node test-atlas-only.js
```

### 7. Start Application
```bash
# Backend
cd backend
npm start

# Frontend (new terminal)
cd ..
npm run dev
```

## ✅ Your .env should look like:
```
PORT=3000
DB_NAME=recharge_pro
MONGODB_URI=mongodb+srv://rechargeuser:recharge123@recharge-cluster.xxxxx.mongodb.net/recharge_pro?retryWrites=true&w=majority
SESSION_SECRET=recharge-pro-secret-key-change-in-production
JWT_SECRET=your-jwt-secret-key-change-in-production
NODE_ENV=development
```

## 🚀 URLs After Setup:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000
- Atlas Dashboard: https://cloud.mongodb.com