# Aura Wellness Chatbot - Deployment Guide

This guide will help you deploy the Aura AI-Powered Confidential Wellness Chatbot for Indian Youth.

## Prerequisites

- Node.js 18+ and npm
- Google Cloud Platform account
- Domain name (optional but recommended)
- SSL certificate (for production)

## 1. Google Cloud Setup

### Enable Required APIs
```bash
# Enable Vertex AI API
gcloud services enable aiplatform.googleapis.com

# Enable Cloud Language API
gcloud services enable language.googleapis.com

# Enable Secret Manager API
gcloud services enable secretmanager.googleapis.com
```

### Create Service Account
```bash
# Create service account
gcloud iam service-accounts create aura-service-account \
    --description="Service account for Aura chatbot" \
    --display-name="Aura Service Account"

# Grant necessary permissions
gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
    --member="serviceAccount:aura-service-account@YOUR_PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/aiplatform.user"

gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
    --member="serviceAccount:aura-service-account@YOUR_PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/language.admin"

# Create and download key
gcloud iam service-accounts keys create aura-service-account-key.json \
    --iam-account=aura-service-account@YOUR_PROJECT_ID.iam.gserviceaccount.com
```

## 2. Environment Configuration

### Backend Environment (.env)
```bash
# Copy the example file
cp server/env.example server/.env

# Edit with your values
nano server/.env
```

Required environment variables:
```env
# Google Cloud Configuration
GOOGLE_APPLICATION_CREDENTIALS=./aura-service-account-key.json
GOOGLE_CLOUD_PROJECT_ID=your-project-id
GOOGLE_CLOUD_LOCATION=us-central1

# Server Configuration
PORT=5000
NODE_ENV=production

# Security
JWT_SECRET=your-secure-jwt-secret-key
ENCRYPTION_KEY=your-32-character-encryption-key

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Crisis Detection
CRISIS_THRESHOLD=0.8
HELPLINE_NUMBER=1800-599-0019
```

### Frontend Environment (.env)
```bash
# Copy the example file
cp client/env.example client/.env

# Edit with your values
nano client/.env
```

Required environment variables:
```env
# API Configuration
REACT_APP_API_URL=https://your-domain.com/api

# Google Cloud Configuration
REACT_APP_GOOGLE_CLOUD_PROJECT_ID=your-project-id
REACT_APP_GOOGLE_CLOUD_LOCATION=us-central1

# Feature Flags
REACT_APP_ENABLE_ANALYTICS=false
REACT_APP_ENABLE_CRISIS_DETECTION=true
REACT_APP_ENABLE_WELLNESS_TOOLS=true

# Crisis Support
REACT_APP_CRISIS_HELPLINE=1800-599-0019
REACT_APP_CRISIS_THRESHOLD=0.8
```

## 3. Local Development

### Install Dependencies
```bash
# Install all dependencies
npm run install-all

# Or install separately
cd server && npm install
cd ../client && npm install
```

### Start Development Server
```bash
# Start both frontend and backend
npm run dev

# Or start separately
npm run server  # Backend on port 5000
npm run client  # Frontend on port 3000
```

## 4. Production Deployment

### Option 1: Google Cloud Run (Recommended)

#### Build and Deploy Backend
```bash
# Build the application
cd server
npm run build

# Deploy to Cloud Run
gcloud run deploy aura-backend \
    --source . \
    --platform managed \
    --region us-central1 \
    --allow-unauthenticated \
    --set-env-vars NODE_ENV=production \
    --set-env-vars GOOGLE_CLOUD_PROJECT_ID=your-project-id
```

#### Build and Deploy Frontend
```bash
# Build React app
cd client
npm run build

# Deploy to Firebase Hosting or Cloud Storage
firebase deploy --only hosting
```

### Option 2: Docker Deployment

#### Create Dockerfile for Backend
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
```

#### Create Dockerfile for Frontend
```dockerfile
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Deploy with Docker Compose
```yaml
version: '3.8'
services:
  backend:
    build: ./server
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - GOOGLE_CLOUD_PROJECT_ID=your-project-id
    volumes:
      - ./server/aura-service-account-key.json:/app/aura-service-account-key.json

  frontend:
    build: ./client
    ports:
      - "80:80"
    depends_on:
      - backend
```

## 5. Security Configuration

### SSL/TLS Setup
```bash
# Using Let's Encrypt with Certbot
sudo certbot --nginx -d your-domain.com

# Or use Cloudflare for SSL termination
```

### Security Headers
The application includes security headers in the HTML file. For additional security:

```nginx
# nginx.conf
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.your-domain.com;" always;
```

## 6. Monitoring and Analytics

### Health Check Endpoint
The backend includes a health check endpoint at `/health` for monitoring.

### Logging
```bash
# View logs in Cloud Run
gcloud logs read --service=aura-backend --limit=50

# Or use structured logging
npm install winston
```

### Error Tracking
Consider integrating with services like:
- Sentry for error tracking
- Google Cloud Monitoring for metrics
- Google Cloud Logging for centralized logs

## 7. Performance Optimization

### Frontend Optimization
- Enable gzip compression
- Use CDN for static assets
- Implement service worker for caching
- Optimize images and fonts

### Backend Optimization
- Enable compression middleware
- Implement Redis for session storage
- Use connection pooling for databases
- Implement proper caching strategies

## 8. Compliance and Legal

### Privacy Compliance
- Review and update privacy policy
- Ensure GDPR compliance if applicable
- Implement data retention policies
- Regular security audits

### Indian Regulations
- Comply with IT Act 2000
- Follow data localization requirements
- Implement proper consent mechanisms
- Regular compliance reviews

## 9. Testing

### Unit Tests
```bash
# Backend tests
cd server && npm test

# Frontend tests
cd client && npm test
```

### Integration Tests
```bash
# Test API endpoints
npm run test:integration

# Test crisis detection
npm run test:crisis
```

### Load Testing
```bash
# Using Artillery
npm install -g artillery
artillery run load-test.yml
```

## 10. Maintenance

### Regular Updates
- Keep dependencies updated
- Monitor security vulnerabilities
- Update AI models regularly
- Review and update crisis resources

### Backup Strategy
- Regular database backups
- Configuration backups
- Code repository backups
- Disaster recovery plan

## Troubleshooting

### Common Issues

1. **Google Cloud Authentication**
   ```bash
   gcloud auth application-default login
   ```

2. **CORS Issues**
   - Check CORS configuration in server
   - Verify frontend API URL

3. **AI Service Errors**
   - Verify service account permissions
   - Check API quotas and limits

4. **Crisis Detection Not Working**
   - Verify crisis threshold settings
   - Check sentiment analysis configuration

### Support
For technical support or questions about deployment, please refer to the documentation or contact the development team.

## Security Considerations

- Never commit API keys or secrets to version control
- Use environment variables for all sensitive configuration
- Regularly rotate encryption keys and secrets
- Implement proper access controls
- Monitor for security vulnerabilities
- Regular security audits and penetration testing

Remember: This application handles sensitive mental health data. Ensure all security measures are properly implemented and regularly reviewed.
