@echo off
echo Starting Mobile Recharge App...
echo.

echo [1/3] Installing dependencies...
cd backend
call npm install
cd ..
call npm install

echo.
echo [2/3] Starting backend server...
start "Backend Server" cmd /k "cd backend && npm start"

echo.
echo [3/3] Starting frontend...
timeout /t 3 /nobreak > nul
start "Frontend Dev Server" cmd /k "npm run dev"

echo.
echo ✅ Application started successfully!
echo 🚀 Frontend: http://localhost:5173
echo 📡 Backend: http://localhost:3000
echo.
pause