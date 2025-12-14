# 🚀 START APPLICATION GUIDE

## Current Status ✅

Your Sweet Shop Management System is **READY TO RUN**!

### What's Already Done:
- ✅ Backend (NestJS + TypeScript + PostgreSQL + Prisma)
- ✅ Frontend (React + TypeScript + Vite + Tailwind)
- ✅ Database schema and migrations
- ✅ JWT Authentication
- ✅ All API endpoints
- ✅ Role-based access control
- ✅ Tests written (TDD approach)

## 🎯 Quick Start (3 Steps)

### Step 1: Start Backend

```bash
cd backend
npm run start:dev
```

**Expected Output:**
```
🚀 Backend server is running on: http://localhost:3000
```

### Step 2: Start Frontend (New Terminal)

```bash
cd frontend
npm run dev
```

**Expected Output:**
```
VITE v5.x.x  ready in xxx ms
➜  Local:   http://localhost:5173/
```

### Step 3: Open Browser

Navigate to: **http://localhost:5173**

## 🧪 Test the Application

### 1. Register a User
- Click "Register"
- Email: `admin@test.com`
- Password: `password123`

### 2. Login
- Use the credentials above
- You'll be redirected to the dashboard

### 3. View Sweets
- See all available sweets
- Search by name or category
- Filter by price range

### 4. Purchase a Sweet
- Click "Purchase" on any sweet
- Quantity will decrease

### 5. Admin Panel (Admin Only)
- Click "Admin Panel" in navbar
- Add new sweets
- Update existing sweets
- Delete sweets
- Restock inventory

## 📊 Run Tests

### Backend Tests
```bash
cd backend
npm test
```

### Test Coverage
```bash
cd backend
npm run test:cov
```

## 🔧 Troubleshooting

### Backend won't start?
1. Check PostgreSQL is running
2. Verify `.env` file exists with correct DATABASE_URL
3. Run: `npx prisma generate`

### Frontend won't start?
1. Check backend is running on port 3000
2. Clear browser cache
3. Run: `npm install` again

### Database connection error?
1. Ensure PostgreSQL is running on port 5432
2. Check credentials in `.env`:
   ```
   DATABASE_URL="postgresql://postgres:jb001.100@localhost:5432/sweetshop"
   ```

## 🎨 Features to Test

### User Features:
- ✅ Register new account
- ✅ Login with credentials
- ✅ View all sweets
- ✅ Search sweets by name/category
- ✅ Filter by price range
- ✅ Purchase sweets

### Admin Features:
- ✅ All user features
- ✅ Add new sweets
- ✅ Update sweet details
- ✅ Delete sweets
- ✅ Restock inventory

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Sweets (Protected)
- `GET /api/sweets` - Get all sweets
- `GET /api/sweets/search` - Search sweets
- `POST /api/sweets` - Create sweet (Admin)
- `PUT /api/sweets/:id` - Update sweet (Admin)
- `DELETE /api/sweets/:id` - Delete sweet (Admin)
- `POST /api/sweets/:id/purchase` - Purchase sweet
- `POST /api/sweets/:id/restock` - Restock sweet (Admin)

## 🎯 Next Steps for Submission

1. ✅ Application is running
2. 📸 Take screenshots
3. 🧪 Run test coverage report
4. 📝 Update README with screenshots
5. 🚀 Deploy (optional)
6. 📦 Push to GitHub

## 🆘 Need Help?

If something doesn't work:
1. Check both terminals for error messages
2. Verify PostgreSQL is running
3. Check `.env` file configuration
4. Run `npm install` in both directories
5. Clear browser cache and restart

---

**Your application is ready! Start both servers and begin testing! 🎉**
