@echo off
echo Starting RechargePro Application...
echo.

echo Starting Backend Server...
start cmd /k "cd backend && npm start"

timeout /t 3 /nobreak > nul

echo Starting Frontend Server...
start cmd /k "npm run dev"

echo.
echo ✅ Both servers are starting!
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo.
pause
