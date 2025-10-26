#!/bin/bash

# SafePsy Local Production Mode
# This runs the app the same way it runs on your production server (safepsy.com)

set -e

echo "🚀 Starting SafePsy in local production mode..."
echo "📍 App will be available at http://localhost:3000"
echo ""

# Check if builds exist
if [ ! -d "apps/web/dist" ]; then
  echo "🔨 Building frontend..."
  cd apps/web && npm run build && cd ../..
fi

if [ ! -d "apps/api/dist" ]; then
  echo "🔨 Building backend..."
  cd apps/api && npm run build && cd ../..
fi

# Start the production server
echo "🚀 Starting server..."
echo ""
echo "✅ App is running at: http://localhost:3000"
echo "✅ API health check: http://localhost:3000/healthz"
echo "✅ Press Ctrl+C to stop"
echo ""

cd apps/api
PORT=3000 NODE_ENV=production DATABASE_URL="file:../../dev.db" FRONTEND_URL="http://localhost:3000" node dist/index.js
