import React, { useState, useEffect } from 'react';
import { sweetsAPI } from '../services/api';
import type { Sweet } from '../types';
import { SweetCard } from './SweetCard';
import { useAuth } from '../context/AuthContext';

export const Wishlist: React.FC = () => {
  const [wishlistSweets, setWishlistSweets] = useState<Sweet[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    try {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      const allSweets = await sweetsAPI.getAll();
      const filtered = allSweets.filter(sweet => wishlist.includes(sweet.id));
      setWishlistSweets(filtered);
    } catch (error) {
      console.error('Failed to load wishlist', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-purple-950 dark:via-pink-950 dark:to-orange-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 dark:from-yellow-400 dark:to-pink-400 bg-clip-text text-transparent mb-2">
            My Wishlist
          </h1>
          <p className="text-gray-700 dark:text-gray-300">Your favorite sweets saved for later</p>
        </div>

        {wishlistSweets.length === 0 ? (
          <div className="text-center py-20">
            <svg className="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-500 dark:text-gray-400">Start adding sweets you love!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistSweets.map((sweet) => (
              <SweetCard
                key={sweet.id}
                sweet={sweet}
                onUpdate={loadWishlist}
                canPurchase={!!user}
                isAdmin={user?.role === 'ADMIN'}
                allSweets={wishlistSweets}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
