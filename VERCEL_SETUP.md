# 🚀 Vercel Setup Guide

## 📋 Getting Your Vercel Project ID

### **Step 1: Install Vercel CLI**
```bash
npm install -g vercel
```

### **Step 2: Login to Vercel**
```bash
vercel login
```
This will open your browser to authenticate with Vercel.

### **Step 3: Deploy Your Project**
```bash
# From your project directory
vercel
```

### **Step 4: Get Your Project ID**

**Method 1: From Vercel Dashboard**
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click on your project
3. Go to Settings → General
4. Copy the "Project ID"

**Method 2: From CLI**
```bash
vercel ls
```
This shows all your projects with their IDs.

**Method 3: From Project Settings**
```bash
vercel project ls
```

### **Step 5: Get Your Vercel Token**
1. Go to [vercel.com/account/tokens](https://vercel.com/account/tokens)
2. Click "Create Token"
3. Give it a name (e.g., "AI Website Builder")
4. Select "Full Account" scope
5. Copy the token

---

## 🔧 **Environment Configuration**

### **Create .env.local file:**
```env
# Vercel Configuration
VERCEL_TOKEN=your-vercel-token-here
VERCEL_PROJECT_ID=your-project-id-here

# Google Gemini API (Primary)
GOOGLE_AI_API_KEY=your-gemini-api-key-here

# Database (Supabase)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key-here
```

---

## 🚀 **Deployment Options**

### **Option 1: Automatic Deployment (Recommended)**
```bash
# Deploy to production
vercel --prod

# Deploy to preview
vercel
```

### **Option 2: GitHub Integration**
1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Automatic deployments on every push

### **Option 3: Custom Domain**
1. Go to your project settings in Vercel
2. Click "Domains"
3. Add your custom domain
4. Update DNS settings

---

## 📊 **Vercel Project Structure**

Your project will be deployed with this structure:
```
ai-website-builder/
├── app/                    # Next.js app directory
├── components/            # React components
├── lib/                  # Utility functions
├── public/               # Static assets
├── vercel.json           # Vercel configuration
└── package.json          # Dependencies
```

---

## ⚙️ **Vercel Configuration**

### **Create vercel.json (Optional):**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "installCommand": "npm install",
  "devCommand": "npm run dev",
  "regions": ["iad1"],
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 30
    }
  }
}
```

---

## 🔍 **Troubleshooting**

### **Common Issues:**

1. **Build Fails**
   ```bash
   # Check build logs
   vercel logs
   
   # Rebuild locally
   npm run build
   ```

2. **Environment Variables Not Working**
   - Make sure they're set in Vercel dashboard
   - Check for typos in variable names
   - Redeploy after adding new variables

3. **API Routes Not Working**
   - Check function timeout settings
   - Verify API route structure
   - Check console logs

### **Useful Commands:**
```bash
# View deployment status
vercel ls

# View logs
vercel logs

# Remove deployment
vercel remove

# Update environment variables
vercel env add
```

---

## 💰 **Vercel Pricing**

### **Free Tier (Hobby):**
- Unlimited deployments
- 100GB bandwidth/month
- 100GB storage
- Custom domains
- SSL certificates

### **Pro Tier ($20/month):**
- Everything in Hobby
- 1TB bandwidth/month
- 1TB storage
- Team collaboration
- Analytics

### **Enterprise:**
- Custom pricing
- Advanced features
- Dedicated support

---

## 🎯 **Next Steps**

1. **Deploy your project**
   ```bash
   vercel --prod
   ```

2. **Set up environment variables**
   - Add them in Vercel dashboard
   - Or use `vercel env add`

3. **Connect custom domain**
   - Add domain in project settings
   - Update DNS records

4. **Monitor performance**
   - Check Vercel analytics
   - Monitor function execution times

---

## 🔗 **Useful Links**

- [Vercel Dashboard](https://vercel.com/dashboard)
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js on Vercel](https://vercel.com/docs/functions/serverless-functions/runtimes/nodejs)
- [Environment Variables](https://vercel.com/docs/projects/environment-variables)
- [Custom Domains](https://vercel.com/docs/concepts/projects/domains)

---

**Your AI website builder will be live at: `https://your-project-name.vercel.app`** 🚀 