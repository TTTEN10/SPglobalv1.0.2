# SafePsy Landing Page Skeleton Documentation

## 🏗️ Landing Page Overview

**SafePsy Landing Page** is a production-ready landing page built with modern web technologies and privacy-by-design principles. This application serves as the entry point for SafePsy's secure therapy platform, featuring email subscription, privacy compliance, and comprehensive security features.

**Version**: v0.2  
**Architecture**: Monorepo with Vite + React + TypeScript  
**Database**: Prisma + SQLite  
**License**: MIT  

---

## 📁 Directory Structure

```
safepsy-landing/
├── 📁 apps/                    # Applications workspace
│   ├── 📁 web/                 # Vite + React + TypeScript frontend
│   │   ├── src/
│   │   │   ├── components/     # React components
│   │   │   │   ├── Hero.tsx           # Hero section
│   │   │   │   ├── Header.tsx         # Navigation header
│   │   │   │   ├── Footer.tsx         # Footer component
│   │   │   │   ├── EmailSignup.tsx    # Email subscription form
│   │   │   │   ├── CookieBanner.tsx   # GDPR cookie consent
│   │   │   │   ├── SEOHead.tsx        # SEO meta tags
│   │   │   │   └── ...                # Other components
│   │   │   ├── hooks/          # Custom React hooks
│   │   │   │   ├── useSEO.ts          # SEO configuration
│   │   │   │   └── useCookieConsent.ts # Cookie consent logic
│   │   │   ├── contexts/       # React contexts
│   │   │   │   └── ThemeContext.tsx   # Theme management
│   │   │   ├── types/          # TypeScript definitions
│   │   │   │   └── seo.ts             # SEO types
│   │   │   └── test/           # Test setup
│   │   │       └── setup.ts           # Vitest configuration
│   │   ├── public/             # Static assets
│   │   │   ├── Favicon.jpg
│   │   │   ├── HeroTheme.png
│   │   │   ├── Logotransparent.png
│   │   │   └── MainLogo.jpg
│   │   ├── vite.config.ts      # Vite configuration
│   │   ├── tailwind.config.ts  # Tailwind CSS configuration
│   │   ├── tsconfig.json       # TypeScript configuration
│   │   ├── vitest.config.ts    # Test configuration
│   │   └── package.json        # Dependencies and scripts
│   └── 📁 api/                 # Express + TypeScript backend
│       ├── src/
│       │   ├── index.ts        # Main Express server
│       │   ├── lib/            # Utility functions
│       │   │   └── crypto.ts   # Privacy utilities
│       │   └── routes/         # API routes
│       ├── prisma/             # Database schema
│       │   ├── schema.prisma   # Prisma schema
│       │   └── dev.db          # SQLite database
│       ├── dist/               # Compiled JavaScript
│       ├── nodemon.json        # Development configuration
│       ├── tsconfig.json       # TypeScript configuration
│       └── package.json        # Dependencies and scripts
├── 📁 frontend/                # Legacy frontend (for reference)
├── 📁 backend/                 # Legacy backend (for reference)
├── 📁 tests/                   # Integration tests
│   ├── emailService.test.ts
│   ├── emailSignup.test.tsx
│   └── subscribeRoute.test.ts
├── 📁 public/                  # Shared static assets
├── 📄 package.json             # Workspace configuration
├── 📄 docker-compose.yml       # Docker orchestration
├── 📄 Dockerfile              # Multi-stage build
├── 📄 nginx.conf              # Nginx configuration
├── 📄 env.example             # Environment template
├── 📄 README.md               # Main documentation
├── 📄 DEVELOPMENT.md          # Development scripts
└── 📄 PRIVACY-BY-DESIGN.md    # Privacy implementation
```

---

## 🔧 Core Applications Architecture

### 1. **Web Application** (`/apps/web/`)
**Technology Stack**: Vite, React 18, TypeScript, Tailwind CSS, React Router

**Key Features**:
- **Modern React Architecture**: Vite for fast development and building
- **TypeScript**: Full type safety implementation
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **React Router**: Client-side routing with SEO optimization
- **Privacy by Design**: Cookie consent, analytics integration
- **Responsive Design**: Mobile-first approach with accessibility features
- **SEO Optimization**: React Helmet with meta tags and structured data

**Key Components**:
- **Hero**: Main landing section with call-to-action
- **EmailSignup**: Subscription form with validation
- **CookieBanner**: GDPR-compliant consent management
- **SEOHead**: Dynamic meta tags and structured data
- **Header/Footer**: Navigation and footer components

**Port**: 3000 (development), 80 (production)

### 2. **API Application** (`/apps/api/`)
**Technology Stack**: Node.js, TypeScript, Express.js, Prisma, SQLite

