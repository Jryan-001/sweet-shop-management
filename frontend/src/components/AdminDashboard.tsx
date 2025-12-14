import React, { useState, useEffect } from 'react';
import { sweetsAPI } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export const AdminDashboard: React.FC = () => {
  const [sweets, setSweets] = useState<any[]>([]);
  const [stats, setStats] = useState({ total: 0, revenue: 0, lowStock: 0 });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await sweetsAPI.getAll();
    setSweets(data);
    
    const total = data.length;
    const revenue = data.reduce((sum, s) => sum + (s.price * (100 - s.quantity)), 0);
    const lowStock = data.filter(s => s.quantity < 20).length;
    
    setStats({ total, revenue, lowStock });
  };

  const categoryData = sweets.reduce((acc: any, sweet) => {
    const existing = acc.find((item: any) => item.name === sweet.category);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: sweet.category, value: 1 });
    }
    return acc;
  }, []);

  const COLORS = ['#f97316', '#fb923c', '#fdba74', '#fed7aa', '#ffedd5'];

  return (
    <div className="mb-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl p-6 text-white shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Total Sweets</h3>
          <p className="text-4xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl p-6 text-white shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Estimated Revenue</h3>
          <p className="text-4xl font-bold">₹{stats.revenue.toFixed(0)}</p>
        </div>
        <div className="bg-gradient-to-br from-red-500 to-pink-500 rounded-xl p-6 text-white shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Low Stock Items</h3>
          <p className="text-4xl font-bold">{stats.lowStock}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4">Stock by Sweet</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sweets.slice(0, 8)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="quantity" fill="#f97316" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4">Category Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => entry.name}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
