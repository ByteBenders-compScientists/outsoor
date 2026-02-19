@echo off
echo Running database migrations...
call npm run migrate
echo.
echo Creating admin user...
node scripts/create-admin-user.js
pause
