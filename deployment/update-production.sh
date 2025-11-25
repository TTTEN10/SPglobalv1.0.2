#!/bin/bash

# Simple Production Update Script
# Updates existing deployment by pulling latest code and rebuilding containers

set -e

SERVER_IP="51.159.179.75"
SERVER_USER="root"
APP_DIR="/opt/safepsy-landing"

echo "🚀 Starting Production Update"
echo "Server: $SERVER_IP"
echo "User: $SERVER_USER"

# Function to run commands on remote server
run_remote() {
    ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP "$1"
}

echo "🔐 Checking server access..."
if ! run_remote "echo 'Connection verified'" 2>/dev/null; then
  echo "❌ ERROR: Cannot connect to server. Please ensure SSH keys are configured."
  exit 1
fi

echo "📥 Pulling latest code from GitHub..."
run_remote "cd $APP_DIR && git pull origin main"

echo "🐳 Rebuilding and restarting Docker containers..."
run_remote "cd $APP_DIR && docker-compose -f docker-compose.prod.yml up --build -d"

echo "⏳ Waiting for services to restart..."
sleep 15

echo "🔍 Checking service status..."
run_remote "cd $APP_DIR && docker-compose -f docker-compose.prod.yml ps"

echo "🌐 Testing application..."
run_remote "curl -f http://localhost:80/health || echo 'Health check failed'"

echo "✅ Update completed!"
echo "🌍 Your SafePsy landing page should be available at: https://safepsy.com"

