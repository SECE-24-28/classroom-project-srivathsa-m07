# Run Instructions

## Step 1: Stop Current Server
Press Ctrl+C in the terminal running your backend server

## Step 2: Restart Backend
```cmd
cd c:\Users\Administrator\Downloads\recharge_assignment_full\Day6\mobilerechargeapp\backend
node server.js
```

Wait for:
```
✅ Connected to MongoDB
✅ Plans seeded
🚀 Server is running at http://localhost:3000
```

## Step 3: Build Frontend (Open NEW Terminal)
```cmd
cd c:\Users\Administrator\Downloads\recharge_assignment_full\Day6\mobilerechargeapp
npm run build
```

Wait for build to complete

## Step 4: Test Application
Visit: http://localhost:3000

## Changes Made:
- Removed ALL emojis from entire application
- Changed theme from purple/pink to indigo/blue/cyan
- Changed name from RechargePro to InstaCharge
- Created unique logo with chart icon
- Professional design with smooth animations
- Review feature already exists in Profile page
- Reviews display on homepage (real data, not dummy)

## To Submit Review:
1. Login
2. Click "Profile" in navbar
3. Rate with stars (1-5)
4. Write comment
5. Click "Submit Review"
6. Go to homepage - your review appears in carousel
