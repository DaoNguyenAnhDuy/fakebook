@echo off
title Fakebook Server
echo ================================
echo   FAKEBOOK - Khoi dong server
echo ================================
echo.

cd /d C:\fakebook

REM Kill process dang chiem port 3001 (neu co)
echo [1/2] Kiem tra port 3001...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3001 ^| findstr LISTENING') do (
    echo    - Dang tat process cu (PID: %%a)
    taskkill /PID %%a /F >nul 2>&1
)

echo [2/2] Dang khoi dong server...
echo.
echo    Web se chay tai: http://localhost:3001
echo    Nhan Ctrl+C de dung server
echo.

npm run dev
