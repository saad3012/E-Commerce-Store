# Product Management App

Full-stack product management application with NestJS backend and React frontend.

## Features

- ✨ Create, read, update, and delete products
- 🎨 Modern, responsive UI with CSS modules
- 🔄 Real-time data synchronization
- 🐳 Docker containerization
- ☁️ Ready for Render deployment

## Quick Start

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete setup and deployment instructions.

### Development

```bash
# Backend
cd backend
npm install
npm run start:dev

# Frontend  
npm install
npm run dev
```

### Docker

```bash
docker-compose up --build
```

## Tech Stack

- **Backend**: NestJS, TypeORM, PostgreSQL (Neon)
- **Frontend**: React, Vite
- **DevOps**: Docker, Render

## Documentation

- [Deployment Guide](./DEPLOYMENT.md) - Complete deployment instructions
- [API Documentation](#api-endpoints)

## API Endpoints

- `GET /products` - Get all products
- `POST /products` - Create product
- `GET /products/:id` - Get single product
- `PATCH /products/:id` - Update product
- `DELETE /products/:id` - Delete product
- `POST /products/seed` - Seed initial data

## License

MIT
