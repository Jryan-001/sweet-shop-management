# Sweet Shop Management System - Frontend

A modern, responsive React frontend application for managing a sweet shop inventory.

## Features

- 🔐 **User Authentication**: Login and registration with JWT token management
- 🍬 **Sweet Dashboard**: Browse all available sweets with search and filter capabilities
- 🛒 **Purchase Functionality**: Users can purchase sweets (decreases quantity)
- 👨‍💼 **Admin Panel**: Full CRUD operations for sweets management
  - Add new sweets
  - Update existing sweets
  - Delete sweets
  - Restock inventory
- 🎨 **Modern UI**: Beautiful, responsive design with Tailwind CSS
- 🔍 **Search & Filter**: Search by name/category and filter by price range

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend API running on `http://localhost:3000`

## Setup Instructions

1. **Install dependencies**:
   ```bash
   cd frontend
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
frontend/
├── src/
│   ├── components/       # React components
│   │   ├── AdminPanel.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Login.tsx
│   │   ├── Navbar.tsx
│   │   ├── ProtectedRoute.tsx
│   │   ├── Register.tsx
│   │   └── SweetCard.tsx
│   ├── context/          # React context providers
│   │   └── AuthContext.tsx
│   ├── services/         # API service layer
│   │   └── api.ts
│   ├── types/            # TypeScript type definitions
│   │   └── index.ts
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## API Integration

The frontend expects the backend API to be running on `http://localhost:3000` with the following endpoints:

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

## Environment Variables

The frontend uses a proxy configuration in `vite.config.ts` to forward `/api` requests to the backend. If your backend runs on a different port, update the proxy target in `vite.config.ts`.

## Building for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

## Deployment

The frontend can be deployed to:
- **Vercel**: Connect your GitHub repo and deploy
- **Netlify**: Drag and drop the `dist` folder or connect via Git
- **AWS S3 + CloudFront**: Upload `dist` folder to S3 bucket

Make sure to configure the API base URL for production environments.

