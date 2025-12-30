# Setup Script for Windows
# Run this script in PowerShell

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Product Management App Setup" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js is installed: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js is not installed. Please install Node.js 20+ from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Check if Docker is installed
Write-Host "Checking Docker installation..." -ForegroundColor Yellow
try {
    $dockerVersion = docker --version
    Write-Host "✓ Docker is installed: $dockerVersion" -ForegroundColor Green
} catch {
    Write-Host "⚠ Docker is not installed. Docker is optional but recommended." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Installing Dependencies" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Install backend dependencies
Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
Set-Location backend
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Backend dependency installation failed" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Backend dependencies installed" -ForegroundColor Green
Set-Location ..

# Install frontend dependencies
Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Frontend dependency installation failed" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Frontend dependencies installed" -ForegroundColor Green

Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Environment Configuration" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Create backend .env if it doesn't exist
if (!(Test-Path "backend\.env")) {
    Write-Host "Creating backend .env file..." -ForegroundColor Yellow
    Copy-Item "backend\.env.example" "backend\.env"
    Write-Host "⚠ Please update backend\.env with your Neon database URL" -ForegroundColor Yellow
} else {
    Write-Host "✓ Backend .env already exists" -ForegroundColor Green
}

# Create frontend .env if it doesn't exist
if (!(Test-Path ".env")) {
    Write-Host "Creating frontend .env file..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "✓ Frontend .env created" -ForegroundColor Green
} else {
    Write-Host "✓ Frontend .env already exists" -ForegroundColor Green
}

Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Setup Complete!" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Create a Neon database at https://neon.tech" -ForegroundColor White
Write-Host "2. Update backend\.env with your DATABASE_URL" -ForegroundColor White
Write-Host "3. Start the backend: cd backend && npm run start:dev" -ForegroundColor White
Write-Host "4. In a new terminal, start frontend: npm run dev" -ForegroundColor White
Write-Host "5. Seed initial data: curl -X POST http://localhost:3001/products/seed" -ForegroundColor White
Write-Host ""
Write-Host "Or use Docker:" -ForegroundColor Yellow
Write-Host "docker-compose up --build" -ForegroundColor White
Write-Host ""
Write-Host "For deployment instructions, see DEPLOYMENT.md" -ForegroundColor Cyan
