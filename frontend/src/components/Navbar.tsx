import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';

export const Navbar: React.FC = () => {
  const { user, logout, isAdmin } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className={`shadow-xl sticky top-0 z-50 transition-all duration-300 ${
      isDark 
        ? 'bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900' 
        : 'bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-600'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-3xl font-bold text-white hover:scale-110 transition-transform duration-300 flex items-center gap-2">
              <span className="text-4xl">मिठास</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="text-white hover:bg-white/20 p-2 rounded-lg transition-all duration-300 hover:scale-110"
              title={isDark ? 'Diwali Mode' : 'Night Mode'}
            >
              {isDark ? '🪔' : '🌙'}
            </button>
            {user ? (
              <>
                <Link
                  to="/"
                  className="text-white hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:scale-105"
                >
                  Dashboard
                </Link>
                <Link
                  to="/wishlist"
                  className="text-white hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:scale-105"
                >
                  Wishlist
                </Link>
                <Link
                  to="/contact"
                  className="text-white hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:scale-105"
                >
                  Contact
                </Link>
                <Link
                  to="/cart"
                  className="text-white hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:scale-105 relative"
                >
                  Cart
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="text-white hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:scale-105"
                  >
                    Admin Panel
                  </Link>
                )}
                <span className="text-white text-sm font-medium bg-white/10 px-3 py-1 rounded-full">
                  {user.email} {isAdmin && '(Admin)'}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-white text-orange-600 px-5 py-2 rounded-lg text-sm font-bold hover:bg-orange-50 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-orange-600 px-5 py-2 rounded-lg text-sm font-bold hover:bg-orange-50 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

