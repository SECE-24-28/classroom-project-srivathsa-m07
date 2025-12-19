@echo off
echo 🚀 MongoDB Setup for Mobile Recharge App
echo.

echo [1/4] Checking if MongoDB is installed...
where mongod >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ MongoDB is already installed
    goto :start_mongo
) else (
    echo ❌ MongoDB not found
    echo.
    echo 📥 Please install MongoDB Community Server from:
    echo https://www.mongodb.com/try/download/community
    echo.
    echo After installation, run this script again.
    pause
    exit /b 1
)

:start_mongo
echo.
echo [2/4] Creating data directory...
if not exist "data\db" mkdir data\db

echo.
echo [3/4] Starting MongoDB server...
start "MongoDB Server" cmd /k "mongod --dbpath data\db --port 27017"

echo.
echo [4/4] Waiting for MongoDB to start...
timeout /t 5 /nobreak > nul

echo.
echo ✅ MongoDB setup complete!
echo 🌐 MongoDB running on: mongodb://localhost:27017
echo 📊 Database: recharge_pro
echo.
echo Press any key to continue...
pause > nul