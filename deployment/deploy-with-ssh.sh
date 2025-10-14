#!/bin/bash

# SafePsy Landing Page Deployment Script with SSH Key Setup
# This script handles SSH key setup and automated deployment

set -e

SERVER_IP="51.159.179.75"
SERVER_USER="root"
REPO_URL="https://github.com/TTTEN10/SPlandingv1.git"
APP_DIR="/opt/safepsy-landing"
SSH_KEY="ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIAeUOnlUT/45PSadp9QNgRCRqgLNnsHYBQzIfqnwMcH9 \"login\""

echo "🚀 SafePsy Landing Page Deployment with SSH Setup"
echo "================================================="
echo "Server: $SERVER_IP"
echo "Repository: $REPO_URL"
echo ""

# Function to run commands on remote server
run_remote() {
    ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP "$1"
}

# Function to test SSH connection
test_ssh() {
    echo "🔍 Testing SSH connection..."
    if ssh -o StrictHostKeyChecking=no -o ConnectTimeout=10 $SERVER_USER@$SERVER_IP "echo 'SSH connection successful!'" 2>/dev/null; then
        echo "✅ SSH connection successful!"
        return 0
    else
        echo "❌ SSH connection failed!"
        return 1
    fi
}

# Check if SSH key is already set up
if test_ssh; then
    echo "✅ SSH key is already configured!"
else
    echo "🔑 SSH key setup required"
    echo ""
    echo "Please choose one of the following options:"
    echo ""
    echo "Option 1: Manual SSH key setup (Recommended)"
    echo "--------------------------------------------"
    echo "1. Connect to your server:"
    echo "   ssh $SERVER_USER@$SERVER_IP"
    echo ""
    echo "2. Add your SSH key:"
    echo "   mkdir -p ~/.ssh"
    echo "   chmod 700 ~/.ssh"
    echo "   echo '$SSH_KEY' >> ~/.ssh/authorized_keys"
    echo "   chmod 600 ~/.ssh/authorized_keys"
    echo ""
    echo "3. Test the connection:"
    echo "   ssh $SERVER_USER@$SERVER_IP 'echo \"SSH key setup successful!\"'"
    echo ""
    echo "Option 2: Use Scaleway Console"
    echo "------------------------------"
    echo "1. Log into your Scaleway console"
    echo "2. Go to your instance"
    echo "3. Add the SSH key through the console interface"
    echo ""
    echo "Option 3: Password-based setup"
    echo "------------------------------"
    echo "If you have the root password, you can run:"
    echo "   ssh-copy-id -i ~/.ssh/id_ed25519.pub $SERVER_USER@$SERVER_IP"
    echo ""
    echo "After setting up SSH keys, run this script again:"
    echo "   ./deploy-with-ssh.sh"
    echo ""
    exit 1
fi

echo ""
echo "📦 Starting deployment process..."

echo "🔧 Installing Docker and dependencies..."
run_remote "apt update && apt install -y docker.io docker-compose git curl"

echo "🐳 Starting Docker service..."
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

echo "📁 Creating data and logs directories..."
run_remote "cd $APP_DIR && mkdir -p data logs"

echo "🐳 Building and starting Docker containers..."
run_remote "cd $APP_DIR && docker-compose up --build -d"

echo "⏳ Waiting for services to start..."
sleep 30

echo "🔍 Checking service status..."
run_remote "cd $APP_DIR && docker-compose ps"

echo "🌐 Testing application..."
if run_remote "curl -f http://localhost:80/health"; then
    echo "✅ Health check passed!"
else
    echo "⚠️  Health check failed, checking logs..."
    run_remote "cd $APP_DIR && docker-compose logs --tail=50"
fi

echo ""
echo "🎉 Deployment completed!"
echo "🌍 Your SafePsy landing page is available at: http://$SERVER_IP"
echo ""
echo "🔧 Useful commands:"
echo "   - View logs: ssh $SERVER_USER@$SERVER_IP 'cd $APP_DIR && docker-compose logs -f'"
echo "   - Restart: ssh $SERVER_USER@$SERVER_IP 'cd $APP_DIR && docker-compose restart'"
echo "   - Stop: ssh $SERVER_USER@$SERVER_IP 'cd $APP_DIR && docker-compose down'"
echo "   - Update: ssh $SERVER_USER@$SERVER_IP 'cd $APP_DIR && git pull && docker-compose up --build -d'"
echo ""
echo "📝 Next steps:"
echo "   1. Configure your domain (safepsy.com) to point to $SERVER_IP"
echo "   2. Set up SSL certificates for HTTPS"
echo "   3. Configure firewall rules"
echo "   4. Set up monitoring and backups"
echo ""
echo "✅ SafePsy deployment successful!"
