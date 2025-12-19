@echo off
echo 🌐 Starting Mobile Recharge App with MongoDB Atlas
echo.

echo [1/3] Testing Atlas connection...
cd backend
node test-atlas-only.js
if %errorlevel% neq 0 (
    echo.
    echo ❌ Atlas connection failed!
    echo Please check your .env file and Atlas setup.
    echo See ATLAS_SETUP.md for instructions.
    pause
    exit /b 1
)

echo.
echo [2/3] Starting backend server...
start "Backend Server" cmd /k "npm start"

echo.
echo [3/3] Starting frontend...
cd ..
timeout /t 3 /nobreak > nul
start "Frontend Dev Server" cmd /k "npm run dev"

echo.
echo ✅ Application started with MongoDB Atlas!
echo 🌐 Frontend: http://localhost:5173
echo 📡 Backend: http://localhost:3000
echo 🗄️  Database: MongoDB Atlas
echo.
pause