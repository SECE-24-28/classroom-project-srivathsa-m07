@echo off
echo Building React App...
call npm run build

echo.
echo Starting Server on Port 3000...
cd backend
call npm start
