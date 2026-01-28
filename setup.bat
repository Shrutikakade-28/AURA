@echo off
REM Aura Wellness Chatbot Setup Script for Windows
REM This script sets up the development environment for the Aura chatbot

echo.
echo 🌟 Setting up Aura Wellness Chatbot...
echo ======================================
echo.

REM Check if Node.js is installed
echo [INFO] Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js 18 or higher.
    echo Visit: https://nodejs.org/
    pause
    exit /b 1
) else (
    for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
    echo [SUCCESS] Node.js is installed: %NODE_VERSION%
)

REM Check if npm is installed
echo [INFO] Checking npm installation...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] npm is not installed. Please install npm.
    pause
    exit /b 1
) else (
    for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
    echo [SUCCESS] npm is installed: %NPM_VERSION%
)

REM Install dependencies
echo [INFO] Installing dependencies...
echo [INFO] Installing root dependencies...
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install root dependencies
    pause
    exit /b 1
)

echo [INFO] Installing server dependencies...
cd server
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install server dependencies
    pause
    exit /b 1
)
cd ..

echo [INFO] Installing client dependencies...
cd client
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install client dependencies
    pause
    exit /b 1
)
cd ..

echo [SUCCESS] All dependencies installed successfully!

REM Setup environment files
echo [INFO] Setting up environment files...

if not exist "server\.env" (
    echo [INFO] Creating server environment file...
    copy "server\env.example" "server\.env" >nul
    echo [WARNING] Please edit server\.env with your Google Cloud credentials
) else (
    echo [SUCCESS] Server environment file already exists
)

if not exist "client\.env" (
    echo [INFO] Creating client environment file...
    copy "client\env.example" "client\.env" >nul
    echo [WARNING] Please edit client\.env with your configuration
) else (
    echo [SUCCESS] Client environment file already exists
)

REM Create necessary directories
echo [INFO] Creating necessary directories...
if not exist "logs" mkdir logs
if not exist "uploads" mkdir uploads
if not exist "temp" mkdir temp
echo [SUCCESS] Directories created successfully!

REM Check Google Cloud CLI
echo [INFO] Checking Google Cloud CLI...
gcloud --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [WARNING] Google Cloud CLI is not installed.
    echo Install it from: https://cloud.google.com/sdk/docs/install
) else (
    for /f "tokens=*" %%i in ('gcloud --version ^| findstr "Google Cloud SDK"') do set GCLOUD_VERSION=%%i
    echo [SUCCESS] Google Cloud CLI is installed: %GCLOUD_VERSION%
)

echo.
echo 🎉 Setup completed successfully!
echo ================================
echo.
echo Next steps:
echo 1. Configure Google Cloud:
echo    - Enable Vertex AI API
echo    - Enable Cloud Language API
echo    - Create service account and download key
echo.
echo 2. Update environment files:
echo    - Edit server\.env with your Google Cloud credentials
echo    - Edit client\.env with your configuration
echo.
echo 3. Start development server:
echo    npm run dev
echo.
echo 4. Or start services separately:
echo    npm run server  # Backend on port 5000
echo    npm run client  # Frontend on port 3000
echo.
echo 5. Access the application:
echo    Frontend: http://localhost:3000
echo    Backend: http://localhost:5000
echo.
echo 📚 Documentation:
echo    - README.md - Project overview
echo    - DEPLOYMENT.md - Deployment guide
echo.
echo 🆘 Crisis Support:
echo    If you're in immediate danger, call: 1800-599-0019
echo.
echo Happy coding! 🌟
echo.
pause
