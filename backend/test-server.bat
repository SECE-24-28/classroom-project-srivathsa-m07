@echo off
echo Testing Backend Server...
echo.

timeout /t 2 /nobreak > nul

echo 1. Testing Health Endpoint...
curl -s http://localhost:3000/api/health
echo.
echo.

echo 2. Testing Plans Endpoint...
curl -s http://localhost:3000/api/plans
echo.
echo.

echo 3. Testing Airtel Plans...
curl -s http://localhost:3000/api/plans/airtel
echo.
echo.

echo Tests Complete!
pause
