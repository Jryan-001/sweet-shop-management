import React, { useState, useEffect } from 'react';

export const PerformanceMetrics: React.FC = () => {
  const [loadTime, setLoadTime] = useState(0);

  useEffect(() => {
    const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const time = ((perfData.loadEventEnd - perfData.fetchStart) / 1000).toFixed(2);
    setLoadTime(Number(time));
  }, []);

  if (loadTime === 0) return null;

  return (
    <div className="fixed bottom-20 left-4 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg text-sm font-semibold animate-fade-in">
      ⚡ Loaded in {loadTime}s
    </div>
  );
};
