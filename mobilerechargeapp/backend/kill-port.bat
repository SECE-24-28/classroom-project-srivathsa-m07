@echo off
echo Killing all Node.js processes...
taskkill /f /im node.exe
echo Done! Port 3000 should be free now.
pause
