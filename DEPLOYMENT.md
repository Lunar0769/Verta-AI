# 🚀 VERTA Deployment Guide

## Backend Deployment (Render)

### 1. Create Render Account
- Go to [render.com](https://render.com) and sign up
- Connect your GitHub account

### 2. Deploy Backend
1. **Create New Web Service**
   - Choose "Build and deploy from a Git repository"
   - Connect your GitHub repo
   - Select the repository containing VERTA

2. **Configure Service**
   - **Name**: `verta-ai-backend` (or your preferred name)
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements_render.txt`
   - **Start Command**: `gunicorn -c gunicorn.conf.py backend:app`
   - **Instance Type**: `Free` (or paid for better performance)

3. **Environment Variables** (CRITICAL SECURITY STEP)
   - In Render dashboard, go to "Environment" tab
   - Add `GEMINI_API_KEY` with your Google Gemini API key
   - Get your API key from: https://aistudio.google.com/app/apikey
   - ⚠️ **NEVER** put API keys in code or commit them to GitHub

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Note your backend URL: `https://your-service-name.onrender.com`

### 3. Update Frontend Configuration
- In `website/script.js`, replace the Render URL:
```javascript
const BACKEND_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000' 
    : 'https://YOUR-ACTUAL-RENDER-URL.onrender.com';
```

## Frontend Deployment (Vercel)

### 1. Create Vercel Account
- Go to [vercel.com](https://vercel.com) and sign up
- Connect your GitHub account

### 2. Deploy Frontend
1. **Import Project**
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Project**
   - **Framework Preset**: `Other`
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: Leave empty (static site)
   - **Output Directory**: `website`
   - **Install Command**: Leave empty

3. **Deploy**
   - Click "Deploy"
   - Wait for deployment (2-3 minutes)
   - Your site will be available at: `https://your-project.vercel.app`

## 🔧 Backend Wake-up Features

### Automatic Wake-up System
- ✅ **Page Load Wake-up**: Backend wakes when users visit the site
- ✅ **Status Indicator**: Shows backend connection status
- ✅ **Retry Logic**: Automatically retries if backend is sleeping
- ✅ **Cold Start Handling**: Waits for Render's cold start process
- ✅ **Graceful Fallback**: Continues even if wake-up partially fails

### Status Indicators
- 🟡 **Yellow (Pulsing)**: Connecting/Waking up server
- 🟢 **Green**: Server ready and connected
- 🟠 **Orange (Pulsing)**: Server starting (cold start)
- 🔴 **Red**: Connection failed

## 📝 Post-Deployment Checklist

### Backend (Render)
- [ ] Service deployed successfully
- [ ] Environment variables set (GEMINI_API_KEY)
- [ ] Health endpoint responding: `https://your-backend.onrender.com/health`
- [ ] CORS configured for your frontend domain

### Frontend (Vercel)
- [ ] Site deployed successfully
- [ ] Backend URL updated in script.js
- [ ] Wake-up system working (check browser console)
- [ ] File upload and analysis working

## 🛠️ Troubleshooting

### Backend Issues
- **503 Service Unavailable**: Backend is sleeping, wait 30-60 seconds
- **CORS Errors**: Check backend CORS configuration
- **Timeout Errors**: Render free tier has cold start delays

### Frontend Issues
- **Backend Connection Failed**: Check if backend URL is correct
- **File Upload Fails**: Verify backend is awake and CORS is configured

## 💡 Performance Tips

### Render Free Tier
- **Cold Starts**: First request after inactivity takes 30-60 seconds
- **Sleep Timer**: Service sleeps after 15 minutes of inactivity
- **Wake-up System**: Automatically handles wake-up process

### Optimization
- Consider upgrading to Render paid tier for instant wake-up
- Use Vercel Pro for better performance and analytics
- Monitor backend health with Render dashboard

## 🔒 Security Best Practices

### Environment Variables
- ✅ **Use Render Environment Variables**: Set `GEMINI_API_KEY` in Render dashboard
- ✅ **Never Commit .env Files**: Always in .gitignore
- ✅ **Use .env.example**: Template without real keys
- ✅ **Rotate Keys Regularly**: Change API keys periodically

### API Key Security
- 🚫 **Never** put API keys in code
- 🚫 **Never** commit .env files to GitHub
- 🚫 **Never** share API keys in chat/email
- ✅ **Always** use environment variables in production

## 🔗 Useful Links

- **Render Dashboard**: https://dashboard.render.com
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Google AI Studio**: https://aistudio.google.com/app/apikey
- **VERTA Documentation**: README.md

---

**🔮 VERTA is now deployed securely and ready to transform meetings into actionable insights!**