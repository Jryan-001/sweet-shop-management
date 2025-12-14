# Sweet Shop Management System - Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn

### Step 1: Clone and Install

```bash
# Backend
cd backend
npm install

# Frontend  
cd ../frontend
npm install
```

### Step 2: Database Setup

1. Create a PostgreSQL database:
```sql
CREATE DATABASE sweet_shop;
```

2. Create `.env` file in `backend/` directory:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/sweet_shop?schema=public"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
PORT=3000
```

3. Run migrations:
```bash
cd backend
npx prisma migrate dev
npx prisma generate
```

### Step 3: Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run start:dev
```
Backend will run on: `http://localhost:3000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend will run on: `http://localhost:5173`

### Step 4: Test the Application

1. Open `http://localhost:5173`
2. Register a new user
3. Login with your credentials
4. Browse sweets on the dashboard
5. (If admin) Access admin panel to manage sweets

## 🧪 Running Tests

```bash
cd backend
npm test              # Unit tests
npm run test:cov       # With coverage
npm run test:e2e       # E2E tests
```

## 📁 Project Structure

```
sweet-shop-management/
├── backend/              # NestJS API
│   ├── src/
│   │   ├── auth/        # Authentication module
│   │   ├── sweets/      # Sweets CRUD module
│   │   ├── common/      # Guards & decorators
│   │   └── prisma/      # Database service
│   └── prisma/          # Database schema
│
└── frontend/            # React SPA
    └── src/
        ├── components/  # UI components
        ├── context/     # React context
        └── services/    # API client
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Sweets (Protected - requires JWT)
- `GET /api/sweets` - Get all sweets
- `GET /api/sweets/search` - Search sweets
- `GET /api/sweets/:id` - Get sweet by ID
- `POST /api/sweets` - Create sweet (Admin only)
- `PATCH /api/sweets/:id` - Update sweet (Admin only)
- `DELETE /api/sweets/:id` - Delete sweet (Admin only)
- `POST /api/sweets/:id/purchase` - Purchase sweet
- `POST /api/sweets/:id/restock` - Restock sweet (Admin only)

## 🐛 Troubleshooting

### Backend won't start
- Check database connection in `.env`
- Ensure PostgreSQL is running
- Run `npx prisma generate` if Prisma errors occur

### Frontend can't connect to backend
- Verify backend is running on port 3000
- Check CORS configuration in `backend/src/main.ts`
- Verify proxy in `frontend/vite.config.ts`

### Authentication fails
- Check JWT_SECRET in backend `.env`
- Verify token is being sent in Authorization header
- Check browser console for errors

## 📝 Environment Variables

### Backend (.env)
```env
DATABASE_URL=postgresql://user:pass@localhost:5432/sweet_shop
JWT_SECRET=your-secret-key
PORT=3000
```

### Frontend
No environment variables needed (uses Vite proxy)