**Key Features**:
- **RESTful API**: Email subscription and health check endpoints
- **Database**: Prisma ORM with SQLite for data persistence
- **Security**: Rate limiting, input validation, security headers
- **Privacy Features**: IP hashing with configurable privacy settings
- **Type Safety**: Full TypeScript implementation

**Key Endpoints**:
- `POST /api/subscribe` - Email subscription
- `GET /health` - Health check
- `GET /api/subscribers` - Admin endpoint (with auth)

**Port**: 3001 (development), 3001 (production)

---

## 🗄️ Data Layer

### **SQLite Database** (via Prisma)
- **Primary Database**: Email subscriptions, user preferences
- **ORM**: Prisma for type-safe database operations
- **Privacy Features**: IP hashing with configurable settings
- **Location**: `apps/api/prisma/dev.db`

**Schema**:
```prisma
model Subscriber {
  id        String   @id @default(cuid())
  email     String   @unique
  ipHash    String   // Hashed IP address for privacy
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

---

## 🌐 Network Configuration

### **Development Setup**
- **Frontend**: http://localhost:3000 (Vite dev server)
- **Backend**: http://localhost:3001 (Express server)
- **Proxy**: Vite proxies `/api` requests to backend

### **Production Setup**
- **Nginx**: Reverse proxy and static file serving
- **Docker**: Multi-stage builds for optimization
- **SSL**: HTTPS termination at nginx level

---

## 🔒 Privacy & Security Architecture

### **Privacy by Design Implementation**

#### **IP Address Handling**
- **Default OFF**: IP hashing is disabled by default for maximum privacy
- **Configurable**: Can be enabled via `IP_HASHING_ENABLED=true`
- **Secure Hashing**: Uses SHA-256 with configurable salt when enabled
- **No Raw Logging**: Raw IP addresses are never logged

#### **Privacy Behavior**
- **When `IP_HASHING_ENABLED=false` (default)**:
  - Raw IP addresses are NOT stored or logged
  - Placeholder `'IP_HASHING_DISABLED'` is used instead
  - Maximum privacy protection

- **When `IP_HASHING_ENABLED=true`**:
  - IP addresses are hashed using SHA-256 with salt
  - `ipHash = sha256(ip + SALT)`
  - Still provides privacy while enabling rate limiting

### **Security Features**
- **Helmet**: Security headers (CSP, HSTS, X-Frame-Options)
- **Rate Limiting**: API protection (10 req/s, 1 req/s for login)
- **CORS**: Configured for specific origins
- **Input Validation**: Joi schema validation
- **SQL Injection Protection**: Prisma ORM

---

## 📦 Package Management

### **Workspace Configuration** (`package.json`)
```json
{
  "name": "safepsy-landing",
  "version": "1.0.0",
  "workspaces": ["apps/*"],
  "scripts": {
    "dev": "concurrently -k \"npm:dev:web\" \"npm:dev:api\"",
    "build": "npm run build:web && npm run build:api",
    "test": "npm run test:web && npm run test:api"
  }
}
```

### **Web Dependencies**
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^7.9.1",
  "react-helmet-async": "^2.0.5",
  "lucide-react": "^0.294.0"
}
```

### **API Dependencies**
```json
{
  "express": "^4.18.2",
  "cors": "^2.8.5",
  "helmet": "^7.1.0",
  "express-rate-limit": "^7.1.5",
  "joi": "^17.11.0",
  "prisma": "^5.7.1",
  "@prisma/client": "^5.7.1"
}
```

---

## 🐳 Docker Orchestration

### **Multi-stage Dockerfile**
- **Stage 1**: Build web application
- **Stage 2**: Build API application
- **Stage 3**: Production image with nginx

### **Docker Compose**
- **Services**: Web, API, Nginx
- **Ports**: 80 (HTTP), 443 (HTTPS)
- **Volumes**: Database persistence
- **Environment**: Production configuration

---

## 🚀 Development Workflow

### **Quick Start**
```bash
# Install dependencies
npm install
cd apps/web && npm install
cd ../api && npm install

# Start development servers
npm run dev

# This starts:
# - Frontend: http://localhost:3000
# - Backend: http://localhost:3001
```

### **Individual Services**
```bash
# Web development
cd apps/web
npm run dev          # Vite development server
npm run build        # Production build
npm run test         # Run tests

# API development
cd apps/api
npm run dev          # API development server
npm run build        # Production build
npm run test         # Run tests
```

### **Database Operations**
```bash
cd apps/api
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:migrate   # Run migrations
npm run db:studio    # Open Prisma Studio
```

---

## 🧪 Testing Strategy

