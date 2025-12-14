import React, { useState, useEffect } from 'react';
import { sweetsAPI } from '../services/api';
import type { Sweet } from '../types';
import { SweetCard } from './SweetCard';
import { useAuth } from '../context/AuthContext';
import { ScrollToTop } from './ScrollToTop';
import { LoadingSkeleton } from './LoadingSkeleton';
import { SweetOfTheDay } from './SweetOfTheDay';
import { PurchaseHistory } from './PurchaseHistory';
import { MithaiMeter } from './MithaiMeter';
import { FestivalCountdown } from './FestivalCountdown';


import { PerformanceMetrics } from './PerformanceMetrics';

export const Dashboard: React.FC = () => {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [filteredSweets, setFilteredSweets] = useState<Sweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [exchangeRate, setExchangeRate] = useState(84.5);
  const { user } = useAuth();

  useEffect(() => {
    loadSweets();
    fetchExchangeRate();
    const interval = setInterval(() => loadSweets(true), 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchExchangeRate = async () => {
    try {
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      const data = await response.json();
      setExchangeRate(data.rates.INR);
    } catch {
      setExchangeRate(84.5);
    }
  };

  useEffect(() => {
    filterSweets();
  }, [sweets, searchTerm, selectedCategory, priceRange]);

  const loadSweets = async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      const data = await sweetsAPI.getAll();
      setSweets(prev => {
        const hasChanges = JSON.stringify(prev) !== JSON.stringify(data);
        return hasChanges ? data : prev;
      });
    } catch (err: any) {
      if (!silent) setError(err.response?.data?.message || 'Failed to load sweets');
    } finally {
      if (!silent) setLoading(false);
    }
  };

  const filterSweets = () => {
    let filtered = [...sweets];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (sweet) =>
          sweet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sweet.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((sweet) => sweet.category === selectedCategory);
    }

    // Filter by price range
    if (priceRange.min) {
      filtered = filtered.filter((sweet) => sweet.price >= parseFloat(priceRange.min));
    }
    if (priceRange.max) {
      filtered = filtered.filter((sweet) => sweet.price <= parseFloat(priceRange.max));
    }

    setFilteredSweets(filtered);
  };

  const categories = Array.from(new Set(sweets.map((sweet) => sweet.category)));

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 animate-slide-up">
          <p className="text-gray-700 dark:text-gray-300 text-lg italic">Authentic Indian sweets, delivered fresh</p>
          <p className="text-teal-600 dark:text-teal-400 text-sm mt-1">Quality sweets for every celebration</p>
        </div>

        <FestivalCountdown />
        
        <SweetOfTheDay sweets={sweets} />

        <MithaiMeter />

        <PurchaseHistory />

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Search and Filter Section */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <style>{`
              .dark input, .dark select {
                background-color: rgb(55 65 81);
                color: white;
                border-color: rgb(75 85 99);
              }
              .dark label {
                color: rgb(209 213 219);
              }
            `}</style>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or category..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Min Price
              </label>
              <input
                type="number"
                value={priceRange.min}
                onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                placeholder="0.00"
                step="0.01"
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Price
              </label>
              <input
                type="number"
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                placeholder="100.00"
                step="0.01"
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {(searchTerm || selectedCategory || priceRange.min || priceRange.max) && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
                setPriceRange({ min: '', max: '' });
              }}
              className="mt-4 text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-600 dark:text-gray-400">
            Showing {filteredSweets.length} of {sweets.length} sweets
          </p>
        </div>

        {/* Sweets Grid */}
        {filteredSweets.length === 0 ? (
          <div className="text-center py-12 animate-fade-in">
            <p className="text-gray-500 dark:text-gray-400 text-2xl mb-2">🤷‍♂️</p>
            <p className="text-gray-700 dark:text-gray-300 text-lg font-semibold">Oops! Even our sweets are playing hide & seek</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Try adjusting your filters... or lower your standards 😉</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSweets.map((sweet) => (
              <SweetCard
                key={sweet.id}
                sweet={sweet}
                onUpdate={loadSweets}
                canPurchase={!!user}
                isAdmin={user?.role === 'ADMIN'}
                exchangeRate={exchangeRate}
                allSweets={sweets}
              />
            ))}
          </div>
        )}
      </div>
      <ScrollToTop />
      <PerformanceMetrics />
    </div>
  );
};

