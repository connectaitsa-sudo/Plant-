# 🚀 Deployment Guide

This guide covers various deployment options for PlantCure.

## 📋 Prerequisites

Before deploying, ensure you have:
- Node.js 18+ installed
- npm or yarn package manager
- Git for version control
- Built the project successfully (`npm run build`)

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)

Vercel provides zero-config deployment with great performance.

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   cd /workspace
   vercel
   ```

3. **Follow the prompts:**
   - Set up and deploy: Yes
   - Which scope: Your account
   - Link to existing project: No
   - Project name: plant-disease-detector
   - Directory: ./
   - Build command: `npm run build`
   - Output directory: `dist`

4. **Production Deployment**
   ```bash
   vercel --prod
   ```

**Environment Setup:**
- No environment variables needed for basic deployment
- Auto-detected framework: Vite

### Option 2: Netlify

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build the project**
   ```bash
   npm run build
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod --dir=dist
   ```

**Netlify Configuration (`netlify.toml`):**
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Option 3: GitHub Pages

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to `package.json`:**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     },
     "homepage": "https://yourusername.github.io/plant-disease-detector"
   }
   ```

3. **Update `vite.config.ts`:**
   ```typescript
   export default defineConfig({
     base: '/plant-disease-detector/',
     plugins: [react()],
   })
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

### Option 4: AWS Amplify

1. **Install Amplify CLI**
   ```bash
   npm install -g @aws-amplify/cli
   ```

2. **Initialize Amplify**
   ```bash
   amplify init
   ```

3. **Add hosting**
   ```bash
   amplify add hosting
   ```

4. **Deploy**
   ```bash
   amplify publish
   ```

### Option 5: Docker

1. **Create `Dockerfile`:**
   ```dockerfile
   FROM node:18-alpine as build
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   COPY . .
   RUN npm run build

   FROM nginx:alpine
   COPY --from=build /app/dist /usr/share/nginx/html
   COPY nginx.conf /etc/nginx/conf.d/default.conf
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

2. **Create `nginx.conf`:**
   ```nginx
   server {
     listen 80;
     server_name localhost;
     root /usr/share/nginx/html;
     index index.html;

     location / {
       try_files $uri $uri/ /index.html;
     }
   }
   ```

3. **Build and run:**
   ```bash
   docker build -t plantcure .
   docker run -p 80:80 plantcure
   ```

## ⚡ Performance Optimization

### 1. Enable Compression
Most hosting providers enable gzip/brotli compression by default.

### 2. CDN Setup
- Vercel: Automatic global CDN
- Netlify: Automatic CDN
- Custom: Use CloudFlare or AWS CloudFront

### 3. Lazy Loading
The app already implements:
- Code splitting with dynamic imports
- Lazy loaded 3D components
- Intersection Observer for scroll animations

### 4. Asset Optimization
```bash
# Optimize images (if you add custom images)
npm install -g sharp-cli
sharp -i input.png -o output.png resize 800 600
```

## 🔒 Security Headers

Add these headers to your hosting platform:

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

## 📊 Monitoring

### Analytics Setup

1. **Google Analytics**
   ```typescript
   // Add to index.html
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
   ```

2. **Vercel Analytics**
   ```bash
   npm install @vercel/analytics
   ```
   ```typescript
   // Add to main.tsx
   import { Analytics } from '@vercel/analytics/react';
   <Analytics />
   ```

### Error Tracking

Use Sentry for error tracking:
```bash
npm install @sentry/react @sentry/vite-plugin
```

## 🧪 Pre-Deployment Checklist

- [ ] Run `npm run build` successfully
- [ ] Test production build locally with `npm run preview`
- [ ] Check all 3D animations work
- [ ] Test on mobile devices
- [ ] Verify all links work
- [ ] Check console for errors
- [ ] Test on multiple browsers
- [ ] Optimize bundle size if needed
- [ ] Set up analytics
- [ ] Configure custom domain (optional)

## 🌍 Custom Domain Setup

### Vercel
1. Go to project settings
2. Add domain under "Domains"
3. Update DNS records as shown

### Netlify
1. Go to Domain settings
2. Add custom domain
3. Update DNS records

### General DNS Configuration
```
Type: A
Name: @
Value: [Provider IP]

Type: CNAME
Name: www
Value: [Provider domain]
```

## 📈 Scaling

The application is static and scales automatically with:
- CDN distribution
- Edge caching
- Automatic compression
- Global distribution

No server-side configuration needed!

## 🔄 Continuous Deployment

### GitHub Actions

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
    
    - name: Deploy to Vercel
      run: npx vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

## 💡 Tips

1. **Preview Deployments**: Use Vercel/Netlify preview deployments for branches
2. **Environment Variables**: Store API keys in hosting platform env vars
3. **Cache Control**: Set appropriate cache headers for assets
4. **Bundle Analysis**: Use `vite-bundle-visualizer` to optimize
5. **Performance**: Monitor Core Web Vitals

## 📞 Support

If you encounter issues:
1. Check build logs
2. Verify environment configuration
3. Test locally first with `npm run preview`
4. Check hosting provider documentation

Happy Deploying! 🚀