### **Frontend Testing**
- **Vitest**: Fast unit testing
- **React Testing Library**: Component testing
- **Jest DOM**: DOM assertions
- **Coverage**: Code coverage reporting

### **Backend Testing**
- **Vitest**: API endpoint testing
- **Supertest**: HTTP assertion library
- **Database**: In-memory SQLite for tests

### **Integration Testing**
- **Email Service**: Subscription flow testing
- **Privacy Features**: IP hashing testing
- **API Routes**: End-to-end testing

---

## 📊 Analytics & Monitoring

### **Plausible Analytics** (Optional)
- **Privacy-friendly**: No cookies or personal data
- **GDPR compliant**: By design
- **Lightweight**: ~1KB
- **Configurable**: Can be disabled

### **Health Monitoring**
- **Health Check**: `/health` endpoint
- **Database**: Connection monitoring
- **Performance**: Response time tracking

---

## 🔧 Environment Configuration

### **Required Environment Variables**

#### **Root Level** (`.env`)
```bash
# General configuration
NODE_ENV=development
```

#### **Web Application** (`apps/web/.env`)
```bash
# Plausible Analytics (optional)
VITE_PLAUSIBLE_DOMAIN=your-domain.com

# API Configuration
VITE_API_URL=http://localhost:3001

# Development
VITE_DEBUG=false
```

#### **API Application** (`apps/api/.env`)
```bash
# Server configuration
PORT=3001
NODE_ENV=development

# Database
DATABASE_URL="file:./prisma/dev.db"

# Privacy by Design - IP Address Handling
IP_HASHING_ENABLED=false  # Default: OFF for maximum privacy
IP_SALT=your-secure-random-salt-change-this-in-production

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Analytics (optional)
PLAUSIBLE_DOMAIN=your-domain.com
```

---

## 🎨 Customization

### **Branding**
- **Colors**: Update `tailwind.config.ts`
- **Fonts**: Modify font imports in `index.html`
- **Logo**: Replace assets in `public/` folder
- **Content**: Update component text and copy

### **Styling**
- **Tailwind**: Utility classes in components
- **Custom CSS**: `src/index.css` for global styles
- **Components**: Reusable component classes
- **Responsive**: Mobile-first breakpoints

### **Content Management**
- **Hero Section**: `apps/web/src/components/Hero.tsx`
- **Email Signup**: `apps/web/src/components/EmailSignup.tsx`
- **Footer**: `apps/web/src/components/Footer.tsx`
- **SEO**: `apps/web/src/hooks/useSEO.ts`

---

## 🚀 Deployment

### **Docker Production**
```bash
# Build and run
docker-compose up --build

# Access application
# http://localhost:3001
```

### **Manual Deployment**
```bash
# Build applications
npm run build

# Start API server
cd apps/api
npm start

# Serve frontend
# Serve apps/web/dist with any static file server
```

### **Environment Setup**
```bash
# Generate secure salt
openssl rand -hex 32

# Set environment variables
export IP_HASHING_ENABLED=false
export IP_SALT="your-secure-random-salt"
```

---

## 📋 API Reference

### **POST /api/subscribe**
Subscribe to the waitlist.

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Successfully joined our waitlist! We'll notify you when SafePsy launches."
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "This email is already on our waitlist"
}
```

### **GET /health**
Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

---

## 🎯 Key Features Summary

✅ **Modern React Architecture** - Vite + React 18 + TypeScript  
✅ **Privacy by Design** - Configurable IP hashing and privacy protection  
✅ **Email Subscription System** - Prisma + SQLite with rate limiting  
✅ **Responsive Design** - Mobile-first with Tailwind CSS  
✅ **SEO Optimization** - React Helmet with meta tags and structured data  
✅ **Cookie Consent** - GDPR-compliant consent management  
✅ **Security Features** - Rate limiting, input validation, security headers  
✅ **Docker Support** - Multi-stage builds and orchestration  
✅ **Testing Suite** - Comprehensive test coverage  
✅ **Analytics Integration** - Optional Plausible Analytics  
✅ **Type Safety** - Full TypeScript implementation  
✅ **Development Experience** - Hot reload, fast builds, modern tooling  

---

## 📚 Documentation References

- **Main README**: `/README.md` - Comprehensive project overview
- **Development Guide**: `/DEVELOPMENT.md` - Development scripts and commands
- **Privacy Implementation**: `/PRIVACY-BY-DESIGN.md` - Privacy by design documentation
- **API Documentation**: `/apps/api/README.md` - API reference
- **Component Documentation**: `/apps/web/README.md` - Frontend documentation

---

**SafePsy Landing Page** - Secure, Ethical, Human-centered Online Therapy Platform 🛡️❤️👥

*Built with ❤️ for mental health professionals and their clients*
