#!/bin/bash

# SafePsy Landing Page Deployment Script
# Deploy to Scaleway server at 51.159.179.75
# SECURITY: Requires SSH key authentication, runs as non-root user

set -e

# Configuration - Update these values for your environment
SERVER_IP="51.159.179.75"
SERVER_USER="safepsy"  # Use non-root user for security
REPO_URL="https://github.com/TTTEN10/SPglobalv1.0.2.git"
APP_DIR="/opt/safepsy-landing"

echo "🚀 Starting SafePsy Landing Page Deployment"
echo "Server: $SERVER_IP"
echo "User: $SERVER_USER"
echo "Repository: $REPO_URL"

# Function to run commands on remote server
# SECURITY: Uses proper host key checking (remove the `-o StrictHostKeyChecking=no` for production)
run_remote() {
    ssh -o PasswordAuthentication=no -o StrictHostKeyChecking=ask $SERVER_USER@$SERVER_IP "$1"
}

# Function to copy files to remote server
copy_to_remote() {
    scp -o PasswordAuthentication=no -o StrictHostKeyChecking=ask "$1" $SERVER_USER@$SERVER_IP:"$2"
}

echo "🔐 Checking server access..."
# Verify we can connect securely
if ! run_remote "echo 'Connection verified'" 2>/dev/null; then
  echo "❌ ERROR: Cannot connect to server. Please ensure:"
  echo "   1. SSH key is added to server: ssh-copy-id $SERVER_USER@$SERVER_IP"
  echo "   2. Server user '$SERVER_USER' has sudo privileges"
  echo "   3. SSH keys are properly configured"
  exit 1
fi

echo "📦 Installing Docker and dependencies..."
run_remote "sudo apt update && sudo apt install -y docker.io docker-compose-plugin git curl"

echo "🔧 Configuring Docker for non-root user..."
run_remote "sudo usermod -aG docker $SERVER_USER" || true

echo "🔧 Starting Docker service..."
run_remote "sudo systemctl start docker && sudo systemctl enable docker"

echo "📁 Creating application directory..."
run_remote "sudo mkdir -p $APP_DIR && sudo chown $SERVER_USER:$SERVER_USER $APP_DIR"

echo "📥 Cloning repository..."
run_remote "cd $APP_DIR && git clone $REPO_URL . || (cd $APP_DIR && git pull)"

echo "🔧 Creating production environment files..."
echo "⚠️  WARNING: You must set POSTGRES_PASSWORD and IP_SALT environment variables before deployment"
echo "   Generate secure values with:"
echo "   - IP_SALT: openssl rand -hex 32"
echo "   - POSTGRES_PASSWORD: openssl rand -base64 32"

# Check if required environment variables are set
if [ -z "$POSTGRES_PASSWORD" ] || [ -z "$IP_SALT" ]; then
  echo "❌ ERROR: POSTGRES_PASSWORD and IP_SALT must be set"
  echo "   Run: export POSTGRES_PASSWORD=\$(openssl rand -base64 32)"
  echo "        export IP_SALT=\$(openssl rand -hex 32)"
  exit 1
fi

# Create production .env file
run_remote "cat > $APP_DIR/.env << 'EOF'
# SafePsy Landing Page Production Configuration
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://safepsy_user:${POSTGRES_PASSWORD}@postgres:5432/safepsy_prod
FRONTEND_URL=https://safepsy.com
IP_HASHING_ENABLED=false
IP_SALT=${IP_SALT}
PLAUSIBLE_DOMAIN=safepsy.com
ENABLE_CONFIRMATION_EMAIL=false
EOF"

# Create production backend .env file
run_remote "cat > $APP_DIR/apps/api/.env << 'EOF'
# SafePsy Backend Production Configuration
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://safepsy_user:${POSTGRES_PASSWORD}@postgres:5432/safepsy_prod
FRONTEND_URL=https://safepsy.com
IP_HASHING_ENABLED=false
IP_SALT=${IP_SALT}
PLAUSIBLE_DOMAIN=safepsy.com
ENABLE_CONFIRMATION_EMAIL=false
EOF"

# Create production frontend .env file
run_remote "cat > $APP_DIR/apps/web/.env << 'EOF'
# SafePsy Frontend Production Configuration
VITE_PLAUSIBLE_DOMAIN=safepsy.com
VITE_API_URL=https://safepsy.com/api
EOF"

echo "🐳 Building and starting Docker containers..."
run_remote "cd $APP_DIR && docker compose -f docker-compose.prod.yml up --build -d"

echo "⏳ Waiting for services to start..."
sleep 30

echo "🔍 Checking service status..."
run_remote "cd $APP_DIR && docker compose -f docker-compose.prod.yml ps"

echo "🌐 Testing application..."
run_remote "curl -f http://localhost:80/health || echo 'Health check failed'"

echo "✅ Deployment completed!"
echo "🌍 Your SafePsy landing page should be available at: https://safepsy.com"
echo ""
echo "🔧 Management commands:"
echo "   Check logs: ssh $SERVER_USER@$SERVER_IP 'cd $APP_DIR && docker compose -f docker-compose.prod.yml logs -f'"
echo "   Stop: ssh $SERVER_USER@$SERVER_IP 'cd $APP_DIR && docker compose -f docker-compose.prod.yml down'"
echo "   Restart: ssh $SERVER_USER@$SERVER_IP 'cd $APP_DIR && docker compose -f docker-compose.prod.yml restart'"
echo ""
echo "🔐 Security reminders:"
echo "   - Database password: POSTGRES_PASSWORD (keep secure)"
echo "   - IP hashing salt: IP_SALT (keep secure)"
echo "   - Review log files for any issues"
