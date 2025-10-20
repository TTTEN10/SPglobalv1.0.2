# SafePsy Landing Page Deployment Scripts

This folder contains all the deployment scripts for the SafePsy landing page.

## 📁 Scripts Overview

### 🔑 `setup-ssh-key.sh`
**Purpose**: Guide for setting up SSH key authentication with the server
**Usage**: `./setup-ssh-key.sh`
**Description**: Provides step-by-step instructions for adding your SSH public key to the Scaleway server

### 🚀 `deploy-with-ssh.sh` (Recommended)
**Purpose**: Automated deployment with SSH key validation
**Usage**: `./deploy-with-ssh.sh`
**Description**: 
- Tests SSH connection first
- Provides SSH key setup instructions if needed
- Automatically installs Docker, clones repo, configures environment, and deploys
- Most robust deployment option

### 🛠️ `deploy-safepsy.sh`
**Purpose**: Basic automated deployment (requires SSH key already set up)
**Usage**: `./deploy-safepsy.sh`
**Description**: Direct deployment without SSH key validation

### 📋 `deploy-manual.sh`
**Purpose**: Manual deployment guide
**Usage**: `./deploy-manual.sh`
**Description**: Shows step-by-step manual deployment instructions

## 🎯 Recommended Deployment Flow

1. **First time setup**:
   ```bash
   cd deployment
   ./setup-ssh-key.sh
   ```

2. **Set up SSH key** (choose one option from the guide)

3. **Deploy automatically**:
   ```bash
   ./deploy-with-ssh.sh
   ```

## 🌐 Server Information

- **Server IP**: 51.159.171.7
- **Repository**: https://github.com/TTTEN10/SPlandingv1.git
- **App Directory**: /opt/safepsy-landing
- **Domain**: safepsy.com

## 🔧 Post-Deployment

After successful deployment, your SafePsy landing page will be available at:
- **HTTP**: http://51.159.171.7
- **Domain**: https://safepsy.com (after DNS configuration)

## 📝 Useful Commands

```bash
# View deployment logs
ssh root@51.159.171.7 'cd /opt/safepsy-landing && docker-compose logs -f'

# Restart services
ssh root@51.159.171.7 'cd /opt/safepsy-landing && docker-compose restart'

# Stop services
ssh root@51.159.171.7 'cd /opt/safepsy-landing && docker-compose down'

# Update deployment
ssh root@51.159.171.7 'cd /opt/safepsy-landing && git pull && docker-compose up --build -d'
```

## 🔒 Security Features

- Privacy-by-design configuration
- IP hashing disabled by default
- Plausible Analytics configured
- Nginx reverse proxy with security headers
- Health checks and monitoring
- Automatic restarts on failure

## 📞 Support

If you encounter any issues during deployment, check the logs first:
```bash
ssh root@51.159.171.7 'cd /opt/safepsy-landing && docker-compose logs'
```
