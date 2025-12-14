# 🚀 QUICK REFERENCE CARD

## Start Application (3 Steps)

### 1️⃣ First Time Setup
```bash
setup.bat
```

### 2️⃣ Start Backend (Terminal 1)
```bash
start-backend.bat
```
**URL**: http://localhost:3000

### 3️⃣ Start Frontend (Terminal 2)
```bash
start-frontend.bat
```
**URL**: http://localhost:5173

## 🔑 Test Credentials

```
Admin: admin@sweetshop.com / admin123
User:  user@sweetshop.com / user123
```

## 📝 API Endpoints

### Auth
```
POST /api/auth/register
POST /api/auth/login
```

### Sweets
```
GET    /api/sweets
GET    /api/sweets/search?name=&category=&minPrice=&maxPrice=
POST   /api/sweets              (Admin)
PUT    /api/sweets/:id          (Admin)
DELETE /api/sweets/:id          (Admin)
POST   /api/sweets/:id/purchase
POST   /api/sweets/:id/restock  (Admin)
```

## 🧪 Testing

```bash
cd backend
npm test              # Run tests
npm run test:cov      # Coverage
npm run test:watch    # Watch mode
```

## 🛠️ Troubleshooting

### Backend won't start?
```bash
cd backend
npx prisma generate
npm run start:dev
```

### Database error?
1. Check PostgreSQL is running
2. Verify `.env` file:
   ```
   DATABASE_URL="postgresql://postgres:jb001.100@localhost:5432/sweetshop"
   ```

### Frontend error?
```bash
cd frontend
npm install
npm run dev
```

## 📦 Project Structure

```
sweet-shop-management/
├── backend/          # NestJS API
│   ├── src/
│   │   ├── auth/    # Authentication
│   │   ├── sweets/  # Sweets CRUD
│   │   ├── common/  # Guards, decorators
│   │   └── prisma/  # Database service
│   └── prisma/
│       ├── schema.prisma
│       └── seed.ts
├── frontend/         # React SPA
│   └── src/
│       ├── components/
│       ├── context/
│       ├── services/
│       └── types/
└── README.md
```

## 🎯 Features

### User
- ✅ Register/Login
- ✅ View sweets
- ✅ Search & filter
- ✅ Purchase sweets

### Admin
- ✅ All user features
- ✅ Add sweets
- ✅ Update sweets
- ✅ Delete sweets
- ✅ Restock inventory

## 📊 Tech Stack

**Backend**: NestJS + TypeScript + PostgreSQL + Prisma + JWT
**Frontend**: React + TypeScript + Vite + Tailwind
**Testing**: Jest + TDD approach

## 🔗 Important Files

- `START_APPLICATION.md` - Detailed startup guide
- `TESTING_GUIDE.md` - Testing documentation
- `PROJECT_COMPLETE.md` - Completion status
- `README.md` - Main documentation

## ⚡ Quick Commands

```bash
# Backend
cd backend
npm run start:dev     # Start server
npm test              # Run tests
npm run seed          # Seed database

# Frontend
cd frontend
npm run dev           # Start dev server
npm run build         # Build for production

# Database
cd backend
npx prisma generate   # Generate client
npx prisma migrate deploy  # Apply migrations
npx prisma studio     # Open Prisma Studio
```

## 🎨 UI Routes

```
/login          # Login page
/register       # Registration page
/               # Dashboard (protected)
/admin          # Admin panel (admin only)
```

## 📸 For Submission

1. ✅ Take screenshots of all pages
2. ✅ Run `npm run test:cov`
3. ✅ Save coverage report
4. ✅ Update README with screenshots
5. ✅ Push to GitHub
6. ✅ Submit!

## 🆘 Need Help?

1. Check error messages in terminal
2. Verify PostgreSQL is running
3. Check `.env` configuration
4. Run `npm install` in both directories
5. Clear browser cache

---

**Everything is ready! Just run the commands above! 🎉**
