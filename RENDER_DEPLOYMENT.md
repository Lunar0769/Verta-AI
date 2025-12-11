# 🚀 VERTA FastAPI Backend - Render Deployment Guide

## 📋 Overview

Deploy your VERTA AI Meeting Intelligence backend as a FastAPI application on Render for reliable, scalable performance.

## 🔧 Prerequisites

1. **Render Account** - Sign up at [render.com](https://render.com)
2. **GitHub Repository** - Your code needs to be in a GitHub repo
3. **Gemini API Key** - Get from [Google AI Studio](https://makersuite.google.com/app/apikey)

## 📁 Files Created

- `backend.py` - FastAPI application with all endpoints
- `requirements_render.txt` - Python dependencies for Render
- `render.yaml` - Render deployment configuration
- `RENDER_DEPLOYMENT.md` - This deployment guide

## 🚀 Deployment Steps

### 1. **Push Code to GitHub**

```bash
# Add new files
git add backend.py requirements_render.txt render.yaml RENDER_DEPLOYMENT.md

# Commit changes
git commit -m "Add FastAPI backend for Render deployment"

# Push to GitHub
git push origin main
```

### 2. **Deploy on Render**

#### **Option A: Using Render Dashboard (Recommended)**

1. Go to [render.com/dashboard](https://render.com/dashboard)
2. Click **"New +"** → **"Web Service"**
3. **Connect** your GitHub repository
4. **Configure** the service:
   - **Name**: `verta-api`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements_render.txt`
   - **Start Command**: `python backend.py`
   - **Plan**: Free (or paid for better performance)

#### **Option B: Using render.yaml (Infrastructure as Code)**

1. In Render Dashboard, click **"New +"** → **"Blueprint"**
2. **Connect** your GitHub repository
3. Render will automatically detect `render.yaml`
4. **Review** and **Deploy**

### 3. **Set Environment Variables**

In Render Dashboard → Your Service → Environment:

1. Add **Environment Variable**:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: Your actual Gemini API key
   - **Save Changes**

2. **Redeploy** the service after adding the API key

### 4. **Update Frontend Configuration**

Update the API URL in `website/script.js`:

```javascript
const apiBase = window.location.hostname === 'localhost' ? 
    'http://localhost:8000' : 
    'https://YOUR-SERVICE-NAME.onrender.com';  // Replace with your actual Render URL
```

Replace `YOUR-SERVICE-NAME` with your actual Render service name.

## 🎯 **API Endpoints**

Your Render backend will provide:

- **Health Check**: `GET /health`
- **File Upload**: `POST /upload`
- **File Analysis**: `POST /analyze`
- **Status Check**: `GET /status/{file_id}`
- **API Info**: `GET /`

## 🔧 **Backend Features**

### **FastAPI Application**
- ✅ **High Performance**: Async/await support
- ✅ **Auto Documentation**: Swagger UI at `/docs`
- ✅ **CORS Enabled**: Works with any frontend
- ✅ **File Upload**: Multipart form data support
- ✅ **Error Handling**: Comprehensive error responses

### **AI Integration**
- ✅ **Gemini AI**: Real AI analysis when API key is provided
- ✅ **Fallback Mode**: Sample analysis when AI unavailable
- ✅ **File Validation**: Type and size checking
- ✅ **Progress Tracking**: Status endpoints for monitoring

### **Production Ready**
- ✅ **Logging**: Comprehensive request/error logging
- ✅ **Health Checks**: Monitoring endpoint for uptime
- ✅ **Environment Config**: Render-optimized settings
- ✅ **Security**: Input validation and sanitization

## 📊 **Performance & Scaling**

### **Render Free Tier**
- **Memory**: 512 MB RAM
- **CPU**: Shared CPU
- **Sleep**: After 15 minutes of inactivity
- **Bandwidth**: 100 GB/month

### **Render Paid Plans**
- **Starter ($7/month)**: 512 MB RAM, no sleep
- **Standard ($25/month)**: 2 GB RAM, better performance
- **Pro ($85/month)**: 4 GB RAM, high performance

## 🔍 **Testing Your Deployment**

### **1. Health Check**
```bash
curl https://your-service.onrender.com/health
```

### **2. API Documentation**
Visit: `https://your-service.onrender.com/docs`

### **3. File Upload Test**
```bash
curl -X POST "https://your-service.onrender.com/analyze" \
     -H "accept: application/json" \
     -H "Content-Type: multipart/form-data" \
     -F "file=@your-audio-file.mp3"
```

## 🛠️ **Local Development**

### **Run Locally**
```bash
# Install dependencies
pip install -r requirements_render.txt

# Set environment variable
export GEMINI_API_KEY="your-api-key"

# Run FastAPI server
python backend.py
```

### **Access Points**
- **API**: http://localhost:8000
- **Health**: http://localhost:8000/health
- **Docs**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🔒 **Security & Environment**

### **Environment Variables**
- `GEMINI_API_KEY` - Your Google Gemini API key
- `PORT` - Server port (automatically set by Render)
- `RENDER` - Automatically set by Render platform

### **Security Features**
- ✅ **CORS Protection**: Configurable origins
- ✅ **File Validation**: Type and size limits
- ✅ **Input Sanitization**: Request validation
- ✅ **Error Handling**: No sensitive data exposure

## 🚨 **Troubleshooting**

### **Common Issues**

#### **1. Build Fails**
- Check `requirements_render.txt` syntax
- Verify Python version compatibility
- Check Render build logs

#### **2. Service Won't Start**
- Verify `python backend.py` command works locally
- Check environment variables are set
- Review Render service logs

#### **3. API Returns Errors**
- Check Gemini API key is valid
- Verify file upload size limits
- Review FastAPI error logs

#### **4. CORS Issues**
- Update CORS origins in `backend.py`
- Check frontend API URL configuration
- Verify request headers

### **Debug Commands**

```bash
# Check service status
curl https://your-service.onrender.com/health

# View detailed logs in Render Dashboard
# Go to: Dashboard → Your Service → Logs

# Test locally
python backend.py
```

## 📈 **Monitoring & Maintenance**

### **Render Dashboard**
- **Metrics**: CPU, Memory, Response times
- **Logs**: Real-time application logs
- **Deployments**: History and rollback options
- **Environment**: Variable management

### **Health Monitoring**
- **Endpoint**: `/health` returns service status
- **Uptime**: Monitor via external services
- **Performance**: Track response times

## 🎉 **Success Checklist**

- [ ] FastAPI backend deployed on Render
- [ ] Environment variables configured
- [ ] Health check endpoint working
- [ ] File upload functionality tested
- [ ] AI analysis working (with API key)
- [ ] Frontend updated with Render URL
- [ ] CORS properly configured
- [ ] Error handling tested
- [ ] Documentation accessible at `/docs`

## 🔗 **Useful Links**

- **Render Documentation**: https://render.com/docs
- **FastAPI Documentation**: https://fastapi.tiangolo.com
- **Gemini AI**: https://ai.google.dev/gemini-api
- **Your Service**: https://your-service.onrender.com

---

**🔮 VERTA - Your AI Meeting Intelligence Platform is now running on professional infrastructure!**