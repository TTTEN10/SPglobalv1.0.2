# Multi-stage Dockerfile for SPGlobalv1.0.2 Landing Page
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# Copy source code
COPY . .

# Install frontend dependencies and build
WORKDIR /app/apps/web
RUN npm ci
RUN npm run build

# Install backend dependencies and build
WORKDIR /app/apps/api
RUN npm ci
RUN npm run build

# Production image, copy all the files and run the app
FROM base AS runner
WORKDIR /app

# Install OpenSSL for Prisma
RUN apk add --no-cache openssl1.1-compat

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built applications
COPY --from=builder /app/apps/web/dist ./frontend/dist
COPY --from=builder /app/apps/api/dist ./backend/dist
COPY --from=builder /app/prisma ./backend/prisma
COPY --from=builder /app/apps/api/package.json ./backend/package.json

# Install production dependencies
WORKDIR /app/backend
RUN npm install --only=production

# Copy environment files
COPY --from=builder /app/env.example ./backend/.env

# Set proper permissions
RUN chown -R nextjs:nodejs /app
USER nextjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Start the application
WORKDIR /app/backend
CMD ["npm", "start"]
