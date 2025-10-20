#!/bin/bash

# Simple SafePsy Landing Page Deployment Script
# Deploy to Scaleway server at 51.159.179.75

set -e

SERVER_IP="51.159.179.75"
SERVER_USER="root"
APP_DIR="/opt/safepsy-landing"

echo "🚀 Starting Simple SafePsy Landing Page Deployment"
echo "Server: $SERVER_IP"

# Function to run commands on remote server
run_remote() {
    ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP "$1"
}

# Function to copy files to remote server
copy_to_remote() {
    scp -o StrictHostKeyChecking=no -r "$1" $SERVER_USER@$SERVER_IP:"$2"
}

echo "📦 Installing Node.js and dependencies..."
run_remote "curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && apt-get install -y nodejs"

echo "📦 Installing Caddy..."
run_remote "if ! command -v caddy &> /dev/null; then
    apt install -y debian-keyring debian-archive-keyring apt-transport-https
    curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
    curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | tee /etc/apt/sources.list.d/caddy-stable.list
    apt update && apt install caddy
else
    echo 'Caddy is already installed'
fi"

echo "📁 Creating application directory..."
run_remote "mkdir -p $APP_DIR"

echo "📥 Copying built application files..."
copy_to_remote "/Users/thibauttenenbaum/Desktop/SP/SPglobalv1.0.2/apps/web/dist" "$APP_DIR/frontend/"
copy_to_remote "/Users/thibauttenenbaum/Desktop/SP/SPglobalv1.0.2/apps/api/dist" "$APP_DIR/backend/"
copy_to_remote "/Users/thibauttenenbaum/Desktop/SP/SPglobalv1.0.2/apps/api/node_modules" "$APP_DIR/backend/"
copy_to_remote "/Users/thibauttenenbaum/Desktop/SP/SPglobalv1.0.2/apps/api/package.json" "$APP_DIR/backend/"
copy_to_remote "/Users/thibauttenenbaum/Desktop/SP/SPglobalv1.0.2/prisma" "$APP_DIR/backend/"

echo "🔧 Creating production environment files..."

# Create production .env file
run_remote "cat > $APP_DIR/.env << 'EOF'
# SafePsy Landing Page Production Configuration
NODE_ENV=production
PORT=3000
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
PORT=3000
DATABASE_URL=file:./prod.db
FRONTEND_URL=https://safepsy.com
IP_HASHING_ENABLED=false
IP_SALT=\$(openssl rand -hex 32)
PLAUSIBLE_DOMAIN=safepsy.com
ENABLE_CONFIRMATION_EMAIL=false
EOF"

echo "🔧 Creating Caddyfile..."
run_remote "cat > /etc/caddy/Caddyfile << 'EOF'
# Caddyfile for SPGlobalv1.0.2 application

# Global options
{
    # Security headers
    servers {
        metrics
    }
}

# Main site configuration for safepsy.com
safepsy.com, 51.159.179.75 {
    # Security headers
    header {
        X-Frame-Options \"SAMEORIGIN\"
        X-Content-Type-Options \"nosniff\"
        X-XSS-Protection \"1; mode=block\"
        Referrer-Policy \"strict-origin-when-cross-origin\"
    }

    # Serve static files from frontend with caching
    root * $APP_DIR/frontend
    file_server {
        hide .git
        hide .env
    }

    # API routes - proxy to backend
    handle /api/* {
        reverse_proxy localhost:3000 {
            header_up Host {host}
            header_up X-Real-IP {remote}
            header_up X-Forwarded-For {remote}
            header_up X-Forwarded-Proto {scheme}
        }
    }

    # Health check endpoint
    handle /health {
        reverse_proxy localhost:3000 {
            header_up Host {host}
            header_up X-Real-IP {remote}
            header_up X-Forwarded-For {remote}
            header_up X-Forwarded-Proto {scheme}
        }
    }

    # SPA routing - fallback to backend for client-side routing
    handle {
        try_files {path} {path}/ /index.html
        reverse_proxy localhost:3000 {
            header_up Host {host}
            header_up X-Real-IP {remote}
            header_up X-Forwarded-For {remote}
            header_up X-Forwarded-Proto {scheme}
        }
    }

    # Cache static assets
    @static {
        path *.css *.js *.png *.jpg *.jpeg *.gif *.ico *.svg *.woff *.woff2 *.ttf *.eot
    }
    header @static Cache-Control \"public, max-age=31536000, immutable\"
}
EOF"

echo "🔧 Creating systemd service for the backend..."
run_remote "cat > /etc/systemd/system/safepsy-backend.service << 'EOF'
[Unit]
Description=SafePsy Backend Service
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=$APP_DIR/backend
Environment=NODE_ENV=production
Environment=PORT=3000
Environment=DATABASE_URL=file:./prod.db
Environment=FRONTEND_URL=https://safepsy.com
Environment=IP_HASHING_ENABLED=false
Environment=PLAUSIBLE_DOMAIN=safepsy.com
Environment=ENABLE_CONFIRMATION_EMAIL=false
ExecStart=/usr/bin/node dist/index.js
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF"

echo "🚀 Starting services..."
run_remote "systemctl daemon-reload"
run_remote "systemctl enable safepsy-backend"
run_remote "systemctl start safepsy-backend"
run_remote "systemctl enable caddy"
run_remote "systemctl start caddy"

echo "⏳ Waiting for services to start..."
sleep 10

echo "🔍 Checking service status..."
run_remote "systemctl status safepsy-backend --no-pager -l"
run_remote "systemctl status caddy --no-pager -l"

echo "🌐 Testing application..."
run_remote "curl -f http://localhost:80/health || echo 'Health check failed'"

echo "✅ Deployment completed!"
echo "🌍 Your SafePsy landing page should be available at: https://safepsy.com"
echo "🔧 To check logs: ssh $SERVER_USER@$SERVER_IP 'journalctl -u safepsy-backend -f'"
echo "🛑 To stop: ssh $SERVER_USER@$SERVER_IP 'systemctl stop safepsy-backend'"
echo "🔄 To restart: ssh $SERVER_USER@$SERVER_IP 'systemctl restart safepsy-backend'"

