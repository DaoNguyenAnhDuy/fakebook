@echo off
title Fakebook Server
echo ================================
echo   FAKEBOOK - Khoi dong server
echo ================================
echo.

cd /d C:\fakebook

REM Kiem tra file .env
echo [1/3] Kiem tra .env...
if not exist .env (
    echo    ❌ KHONG TIM THAY FILE .env !
    echo    Vui long tao file .env voi noi dung:
    echo    DATABASE_URL=postgresql://...
    pause
    exit /b 1
)
echo    .env OK

REM Kill process dang chiem port 3001 (neu co)
echo [2/3] Kiem tra port 3001...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":3001 " ^| findstr "LISTENING"') do (
    echo    - Dang tat server cu (PID: %%a)
    taskkill /PID %%a /F >nul 2>&1
)
timeout /t 1 >nul

echo [3/3] Dang khoi dong server...
echo.
echo    Web chay tai: http://localhost:3001
echo    Nhan Ctrl+C de dung server
echo.

npm run dev
