# DPP Compliance Platform - Deployment Guide

## Production Deployment

This guide covers deploying the DPP Compliance Platform to production environments.

## Option 1: Vercel (Recommended for Next.js)

### Prerequisites
- Vercel account (free tier available)
- GitHub account connected to Vercel

### Steps
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "New Project"
4. Select `dpp-compliance-platform` repository
5. Configure project settings:
   - Framework: Next.js
   - Root Directory: ./
6. Click "Deploy"

Vercel will automatically:
- Build your Next.js app
- Optimize for production
- Deploy globally with CDN
- Set up SSL/HTTPS

**Environment Variables** (if needed):
```
# .env.local (for local development)
# .env.production (for production)
```

---

## Option 2: Docker Deployment

### Prerequisites
- Docker installed
- Docker Hub account (for container registry)

### Build Docker Image
```bash
docker build -t dpp-compliance-platform:latest .
docker tag dpp-compliance-platform:latest your-username/dpp-compliance-platform:latest
docker push your-username/dpp-compliance-platform:latest
```

### Run Docker Container
```bash
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  your-username/dpp-compliance-platform:latest
```

---

## Option 3: AWS EC2 + PM2

### Prerequisites
- AWS EC2 instance (Ubuntu 22.04)
- SSH access to instance

### Steps
```bash
# 1. SSH into your instance
ssh -i your-key.pem ubuntu@your-instance-ip

# 2. Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 3. Install PM2 globally
sudo npm install -g pm2

# 4. Clone repository
git clone https://github.com/Usama313KGS/dpp-compliance-platform.git
cd dpp-compliance-platform

# 5. Install dependencies
npm ci --only=production

# 6. Build for production
npm run build

# 7. Start with PM2
pm2 start "npm start" --name "dpp-platform"
pm2 save
pm2 startup

# 8. Verify
pm2 list
```

### Set up Nginx Reverse Proxy
```bash
sudo apt-get install nginx
sudo nano /etc/nginx/sites-available/default
```

Add this configuration:
```nginx
server {
    listen 80 default_server;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo nginx -t
sudo systemctl restart nginx
```

---

## Option 4: Railway.app (Simple & Fast)

### Steps
1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository
5. Railway auto-detects Next.js
6. Click "Deploy"

---

## Option 5: Self-Hosted VPS (DigitalOcean)

### Prerequisites
- DigitalOcean account
- Droplet (Ubuntu 22.04, 1GB+ RAM)

### Setup Script
```bash
#!/bin/bash
set -e

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install build tools
sudo apt install -y build-essential

# Install PM2
sudo npm install -g pm2

# Clone and setup
cd /home/ubuntu
git clone https://github.com/Usama313KGS/dpp-compliance-platform.git
cd dpp-compliance-platform
npm ci --only=production
npm run build

# Start app
pm2 start npm --name "dpp-platform" -- start
pm2 save

# Setup Nginx
sudo apt install -y nginx
sudo systemctl enable nginx
```

---

## Pre-Deployment Checklist

- [ ] Update `.env.production` with correct variables
- [ ] Run `npm run build` locally to verify
- [ ] Test in staging environment first
- [ ] Review security headers
- [ ] Set up monitoring & logging
- [ ] Configure backups
- [ ] Set up CI/CD pipeline
- [ ] Test SSL certificate installation

---

## Environment Variables

Create `.env.production`:
```env
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://your-domain.com/api
```

---

## Monitoring & Logging

### PM2 Monitoring
```bash
pm2 monit
pm2 logs dpp-platform
pm2 save
```

### Nginx Logs
```bash
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

---

## Performance Optimization

- ✅ Tailwind CSS - Automatically optimized
- ✅ Image optimization - Use Next.js Image component
- ✅ Code splitting - Automatic with Next.js
- ✅ Caching - Configure in `next.config.js`

---

## Security

- ✅ Enable HTTPS/SSL (free with Let's Encrypt)
- ✅ Set security headers in `next.config.js`
- ✅ Keep dependencies updated
- ✅ Use environment variables for secrets
- ✅ Enable CORS appropriately

---

## Scaling

For high traffic:
1. Use CDN (Cloudflare, AWS CloudFront)
2. Enable database caching
3. Use load balancing (Nginx, HAProxy)
4. Consider serverless scaling (Vercel, AWS Lambda)

---

## Troubleshooting

### Port Already in Use
```bash
lsof -i :3000
kill -9 <PID>
```

### Out of Memory
```bash
pm2 kill
sudo swapoff -a
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

### Build Fails
```bash
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

---

For questions or issues, check Next.js docs: https://nextjs.org/docs/deployment
