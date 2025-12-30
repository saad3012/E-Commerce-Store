# 🚀 Deploy to Vercel - Easy & Free (No Card Required!)

Deploy your E-Commerce app to Vercel in minutes without a credit card!

---

## Strategy

- **Frontend**: Deploy to Vercel (FREE, no card needed)
- **Backend**: Keep on Render or deploy to Railway/Fly.io
- **Database**: Neon PostgreSQL (already set up)

---

## Part 1: Deploy Backend (Choose One Option)

### Option A: Render (Requires Card)
Follow [DEPLOY_NOW.md](./DEPLOY_NOW.md) Steps 1-2

### Option B: Railway (Free $5 Credit, No Card Initially)

1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select **E-Commerce-Store**
5. Configure:
   - **Root Directory**: `backend`
   - Add Environment Variables:
     ```
     DATABASE_URL=postgresql://neondb_owner:npg_I5X4PDmOvuhQ@ep-sweet-glade-a4psakgl-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require
     PORT=3001
     NODE_ENV=production
     CORS_ORIGIN=*
     ```
6. Deploy and copy your backend URL

### Option C: Use Local Backend for Testing
Keep your local backend running and use ngrok to expose it:
```powershell
# Install ngrok: https://ngrok.com/download
ngrok http 3001
# Copy the https URL (e.g., https://xxxx.ngrok.io)
```

---

## Part 2: Deploy Frontend to Vercel (FREE!)

### Method 1: Using Vercel Dashboard (Easiest)

1. Go to https://vercel.com
2. Click "Sign Up" → Use GitHub
3. Click "Add New..." → "Project"
4. Import **E-Commerce-Store** repository
5. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (leave as is)
   - **Build Command**: `npm install && npm run build`
   - **Output Directory**: `dist`
6. Add Environment Variable:
   - **Key**: `VITE_API_URL`
   - **Value**: Your backend URL (from Part 1)
7. Click "Deploy"
8. Wait 2-3 minutes
9. Done! 🎉

### Method 2: Using Vercel CLI

```powershell
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
cd "C:\Users\techn\Downloads\231701 (3)\231701\ReactTasks\task2\task2"
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? ecommerce-store
# - Directory? ./ (default)
# - Override settings? No

# Add environment variable
vercel env add VITE_API_URL production
# Enter your backend URL when prompted

# Deploy to production
vercel --prod
```

---

## Part 3: Update Backend CORS

After frontend deploys, update backend CORS:

**Render/Railway Backend:**
1. Go to your backend service dashboard
2. Update `CORS_ORIGIN` environment variable
3. Set value to: `https://your-frontend.vercel.app`

**Local Backend:**
Update `backend/.env`:
```
CORS_ORIGIN=https://your-frontend.vercel.app
```

---

## Part 4: Test Your Live App

1. Open your Vercel URL: `https://ecommerce-store-xxx.vercel.app`
2. Click "Add Product"
3. Add a new product
4. Should save successfully! 🎉

If no products appear, seed the database:
```powershell
Invoke-RestMethod -Uri "https://YOUR-BACKEND-URL/products/seed" -Method Post
```

---

## 🎯 Quick Start (Copy-Paste)

```powershell
# Install Vercel CLI
npm install -g vercel

# Navigate to project
cd "C:\Users\techn\Downloads\231701 (3)\231701\ReactTasks\task2\task2"

# Commit vercel.json
git add vercel.json VERCEL_DEPLOY.md
git commit -m "Add Vercel configuration"
git push

# Deploy to Vercel
vercel login
vercel

# Set environment variable (when prompted for backend URL)
vercel env add VITE_API_URL production

# Deploy to production
vercel --prod
```

---

## 📋 Environment Variables Reference

### Frontend (Vercel)
| Key | Value |
|-----|-------|
| `VITE_API_URL` | Your backend URL |

### Backend (Railway/Render)
| Key | Value |
|-----|-------|
| `DATABASE_URL` | Your Neon connection string |
| `PORT` | `3001` |
| `NODE_ENV` | `production` |
| `CORS_ORIGIN` | Your Vercel frontend URL |

---

## 🐛 Troubleshooting

### Frontend loads but no products

**Check:**
1. Backend is running (visit backend URL)
2. CORS is configured with your Vercel URL
3. Seed database: `POST /products/seed`

### Build fails on Vercel

**Solution:**
Check build logs in Vercel dashboard. Common fixes:
- Ensure `package.json` is in root
- Check Node.js version compatibility
- Verify all dependencies are in `package.json`

---

## ✅ Deployment Checklist

- [ ] Backend deployed (Railway/Render/ngrok)
- [ ] Backend URL copied
- [ ] Frontend deployed to Vercel
- [ ] `VITE_API_URL` set on Vercel
- [ ] Frontend URL copied
- [ ] Backend `CORS_ORIGIN` updated with frontend URL
- [ ] Database seeded
- [ ] Tested creating a product

---

## 💰 Cost

- **Vercel Frontend**: FREE (100GB bandwidth)
- **Railway Backend**: $5 free credit (no card initially)
- **Neon Database**: FREE (3GB storage)
- **Total**: $0 to start!

---

**Your app will be live in ~10 minutes! 🚀**

Need help? Check the Vercel deployment logs in the dashboard.
