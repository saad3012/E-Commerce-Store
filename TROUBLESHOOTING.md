# 🔧 Troubleshooting Guide

Common issues and solutions for the Product Management App.

## Table of Contents
- [Local Development Issues](#local-development-issues)
- [Docker Issues](#docker-issues)
- [Database Issues](#database-issues)
- [Deployment Issues](#deployment-issues)
- [API Issues](#api-issues)
- [Frontend Issues](#frontend-issues)

---

## Local Development Issues

### Issue: Port Already in Use

**Symptoms:**
```
Error: listen EADDRINUSE: address already in use :::3001
```

**Solutions:**

**Windows:**
```powershell
# Find process using port 3001
netstat -ano | findstr :3001

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F

# For port 5173
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

**Linux/Mac:**
```bash
# Find and kill process on port 3001
lsof -ti:3001 | xargs kill -9

# For port 5173
lsof -ti:5173 | xargs kill -9
```

### Issue: Module Not Found

**Symptoms:**
```
Error: Cannot find module 'xyz'
```

**Solutions:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules backend/node_modules
rm package-lock.json backend/package-lock.json
npm install
cd backend && npm install
```

### Issue: TypeScript Errors

**Symptoms:**
```
error TS2307: Cannot find module 'xyz'
```

**Solutions:**
```bash
cd backend
npm install --save-dev @types/node @types/express
npm run build
```

---

## Docker Issues

### Issue: Docker Build Fails

**Symptoms:**
```
ERROR [internal] load metadata for docker.io/library/node:20-alpine
```

**Solutions:**
```bash
# Pull base image manually
docker pull node:20-alpine

# Build without cache
docker-compose build --no-cache

# Check Docker is running
docker ps
```

### Issue: Container Exits Immediately

**Symptoms:**
Container starts then stops immediately

**Solutions:**
```bash
# Check logs
docker-compose logs backend

# Run in foreground to see errors
docker-compose up

# Check environment variables
docker-compose config
```

### Issue: Cannot Connect to Container

**Symptoms:**
```
Connection refused when accessing localhost:3001
```

**Solutions:**
```bash
# Check if containers are running
docker-compose ps

# Inspect network
docker network inspect task2_default

# Restart containers
docker-compose restart

# Check port mapping
docker-compose port backend 3001
```

### Issue: Database Connection in Docker

**Symptoms:**
Backend can't connect to Neon database from Docker

**Solutions:**
```bash
# Verify DATABASE_URL in .env file
cat .env

# Test connection from container
docker-compose exec backend sh
node -e "console.log(process.env.DATABASE_URL)"

# Ensure SSL mode is set
# DATABASE_URL should end with ?sslmode=require
```

---

## Database Issues

### Issue: Cannot Connect to Neon

**Symptoms:**
```
Error: getaddrinfo ENOTFOUND ep-xxx.neon.tech
```

**Solutions:**
1. Verify connection string format:
```
postgresql://username:password@ep-xxx.neon.tech/dbname?sslmode=require
```

2. Check Neon dashboard - ensure database is not paused

3. Test connection directly:
```bash
npm install -g pg-cli
psql "your-connection-string"
```

4. Verify SSL mode is included:
```
?sslmode=require
```

### Issue: SSL Connection Error

**Symptoms:**
```
Error: SSL connection required
```

**Solutions:**
Update your DATABASE_URL to include SSL:
```
postgresql://user:pass@host.neon.tech/db?sslmode=require
```

In app.module.ts, ensure SSL config:
```typescript
ssl: {
  rejectUnauthorized: false,
}
```

### Issue: Table Does Not Exist

**Symptoms:**
```
Error: relation "products" does not exist
```

**Solutions:**
1. Check synchronize setting in app.module.ts:
```typescript
synchronize: process.env.NODE_ENV !== 'production',
```

2. Manually create tables (production):
```bash
# Connect to database
psql "your-connection-string"

# Run migrations (if implemented)
npm run migration:run
```

3. Restart backend to trigger auto-sync (dev only)

### Issue: Connection Pool Exhausted

**Symptoms:**
```
Error: Connection pool exhausted
```

**Solutions:**
Add connection pool settings in app.module.ts:
```typescript
TypeOrmModule.forRoot({
  // ... other config
  poolSize: 10,
  connectionTimeoutMillis: 5000,
})
```

---

## Deployment Issues

### Issue: Render Build Fails

**Symptoms:**
Build fails during deployment on Render

**Solutions:**

1. **Check build logs** in Render dashboard

2. **Verify Dockerfile** syntax:
```bash
# Test build locally
docker build -t test-build -f backend/Dockerfile backend/
docker build -t test-build -f Dockerfile .
```

3. **Check dependencies** in package.json

4. **Verify Node version**:
```json
"engines": {
  "node": ">=20.0.0"
}
```

### Issue: Backend Health Check Failing

**Symptoms:**
Render shows "Service Unhealthy"

**Solutions:**

1. Check if app is listening on correct port:
```typescript
// main.ts
const port = process.env.PORT || 3001;
await app.listen(port, '0.0.0.0'); // Important: bind to 0.0.0.0
```

2. Update health check in render.yaml:
```yaml
healthCheckPath: /products
```

3. Verify database connection is successful

### Issue: Environment Variables Not Working

**Symptoms:**
App can't read environment variables on Render

**Solutions:**

1. **Check Render dashboard** → Service → Environment
2. Ensure variables are saved (click "Save Changes")
3. **Redeploy** after adding variables
4. **Check variable names** (case-sensitive)

Example correct format:
```
DATABASE_URL=postgresql://...
PORT=3001
NODE_ENV=production
```

### Issue: CORS Error After Deployment

**Symptoms:**
```
Access to fetch at 'https://backend.onrender.com' from origin 'https://frontend.onrender.com' has been blocked by CORS policy
```

**Solutions:**

1. Update backend CORS_ORIGIN:
```
CORS_ORIGIN=https://your-frontend.onrender.com
```

2. Check main.ts CORS config:
```typescript
app.enableCors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
});
```

3. **Redeploy backend** after changing environment variable

4. For multiple origins:
```typescript
app.enableCors({
  origin: [
    'https://frontend.onrender.com',
    'http://localhost:5173'
  ],
  credentials: true,
});
```

---

## API Issues

### Issue: 404 Not Found

**Symptoms:**
```
GET /products → 404 Not Found
```

**Solutions:**

1. Verify endpoint exists in controller:
```typescript
@Get()
findAll() {
  return this.productsService.findAll();
}
```

2. Check controller is registered:
```typescript
// products.module.ts
@Module({
  controllers: [ProductsController],
})
```

3. Verify module is imported:
```typescript
// app.module.ts
@Module({
  imports: [ProductsModule],
})
```

4. Test with full URL:
```bash
curl http://localhost:3001/products
```

### Issue: 500 Internal Server Error

**Symptoms:**
API returns 500 error

**Solutions:**

1. **Check backend logs:**
```bash
# Local
npm run start:dev

# Docker
docker-compose logs backend

# Render
Check logs in dashboard
```

2. **Add error handling:**
```typescript
try {
  // your code
} catch (error) {
  console.error('Error:', error);
  throw error;
}
```

3. **Check database connection**

4. **Verify TypeORM entities** are properly defined

### Issue: Validation Errors

**Symptoms:**
```
400 Bad Request - Validation failed
```

**Solutions:**

1. Check DTO validation:
```typescript
export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  
  @IsString()
  @IsOptional()
  description?: string;
}
```

2. Ensure ValidationPipe is enabled:
```typescript
// main.ts
app.useGlobalPipes(new ValidationPipe({
  whitelist: true,
  transform: true,
}));
```

3. Send correct request body:
```json
{
  "name": "Product Name",
  "description": "Description",
  "price": "$99",
  "image": "image.jpg"
}
```

---

## Frontend Issues

### Issue: Blank Page

**Symptoms:**
Frontend loads but shows blank page

**Solutions:**

1. **Check browser console** for errors (F12)

2. **Verify API URL:**
```javascript
// Check .env
VITE_API_URL=http://localhost:3001

// Or in products.js
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
console.log('API URL:', API_URL);
```

3. **Check network tab** in DevTools

4. **Verify backend is running:**
```bash
curl http://localhost:3001/products
```

### Issue: Products Not Loading

**Symptoms:**
Frontend loads but no products appear

**Solutions:**

1. **Check API response:**
```javascript
// In browser console
fetch('http://localhost:3001/products')
  .then(r => r.json())
  .then(console.log)
```

2. **Seed database if empty:**
```bash
curl -X POST http://localhost:3001/products/seed
```

3. **Check for errors in useEffect:**
```javascript
useEffect(() => {
  loadProducts().catch(err => {
    console.error('Failed to load:', err);
  });
}, []);
```

4. **Verify state management:**
```javascript
console.log('Products state:', products);
```

### Issue: Cannot Add Products

**Symptoms:**
Form submission fails

**Solutions:**

1. **Check form submission:**
```javascript
const handleAdd = async (product) => {
  try {
    console.log('Submitting:', product);
    const result = await api.createProduct(product);
    console.log('Created:', result);
  } catch (err) {
    console.error('Error:', err);
  }
};
```

2. **Verify API endpoint:**
```bash
curl -X POST http://localhost:3001/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","price":"$99"}'
```

3. **Check CORS** (see CORS section above)

### Issue: Build Fails

**Symptoms:**
```
npm run build fails
```

**Solutions:**

1. **Check for TypeScript/ESLint errors:**
```bash
npm run lint
```

2. **Clear cache and rebuild:**
```bash
rm -rf node_modules dist
npm install
npm run build
```

3. **Check Vite config:**
```javascript
// vite.config.js
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
})
```

---

## Performance Issues

### Issue: Slow API Responses

**Solutions:**

1. **Add database indexes:**
```typescript
@Entity('products')
@Index(['name'])
export class Product {
  // ...
}
```

2. **Enable query logging** to identify slow queries:
```typescript
TypeOrmModule.forRoot({
  logging: true,
})
```

3. **Check Neon dashboard** for query performance

### Issue: Frontend Slow to Load

**Solutions:**

1. **Check network tab** in DevTools
2. **Optimize images** (compress, use WebP)
3. **Enable production build:**
```bash
npm run build
npm run preview
```

4. **Add lazy loading** for components

---

## Debugging Tips

### Backend Debugging

```typescript
// Add logging
console.log('Environment:', process.env.NODE_ENV);
console.log('Database URL:', process.env.DATABASE_URL?.substring(0, 30) + '...');
console.log('CORS Origin:', process.env.CORS_ORIGIN);

// In service
async findAll() {
  console.log('Finding all products...');
  const products = await this.productsRepository.find();
  console.log(`Found ${products.length} products`);
  return products;
}
```

### Frontend Debugging

```javascript
// Add logging
useEffect(() => {
  console.log('Component mounted');
  console.log('API URL:', import.meta.env.VITE_API_URL);
  loadProducts();
}, []);

// In API calls
export const api = {
  async getProducts() {
    console.log('Fetching products from:', `${API_URL}/products`);
    const response = await fetch(`${API_URL}/products`);
    console.log('Response status:', response.status);
    const data = await response.json();
    console.log('Products received:', data.length);
    return data;
  },
};
```

### Docker Debugging

```bash
# Enter container
docker-compose exec backend sh

# Check environment
env | grep DATABASE

# Test Node
node --version

# Check files
ls -la /app

# Test database connection
node -e "require('pg').Pool({connectionString:process.env.DATABASE_URL}).query('SELECT 1').then(console.log)"
```

---

## Getting Help

If issues persist:

1. **Check all logs:**
   - Backend console
   - Browser console (F12)
   - Docker logs
   - Render logs

2. **Verify all environment variables**

3. **Test each component individually:**
   - Database connection
   - Backend API (curl)
   - Frontend (network tab)

4. **Review documentation:**
   - [DEPLOYMENT.md](./DEPLOYMENT.md)
   - [DEV_GUIDE.md](./DEV_GUIDE.md)
   - [RENDER_DEPLOYMENT.md](./RENDER_DEPLOYMENT.md)

5. **Common fix: Restart everything**
```bash
# Stop all
docker-compose down
# or Ctrl+C on terminals

# Clear caches
rm -rf node_modules backend/node_modules
npm install
cd backend && npm install

# Restart
docker-compose up --build
# or start dev servers manually
```

---

**Still stuck? Double-check:**
- ✅ Environment files (.env) are correctly configured
- ✅ Database connection string includes `?sslmode=require`
- ✅ Ports are not in use
- ✅ All dependencies are installed
- ✅ Node.js version is 20+
- ✅ Docker is running (if using Docker)
