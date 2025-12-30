#!/bin/bash
# Setup Script for Linux/Mac

echo "=================================="
echo "Product Management App Setup"
echo "=================================="
echo ""

# Check if Node.js is installed
echo "Checking Node.js installation..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "✓ Node.js is installed: $NODE_VERSION"
else
    echo "✗ Node.js is not installed. Please install Node.js 20+ from https://nodejs.org/"
    exit 1
fi

# Check if Docker is installed
echo "Checking Docker installation..."
if command -v docker &> /dev/null; then
    DOCKER_VERSION=$(docker --version)
    echo "✓ Docker is installed: $DOCKER_VERSION"
else
    echo "⚠ Docker is not installed. Docker is optional but recommended."
fi

echo ""
echo "=================================="
echo "Installing Dependencies"
echo "=================================="
echo ""

# Install backend dependencies
echo "Installing backend dependencies..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "✗ Backend dependency installation failed"
    exit 1
fi
echo "✓ Backend dependencies installed"
cd ..

# Install frontend dependencies
echo "Installing frontend dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "✗ Frontend dependency installation failed"
    exit 1
fi
echo "✓ Frontend dependencies installed"

echo ""
echo "=================================="
echo "Environment Configuration"
echo "=================================="
echo ""

# Create backend .env if it doesn't exist
if [ ! -f "backend/.env" ]; then
    echo "Creating backend .env file..."
    cp backend/.env.example backend/.env
    echo "⚠ Please update backend/.env with your Neon database URL"
else
    echo "✓ Backend .env already exists"
fi

# Create frontend .env if it doesn't exist
if [ ! -f ".env" ]; then
    echo "Creating frontend .env file..."
    cp .env.example .env
    echo "✓ Frontend .env created"
else
    echo "✓ Frontend .env already exists"
fi

echo ""
echo "=================================="
echo "Setup Complete!"
echo "=================================="
echo ""
echo "Next steps:"
echo "1. Create a Neon database at https://neon.tech"
echo "2. Update backend/.env with your DATABASE_URL"
echo "3. Start the backend: cd backend && npm run start:dev"
echo "4. In a new terminal, start frontend: npm run dev"
echo "5. Seed initial data: curl -X POST http://localhost:3001/products/seed"
echo ""
echo "Or use Docker:"
echo "docker-compose up --build"
echo ""
echo "For deployment instructions, see DEPLOYMENT.md"
