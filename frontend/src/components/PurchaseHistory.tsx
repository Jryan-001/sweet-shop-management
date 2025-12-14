import React, { useState, useEffect } from 'react';

export const PurchaseHistory: React.FC = () => {
  const [history, setHistory] = useState<{ [key: string]: number }>({});

  const updateHistory = () => {
    const userId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).id : 'guest';
    const key = `purchaseHistory_${userId}`;
    const stored = localStorage.getItem(key);
    if (stored) {
      const data = JSON.parse(stored);
      const today = new Date().toDateString();
      
      // Reset if it's a new day
      if (data.date !== today) {
        setHistory({});
        localStorage.setItem(key, JSON.stringify({ date: today, history: {} }));
      } else {
        setHistory(data.history || {});
      }
    }
  };

  useEffect(() => {
    updateHistory();
    
    window.addEventListener('purchaseUpdate', updateHistory);
    return () => window.removeEventListener('purchaseUpdate', updateHistory);
  }, []);

  const topPurchases = Object.entries(history)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  if (topPurchases.length === 0) return null;

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8 border border-orange-100 dark:border-purple-700">
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Today's Sweet Addiction 😋</h3>
      <div className="space-y-3">
        {topPurchases.map(([name, count], index) => (
          <div key={name} className="flex items-center justify-between p-3 bg-orange-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}</span>
              <div>
                <p className="font-semibold text-gray-800 dark:text-white">{name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">You've bought {count} this week!</p>
              </div>
            </div>
            <span className="text-orange-600 dark:text-orange-400 font-bold text-lg">{count}x</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 italic mt-4 text-center">
        No judgment here... we all have our favorites! 🤫
      </p>
    </div>
  );
};

export const trackPurchase = (sweetName: string) => {
  const today = new Date().toDateString();
  const userId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).id : 'guest';
  const key = `purchaseHistory_${userId}`;
  const stored = localStorage.getItem(key);
  const data = stored ? JSON.parse(stored) : { date: today, history: {} };
  
  // Reset if it's a new day
  if (data.date !== today) {
    data.date = today;
    data.history = {};
  }
  
  data.history[sweetName] = (data.history[sweetName] || 0) + 1;
  localStorage.setItem(key, JSON.stringify(data));
  
  // Trigger update event
  window.dispatchEvent(new Event('purchaseUpdate'));
};
