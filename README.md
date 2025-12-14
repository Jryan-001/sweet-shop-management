#  Sweet Shop Management System (मिठास)

A full-stack web application for managing a sweet shop inventory with real-time stock updates, shopping cart, and user authentication.

## ✨ Features

### 🛒 Shopping & Cart
- **Shopping Cart**: Add items to cart with real-time stock validation
- **Real-time Stock Updates**: Inventory syncs every 5 seconds across all users
- **Stock Validation**: Prevents adding more items than available
- **Checkout System**: Complete purchase flow with backend integration

### 👤 User Features
- User registration and JWT authentication
- Browse and search sweets by name/category
- Filter by price range
- Wishlist functionality
- Purchase history tracking
- Contact page with business information

### 💼 Admin Features
- Add, update, and delete sweets
- Restock inventory
- Admin-only protected routes
- Bulk inventory management

### 🎨 UI/UX
- **Dark/Light Theme**: Toggle between Diwali mode (🪔) and Night mode (🌙)
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Real-time Updates**: No page refresh needed for stock changes
- **Smooth Animations**: Confetti effects, transitions, and loading states
- **Optimized Performance**: React.memo to prevent unnecessary re-renders

## 🏗️ Tech Stack

### Backend
- **Framework**: NestJS (Node.js/TypeScript)
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT tokens with bcrypt
- **API**: RESTful endpoints

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **State Management**: React Context API (Auth, Cart, Theme)
- **HTTP Client**: Axios with interceptors

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database
- Git

## 🚀 Installation & Setup

### 1. Clone Repository
```bash
git clone <your-repo-url>
cd sweet-shop-management
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file
echo "DATABASE_URL=postgresql://user:password@localhost:5432/sweet_shop" > .env
echo "JWT_SECRET=your-secret-key" >> .env

# Run migrations
npx prisma migrate dev
npx prisma generate

# Start backend
npm run start:dev
```
Backend runs on `http://localhost:3000`

### 3. Frontend Setup
```bash
cd frontend
npm install

# Start frontend
npm run dev
```
Frontend runs on `http://localhost:5173`

## 📸 Screenshots

### Dashboard - Light Mode
![Dashboard Light Mode](screenshots/dashboard-light.png)

### Dashboard - Dark Mode
![Dashboard Dark Mode](screenshots/dashboard-dark.png)

### Login Page
![Login Page](screenshots/login.png)

### Shopping Cart
![Shopping Cart](screenshots/cart.png)

### Admin Panel
![Admin Panel](screenshots/admin-panel.png)

### Wishlist
![Wishlist](screenshots/wishlist.png)

## 📁 Project Structure

```
sweet-shop-management/
├── backend/
│   ├── src/
│   │   ├── auth/              # Authentication module
│   │   ├── sweets/            # Sweets CRUD module
│   │   ├── prisma/            # Prisma service
│   │   └── main.ts
│   ├── prisma/
│   │   ├── schema.prisma      # Database schema
│   │   └── migrations/
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── Cart.tsx       # Shopping cart
│   │   │   ├── Dashboard.tsx  # Main page
│   │   │   ├── Navbar.tsx     # Navigation
│   │   │   ├── SweetCard.tsx  # Product card
│   │   │   └── ...
│   │   ├── context/           # React contexts
│   │   │   ├── AuthContext.tsx
│   │   │   ├── CartContext.tsx
│   │   │   └── ThemeContext.tsx
│   │   ├── services/
│   │   │   └── api.ts         # API service layer
│   │   ├── types/
│   │   │   └── index.ts       # TypeScript types
│   │   └── App.tsx
│   └── package.json
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Sweets (Protected)
- `GET /api/sweets` - Get all sweets
- `GET /api/sweets/search` - Search sweets
- `GET /api/sweets/:id` - Get sweet by ID
- `POST /api/sweets` - Create sweet (Admin)
- `PUT /api/sweets/:id` - Update sweet (Admin)
- `DELETE /api/sweets/:id` - Delete sweet (Admin)
- `POST /api/sweets/:id/purchase` - Purchase sweet
- `POST /api/sweets/:id/restock` - Restock sweet (Admin)

## 🎯 Key Features Explained

### Real-Time Stock Management
- Dashboard polls backend every 5 seconds
- Only updates UI when stock actually changes
- Prevents UI flickering with React.memo optimization
- Shows live stock availability in cart

### Cart System
- Validates stock before adding items
- Shows real-time availability per item
- Prevents exceeding available quantity
- Checkout validates stock again before purchase

### Theme System
- Light theme: Warm gradient (orange/yellow/pink)
- Dark theme: Cool gradient (slate/gray)
- Persists user preference in localStorage
- Smooth transitions between themes

## 🧪 Testing

```bash
cd backend
npm test              # Unit tests
npm run test:cov      # Coverage report
npm run test:e2e      # E2E tests
```

## 🚢 Deployment

### Backend
1. Set up PostgreSQL database (Heroku, Railway, AWS RDS)
2. Configure environment variables
3. Run `npx prisma migrate deploy`
4. Deploy to Node.js hosting (Heroku, Railway, Render)

### Frontend
1. Build: `npm run build`
2. Deploy `dist` folder to:
   - Vercel (recommended)
   - Netlify
   - AWS S3 + CloudFront

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Protected API routes
- Role-based access control (USER/ADMIN)
- Input validation with class-validator
- CORS configuration

## 🎨 UI Components

- **Navbar**: Navigation with cart badge, theme toggle
- **Dashboard**: Product grid with search/filter
- **SweetCard**: Product card with stock info, add to cart
- **Cart**: Shopping cart with quantity controls
- **Wishlist**: Save favorite items
- **Contact**: Business contact information
- **Admin Panel**: Inventory management

## 📊 Features Breakdown

| Feature | Status | Description |
|---------|--------|-------------|
| Authentication | ✅ | JWT-based login/register |
| Shopping Cart | ✅ | Add/remove items, checkout |
| Real-time Stock | ✅ | 5-second polling, live updates |
| Wishlist | ✅ | Save favorite items |
| Search & Filter | ✅ | By name, category, price |
| Admin Panel | ✅ | CRUD operations |
| Dark/Light Theme | ✅ | Toggle with persistence |
| Contact Page | ✅ | Business information |
| Responsive Design | ✅ | Mobile-first approach |

## 🤝 Contributing

This project was built as a learning exercise. Feel free to fork and modify!


## 👤 Author

Built as a part of Incubyte family.

---

**Note**: This project demonstrates modern web development practices including:
- TypeScript for type safety
- React Context for state management
- Real-time data synchronization
- Responsive design with Tailwind CSS
- RESTful API design
- Database modeling with Prisma
- Authentication & authorization
- Performance optimization


