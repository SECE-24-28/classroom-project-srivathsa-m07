@echo off
echo ========================================
echo    RECHARGE APP - MONGODB ATLAS ONLY
echo ========================================
echo.

echo 🔄 Testing MongoDB Atlas connection first...
node test-atlas-connection.js

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ Atlas connection successful! Starting server...
    echo.
    node server.js
) else (
    echo.
    echo ❌ Atlas connection failed! Please fix the connection issues first.
    echo.
    pause
)