@echo off
REM Quick development start script for Windows

echo ================================
echo Starting Product Management App
echo ================================
echo.
echo Backend: http://localhost:3001
echo Frontend: http://localhost:5173
echo.
echo Press Ctrl+C to stop both servers
echo.

REM Start backend in a new window
start "Backend Server" cmd /k "cd backend && npm run start:dev"

REM Wait a bit for backend to start
timeout /t 3 /nobreak > nul

REM Start frontend in current window
npm run dev
