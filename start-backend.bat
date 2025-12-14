@echo off
echo ========================================
echo Starting Sweet Shop Backend Server
echo ========================================
echo.
cd backend
echo Generating Prisma Client...
call npx prisma generate
echo.
echo Starting NestJS Server...
echo Backend will run on http://localhost:3000
echo.
call npm run start:dev
