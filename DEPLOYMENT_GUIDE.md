# 🚀 VERTA Vercel Deployment Guide

## 📋 Prerequisites

1. **Vercel Account** - Sign up at [vercel.com](https://vercel.com)
2. **GitHub Account** - For repository hosting
3. **Gemini API Key** - Get from [Google AI Studio](https://makersuite.google.com/app/apikey)

## 🔧 Step-by-Step Deployment

### 1. **Prepare Repository**

```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial VERTA deployment"

# Create GitHub repository and push
git remote add origin https://github.com/yourusername/verta-ai.git
git branch -M main
git push -u origin main
```

### 2. **Deploy to Vercel**

#### Option A: Vercel CLI (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: verta-ai-meeting-analyzer
# - Directory: ./
# - Override settings? No
```

#### Option B: Vercel Dashboard
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **"New Project"**
3. **Import** your GitHub repository
4. **Configure** project settings:
   - Framework Preset: **Other**
   - Root Directory: **.**
   - Build Command: **Leave empty**
   - Output Directory: **website**

### 3. **Set Environment Variables**

In Vercel Dashboard:
1. Go to **Project Settings**
2. Click **Environment Variables**
3. Add variable:
   - **Name**: `GEMINI_API_KEY`
   - **Value**: Your Gemini API key
   - **Environment**: All (Production, Preview, Development)

### 4. **Verify Deployment**

1. **Visit** your Vercel URL (e.g., `https://verta-ai-xyz.vercel.app`)
2. **Test** the health endpoint: `/api/health`
3. **Upload** a test audio file
4. **Verify** AI analysis works

## 📁 Project Structure for Vercel

```
verta-ai/
├── api/
│   └── index.py          # Serverless API functions
├── website/
│   ├── index.html        # Frontend application
│   ├── styles.css        # Optimized styles
│   └── script.js         # Frontend logic
├── vercel.json           # Vercel configuration
├── requirements.txt      # Python dependencies
├── package.json          # Project metadata
└── README.md            # Documentation
```

## ⚙️ Configuration Files

### `vercel.json`
```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/index.py",
      "use": "@vercel/python"
    },
    {
      "src": "website/**",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/index.py"
    },
    {
      "src": "/(.*)",
      "dest": "/website/$1"
    }
  ]
}
```

## 🔍 Troubleshooting

### Common Issues

#### 1. **Build Fails**
- Check `requirements.txt` has correct dependencies
- Ensure Python version compatibility
- Verify `api/index.py` syntax

#### 2. **API Not Working**
- Check environment variables are set
- Verify Gemini API key is valid
- Check function timeout limits

#### 3. **Frontend Issues**
- Ensure `website/` directory structure is correct
- Check API endpoints in `script.js`
- Verify CORS configuration

### Debug Commands

```bash
# Check deployment logs
vercel logs

# Test locally
vercel dev

# Check environment variables
vercel env ls
```

## 🚀 Performance Optimization

### Serverless Limits
- **Function Timeout**: 300 seconds (5 minutes)
- **Memory**: 1024 MB
- **File Size**: 50 MB max for uploads

### Optimizations Applied
- **Reduced token limits** for faster processing
- **Optimized frontend** (20% smaller files)
- **Efficient JSON parsing**
- **Fallback analysis** for reliability

## 🔒 Security Best Practices

1. **Environment Variables**
   - Never commit API keys to repository
   - Use Vercel environment variables
   - Rotate keys regularly

2. **CORS Configuration**
   - Properly configured for cross-origin requests
   - Secure headers implemented

3. **File Validation**
   - File type and size validation
   - Temporary file cleanup

## 📊 Monitoring

### Vercel Analytics
- **Function Invocations**: Monitor API usage
- **Error Rate**: Track failed requests
- **Performance**: Response times and memory usage

### Custom Monitoring
- Check `/api/health` endpoint regularly
- Monitor Gemini API quota usage
- Track user engagement metrics

## 🔄 Updates and Maintenance

### Automatic Deployments
- **Push to main branch** → Automatic deployment
- **Pull requests** → Preview deployments
- **Environment variables** → Redeploy required

### Manual Updates
```bash
# Deploy specific branch
vercel --prod

# Deploy with custom domain
vercel --prod --scope your-team
```

## 🌐 Custom Domain (Optional)

1. **Add Domain** in Vercel Dashboard
2. **Configure DNS** records
3. **SSL Certificate** automatically provisioned

## 📈 Scaling Considerations

### Current Limits
- **Hobby Plan**: 100 GB-hours/month
- **Pro Plan**: 1000 GB-hours/month
- **File Processing**: Up to 5 minutes per request

### Upgrade Path
- Monitor usage in Vercel Dashboard
- Upgrade plan as needed
- Consider caching strategies

## ✅ Deployment Checklist

- [ ] Repository pushed to GitHub
- [ ] Vercel project created
- [ ] Environment variables set
- [ ] Deployment successful
- [ ] Health endpoint working
- [ ] File upload functional
- [ ] AI analysis working
- [ ] Frontend responsive
- [ ] Error handling tested
- [ ] Performance optimized

## 🎉 Success!

Your VERTA AI Meeting Intelligence Platform is now live on Vercel! 

**Next Steps:**
1. Share your deployment URL
2. Test with real meeting recordings
3. Monitor performance and usage
4. Gather user feedback
5. Plan future enhancements

---

**Need Help?** Check the [Vercel Documentation](https://vercel.com/docs) or create an issue in the repository.