# SafePsy Landing Page - Development Scripts

## Quick Start Commands

```bash
# Install all dependencies
npm install && cd apps/web && npm install && cd ../api && npm install

# Start development servers
npm run dev

# Run tests
npm run test

# Build for production
npm run build
```

## Environment Setup

1. Copy environment files:
   ```bash
   cp env.example .env
   cp apps/web/env.example apps/web/.env
   cp apps/api/env.example apps/api/.env
   ```

2. Generate secure IP salt:
   ```bash
   openssl rand -hex 32
   ```

3. Initialize database:
   ```bash
   cd apps/api
   npx prisma generate
   npx prisma db push
   ```

## Docker Commands

```bash
# Development
docker-compose up --build

# Production
docker-compose --profile production up -d

# Clean up
docker-compose down -v
```

## Testing Commands

```bash
# All tests
npm run test

# Web app only
cd apps/web && npm run test

# API only
cd apps/api && npm run test

# With coverage
npm run test:coverage
```

## Deployment Checklist

- [ ] Set production environment variables
- [ ] Generate secure IP salt
- [ ] Configure domain names
- [ ] Set up SSL certificates
- [ ] Configure analytics (optional)
- [ ] Test email functionality
- [ ] Verify security headers
- [ ] Run production tests
