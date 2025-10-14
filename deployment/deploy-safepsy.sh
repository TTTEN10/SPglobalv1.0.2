#!/bin/bash

# SafePsy Landing Page Deployment Script
# Deploy to Scaleway server at 51.159.179.75

set -e

SERVER_IP="51.159.179.75"
SERVER_USER="root"
REPO_URL="https://github.com/TTTEN10/SPlandingv1.git"
APP_DIR="/opt/safepsy-landing"

echo "🚀 Starting SafePsy Landing Page Deployment"
echo "Server: $SERVER_IP"
echo "Repository: $REPO_URL"

# Function to run commands on remote server
run_remote() {
    ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP "$1"
}

# Function to copy files to remote server
copy_to_remote() {
    scp -o StrictHostKeyChecking=no "$1" $SERVER_USER@$SERVER_IP:"$2"
}

echo "📦 Installing Docker and dependencies..."
run_remote "apt update && apt install -y docker.io docker-compose git curl"

echo "🔧 Starting Docker service..."
run_remote "systemctl start docker && systemctl enable docker"

echo "📁 Creating application directory..."
run_remote "mkdir -p $APP_DIR && cd $APP_DIR"

echo "📥 Cloning repository..."
run_remote "cd $APP_DIR && git clone $REPO_URL ."

echo "🔧 Creating production environment files..."

# Create production .env file
run_remote "cat > $APP_DIR/.env << 'EOF'
# SafePsy Landing Page Production Configuration
NODE_ENV=production
PORT=3001
DATABASE_URL=file:./prod.db
FRONTEND_URL=https://safepsy.com
IP_HASHING_ENABLED=false
IP_SALT=\$(openssl rand -hex 32)
PLAUSIBLE_DOMAIN=safepsy.com
ENABLE_CONFIRMATION_EMAIL=false
EOF"

# Create production backend .env file
run_remote "cat > $APP_DIR/backend/.env << 'EOF'
# SafePsy Backend Production Configuration
NODE_ENV=production
PORT=3001
DATABASE_URL=file:./prod.db
FRONTEND_URL=https://safepsy.com
IP_HASHING_ENABLED=false
IP_SALT=\$(openssl rand -hex 32)
PLAUSIBLE_DOMAIN=safepsy.com
ENABLE_CONFIRMATION_EMAIL=false
EOF"

# Create production frontend .env file
run_remote "cat > $APP_DIR/frontend/.env << 'EOF'
# SafePsy Frontend Production Configuration
VITE_PLAUSIBLE_DOMAIN=safepsy.com
VITE_API_URL=https://safepsy.com/api
EOF"

echo "🐳 Building and starting Docker containers..."
run_remote "cd $APP_DIR && docker-compose up --build -d"

echo "⏳ Waiting for services to start..."
sleep 30

echo "🔍 Checking service status..."
run_remote "cd $APP_DIR && docker-compose ps"

echo "🌐 Testing application..."
run_remote "curl -f http://localhost:80/health || echo 'Health check failed'"

echo "✅ Deployment completed!"
echo "🌍 Your SafePsy landing page should be available at: http://$SERVER_IP"
echo "🔧 To check logs: ssh $SERVER_USER@$SERVER_IP 'cd $APP_DIR && docker-compose logs -f'"
echo "🛑 To stop: ssh $SERVER_USER@$SERVER_IP 'cd $APP_DIR && docker-compose down'"
echo "🔄 To restart: ssh $SERVER_USER@$SERVER_IP 'cd $APP_DIR && docker-compose restart'"
