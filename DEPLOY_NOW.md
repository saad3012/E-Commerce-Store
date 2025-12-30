# 🚀 Deploy to Render - Step by Step

Your code is now on GitHub: https://github.com/saad3012/E-Commerce-Store

Follow these steps to deploy to Render:

---

## Step 1: Create Neon Database (5 minutes)

1. Go to https://neon.tech
2. Sign up/Login (use GitHub for quick signup)
3. Click **"Create a project"**
4. **Project Name**: `ecommerce-store`
5. **Region**: Choose closest to you (e.g., US East)
6. Click **"Create Project"**

7. **Copy your connection string** - it looks like:
```
postgresql://username:password@ep-xyz-123.us-east-2.aws.neon.tech/neondb?sslmode=require
```

**SAVE THIS - you'll need it in Step 3!**

---

## Step 2: Deploy Backend to Render (10 minutes)

### 2.1 Create Web Service

1. Go to https://dashboard.render.com
2. Sign up/Login (use GitHub)
3. Click **"New +"** → **"Web Service"**
4. Click **"Connect account"** to link GitHub
5. Find and select **"E-Commerce-Store"**
6. Click **"Connect"**

### 2.2 Configure Backend

Fill in these settings:

| Field | Value |
|-------|-------|
| **Name** | `ecommerce-backend` |
| **Region** | Same as your Neon database |
| **Branch** | `main` |
| **Root Directory** | `backend` |
| **Runtime** | `Docker` |
| **Instance Type** | `Free` |

### 2.3 Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**

Add these variables one by one:

```
DATABASE_URL
paste your Neon connection string here

PORT
3001

NODE_ENV
production

CORS_ORIGIN
*
```

**Note:** We'll update CORS_ORIGIN after deploying the frontend

### 2.4 Deploy Backend

1. Click **"Create Web Service"**
2. Wait 5-10 minutes for the build
3. Watch the logs - you should see "Application is running on..."
4. **Copy your backend URL** (e.g., `https://ecommerce-backend.onrender.com`)

### 2.5 Test Backend

Open in browser or use PowerShell:
```powershell
Invoke-RestMethod -Uri "https://YOUR-BACKEND-URL.onrender.com/products"
```

Should return an empty array `[]`

Seed the database:
```powershell
Invoke-RestMethod -Uri "https://YOUR-BACKEND-URL.onrender.com/products/seed" -Method Post
```

Verify:
```powershell
Invoke-RestMethod -Uri "https://YOUR-BACKEND-URL.onrender.com/products"
```

Should now return 3 products!

---

## Step 3: Deploy Frontend to Render (5 minutes)

### 3.1 Create Static Site

1. In Render Dashboard, click **"New +"** → **"Static Site"**
2. Select **"E-Commerce-Store"** repository
3. Click **"Connect"**

### 3.2 Configure Frontend

| Field | Value |
|-------|-------|
| **Name** | `ecommerce-frontend` |
| **Branch** | `main` |
| **Root Directory** | *(leave blank)* |
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `dist` |

### 3.3 Add Environment Variable

Click **"Advanced"** → **"Add Environment Variable"**

```
VITE_API_URL
https://YOUR-BACKEND-URL.onrender.com
```

Replace `YOUR-BACKEND-URL` with your actual backend URL from Step 2.4

### 3.4 Deploy Frontend

1. Click **"Create Static Site"**
2. Wait 3-5 minutes for the build
3. **Copy your frontend URL** (e.g., `https://ecommerce-frontend.onrender.com`)

---

## Step 4: Update CORS (2 minutes)

Now that you have both URLs, update the backend CORS:

1. Go to Render Dashboard → **ecommerce-backend** service
2. Click **"Environment"** in the left sidebar
3. Find `CORS_ORIGIN` variable
4. Update value to your frontend URL:
```
https://ecommerce-frontend.onrender.com
```
5. Click **"Save Changes"**
6. Backend will automatically redeploy (1-2 minutes)

---

## Step 5: Test Your Live App! 🎉

1. Open your frontend URL in browser
2. You should see the E-Commerce Dashboard
3. You should see 3 products
4. Try adding a new product
5. Refresh - your product should still be there!

---

## 📋 Quick Reference

| Service | URL | Notes |
|---------|-----|-------|
| GitHub | https://github.com/saad3012/E-Commerce-Store | Your code |
| Neon Database | https://console.neon.tech | Database dashboard |
| Backend | https://ecommerce-backend.onrender.com | API |
| Frontend | https://ecommerce-frontend.onrender.com | Your app |

---

## 🐛 Troubleshooting

### Frontend shows "Failed to load products"

**Check:**
1. Backend is running (visit backend URL in browser)
2. CORS_ORIGIN is set to your frontend URL
3. VITE_API_URL is correct in frontend environment variables

### Backend shows "Database connection failed"

**Check:**
1. DATABASE_URL is correct (includes `?sslmode=require`)
2. Neon database is active (not paused)
3. Connection string has correct username/password

### Products don't appear

**Solution:**
Seed the database:
```powershell
Invoke-RestMethod -Uri "https://YOUR-BACKEND-URL.onrender.com/products/seed" -Method Post
```

---

## 💡 Important Notes

1. **Free Tier Sleep**: Backend sleeps after 15 minutes of inactivity
   - First request after sleep takes 20-30 seconds
   - Upgrade to paid tier ($7/month) to prevent sleep

2. **Environment Variables**: Always redeploy after changing env vars

3. **HTTPS**: Render automatically provides SSL certificates

4. **Logs**: View logs in Render Dashboard for debugging

---

## ✅ Deployment Checklist

- [ ] Neon database created
- [ ] Backend deployed to Render
- [ ] Backend URL saved
- [ ] Database seeded
- [ ] Frontend deployed to Render
- [ ] Frontend URL saved
- [ ] CORS_ORIGIN updated on backend
- [ ] Tested creating a product
- [ ] Tested viewing products

---

**That's it! Your app is live! 🚀**

Share your frontend URL with anyone to show off your work!
