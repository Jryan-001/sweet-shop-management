@echo off
echo ========================================
echo Sweet Shop Management System - Setup
echo ========================================
echo.

echo Step 1: Setting up Backend...
cd backend
echo - Generating Prisma Client...
call npx prisma generate
if %errorlevel% neq 0 (
    echo ERROR: Prisma generate failed!
    pause
    exit /b 1
)

echo - Applying Database Migrations...
call npx prisma migrate deploy
if %errorlevel% neq 0 (
    echo ERROR: Database migration failed!
    echo Make sure PostgreSQL is running on localhost:5432
    pause
    exit /b 1
)

echo - Seeding Database with Sample Data...
call npm run seed
if %errorlevel% neq 0 (
    echo WARNING: Seeding failed, but you can continue
)

cd ..

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next Steps:
echo 1. Open TWO terminal windows
echo 2. In Terminal 1: Run start-backend.bat
echo 3. In Terminal 2: Run start-frontend.bat
echo 4. Open browser: http://localhost:5173
echo.
echo Test Credentials:
echo Admin: admin@sweetshop.com / admin123
echo User:  user@sweetshop.com / user123
echo.
pause
