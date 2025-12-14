import React, { useState, useEffect } from 'react';

export const MithaiMeter: React.FC = () => {
  const [purchases, setPurchases] = useState(0);

  const updatePurchases = () => {
    const userId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).id : 'guest';
    const key = `purchaseHistory_${userId}`;
    const stored = localStorage.getItem(key);
    if (stored) {
      const data = JSON.parse(stored);
      const today = new Date().toDateString();
      
      // Reset if it's a new day
      if (data.date !== today) {
        setPurchases(0);
        localStorage.setItem(key, JSON.stringify({ date: today, history: {} }));
      } else {
        const total = Object.values(data.history || {}).reduce((sum: number, count: any) => sum + count, 0);
        setPurchases(total);
      }
    } else {
      setPurchases(0);
    }
  };

  useEffect(() => {
    updatePurchases();
    
    // Listen for storage changes
    window.addEventListener('storage', updatePurchases);
    window.addEventListener('purchaseUpdate', updatePurchases);
    
    return () => {
      window.removeEventListener('storage', updatePurchases);
      window.removeEventListener('purchaseUpdate', updatePurchases);
    };
  }, []);

  const badges = [
    { name: 'Sweet Newbie', required: 5, emoji: '🍬' },
    { name: 'Sugar Lover', required: 15, emoji: '🍭' },
    { name: 'Mithai Master', required: 30, emoji: '👑' },
    { name: 'Sweet Legend', required: 50, emoji: '⭐' },
  ];

  const currentBadge = badges.filter(b => purchases >= b.required).pop() || badges[0];
  const nextBadge = badges.find(b => purchases < b.required);
  const remaining = nextBadge ? nextBadge.required - purchases : 0;

  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-900 dark:to-pink-900 rounded-xl p-6 mb-8 shadow-xl">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-white text-2xl font-bold mb-2">🏆 Today's Mithai Meter</h3>
          <p className="text-white/90 text-lg">
            Current Level: <span className="font-bold">{currentBadge.emoji} {currentBadge.name}</span>
          </p>
          {nextBadge && (
            <p className="text-white/80 text-sm mt-1">
              {remaining} sweets away from {nextBadge.emoji} {nextBadge.name}!
            </p>
          )}
        </div>
        <div className="text-6xl animate-bounce-slow">{currentBadge.emoji}</div>
      </div>
      <div className="mt-4 bg-white/20 rounded-full h-4 overflow-hidden">
        <div 
          className="bg-yellow-400 h-full transition-all duration-500"
          style={{ width: `${nextBadge ? (purchases / nextBadge.required) * 100 : 100}%` }}
        ></div>
      </div>
    </div>
  );
};
