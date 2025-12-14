# 🚀 Quick Start Guide - Sweet Shop Management System

## ⚡ Get Running in 5 Minutes

### Prerequisites Check
- ✅ Node.js installed
- ✅ PostgreSQL running
- ✅ Git repository cloned

### Step 1: Backend Setup (2 minutes)

```bash
cd backend

# Install dependencies (if not done)
npm install

# Create .env file
echo 'DATABASE_URL="postgresql://user:password@localhost:5432/sweet_shop?schema=public"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
PORT=3000' > .env

# Edit .env with your actual database credentials

# Setup database
npx prisma migrate dev
npx prisma generate

# Start backend
npm run start:dev
```

✅ Backend running on `http://localhost:3000`

### Step 2: Frontend Setup (1 minute)

```bash
cd frontend

# Install dependencies (if not done)
npm install

# Start frontend
npm run dev
```

✅ Frontend running on `http://localhost:5173`

### Step 3: Test It! (2 minutes)

1. Open `http://localhost:5173`
2. Click "Sign Up"
3. Register with email: `admin@test.com` / password: `password123`
4. You're in! Browse sweets, search, purchase
5. (Optional) Create admin user in database:
   ```sql
   UPDATE "User" SET role = 'ADMIN' WHERE email = 'admin@test.com';
   ```

## 🎯 What's Working

✅ **Authentication**
- Register new users
- Login with JWT tokens
- Protected routes

✅ **Sweets Management**
- View all sweets
- Search by name/category
- Filter by price range
- Purchase sweets (decreases quantity)

✅ **Admin Features** (if role = ADMIN)
- Add new sweets
- Update existing sweets
- Delete sweets
- Restock inventory

## 🐛 Troubleshooting

**Backend won't start?**
- Check `.env` file exists in `backend/`
- Verify PostgreSQL is running
- Check DATABASE_URL is correct

**Frontend can't connect?**
- Ensure backend is running on port 3000
- Check browser console for errors
- Verify CORS is enabled (it is by default)

**Tests failing?**
- Run `npm install` in backend
- Ensure all dependencies installed
- Check `.env` file exists

## 📊 Test Results

```bash
cd backend
npm test
```

Expected: ✅ 17+ tests passing

## 🎉 You're Ready!

The application is fully functional and ready for:
- ✅ Demo
- ✅ Testing
- ✅ Submission
- ✅ Interview discussion

---

**Need help?** Check `SETUP_GUIDE.md` for detailed instructions.

