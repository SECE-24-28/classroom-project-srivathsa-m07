@echo off
echo ========================================
echo    STARTING FRONTEND - REACT APP
echo ========================================
echo.

echo Installing frontend dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo Starting React development server...
echo.
echo ✅ Frontend will start on: http://localhost:5173
echo ✅ Make sure backend is running on: http://localhost:3000
echo.

npm run dev