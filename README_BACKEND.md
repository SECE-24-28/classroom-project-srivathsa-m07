# RechargePro - Full Stack Application

## 🚀 Quick Start

### Option 1: Use Startup Script (Recommended)
```cmd
start.bat
```

### Option 2: Manual Start

**Terminal 1 - Backend:**
```cmd
cd backend
npm start
```

**Terminal 2 - Frontend:**
```cmd
npm run dev
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create account
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get user data

### Plans
- `GET /api/plans` - Get all operators
- `GET /api/plans/:operator` - Get plans by operator

### Recharge
- `POST /api/recharge` - Create recharge
- `GET /api/recharge` - Get user recharges
- `GET /api/recharge/stats` - Get recharge statistics

## 🔧 Tech Stack

**Backend:**
- Express.js
- JWT Authentication
- Bcrypt for password hashing
- CORS enabled

**Frontend:**
- React + Vite
- Tailwind CSS
- React Router

## 🌐 URLs
- Backend: http://localhost:5000
- Frontend: http://localhost:5173
