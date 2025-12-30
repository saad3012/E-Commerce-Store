# 🚀 Deploy to Netlify - FREE & Easy (No Card!)

Deploy your E-Commerce frontend to Netlify in 2 minutes!

## Step 1: Install Netlify CLI

```powershell
npm install -g netlify-cli
```

## Step 2: Login to Netlify

```powershell
netlify login
```

This will open a browser. Authorize the CLI.

## Step 3: Deploy Your App

```powershell
cd "C:\Users\techn\Downloads\231701 (3)\231701\ReactTasks\task2\task2"

# Preview deploy (optional)
netlify deploy

# Production deploy
netlify deploy --prod
```

## Step 4: Set Environment Variables

When deploying, Netlify will ask for:
- **Site name**: ecommerce-store (or your choice)
- **Deploy directory**: dist
- **Build command**: npm install && npm run build

After deploy, go to your Netlify dashboard and set:
- **VITE_API_URL**: Your backend URL (Replit/Glitch URL)

## Step 5: Redeploy

After setting env vars:
```powershell
netlify deploy --prod
```

---

## Deploy Backend to Replit

### Method 1: Replit Web UI (Easiest)

1. Go to https://replit.com
2. Sign up with GitHub
3. Click "+ Create" → "Import from GitHub"
4. Paste: `https://github.com/saad3012/E-Commerce-Store`
5. Select **Node.js**
6. Click "Import from GitHub"
7. Edit `.env`:
   ```
   DATABASE_URL=postgresql://neondb_owner:npg_I5X4PDmOvuhQ@ep-sweet-glade-a4psakgl-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require
   PORT=3001
   NODE_ENV=production
   CORS_ORIGIN=*
   ```
8. Click "Run" (top of screen)
9. Wait for it to start (5-10 seconds)
10. Copy the URL from the preview window
11. Update **CORS_ORIGIN** in `.env`:
    ```
    CORS_ORIGIN=https://your-netlify-frontend.netlify.app
    ```
12. Restart the server

### Method 2: Using Replit CLI

```powershell
# Install replit CLI
npm install -g replit

# Deploy
replit login
replit create --from-repo https://github.com/saad3012/E-Commerce-Store
```

---

## Final Step: Connect Frontend to Backend

1. Get your Replit backend URL (from Replit preview)
2. Update Netlify environment variable `VITE_API_URL`
3. Redeploy: `netlify deploy --prod`
4. Test your live app! 🎉

---

## URLs After Deployment

| Service | URL |
|---------|-----|
| **Frontend** | https://ecommerce-store.netlify.app |
| **Backend** | https://your-replit-url.replit.dev |
| **Database** | Neon (already set up) |
| **GitHub** | https://github.com/saad3012/E-Commerce-Store |

---

## Quick Command Summary

```powershell
# Install tools
npm install -g netlify-cli

# Login
netlify login

# Deploy frontend
cd "C:\Users\techn\Downloads\231701 (3)\231701\ReactTasks\task2\task2"
netlify deploy --prod

# Then deploy backend to Replit manually (see above)
```

---

## ✅ Deployment Checklist

- [ ] Netlify CLI installed
- [ ] Logged in to Netlify
- [ ] Frontend deployed to Netlify
- [ ] Frontend URL copied
- [ ] Backend deployed to Replit
- [ ] Backend URL copied
- [ ] VITE_API_URL set on Netlify
- [ ] Backend CORS_ORIGIN updated
- [ ] Database seeded
- [ ] Tested creating product

---

## 💰 Cost

- **Netlify Frontend**: FREE
- **Replit Backend**: FREE
- **Neon Database**: FREE
- **Total**: $0 ✅

---

**That's it! Your app will be live in <10 minutes!** 🚀
