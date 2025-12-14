import React, { useState, useEffect } from 'react';
import { sweetsAPI } from '../services/api';
import type { Sweet, SweetFormData } from '../types';
import { AdminDashboard } from './AdminDashboard';

export const AdminPanel: React.FC = () => {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingSweet, setEditingSweet] = useState<Sweet | null>(null);
  const [formData, setFormData] = useState<SweetFormData>({
    name: '',
    category: '',
    price: 0,
    quantity: 0,
  });
  const [restockData, setRestockData] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    loadSweets();
  }, []);

  const loadSweets = async () => {
    try {
      setLoading(true);
      const data = await sweetsAPI.getAll();
      setSweets(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load sweets');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (editingSweet) {
        await sweetsAPI.update(editingSweet.id, formData);
      } else {
        await sweetsAPI.create(formData);
      }
      setShowAddForm(false);
      setEditingSweet(null);
      setFormData({ name: '', category: '', price: 0, quantity: 0 });
      loadSweets();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save sweet');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this sweet?')) {
      return;
    }

    try {
      await sweetsAPI.delete(id);
      loadSweets();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete sweet');
    }
  };

  const handleRestock = async (id: string) => {
    const quantity = parseInt(restockData[id] || '0');
    if (quantity <= 0) {
      setError('Please enter a valid quantity');
      return;
    }

    try {
      await sweetsAPI.restock(id, quantity);
      setRestockData({ ...restockData, [id]: '' });
      loadSweets();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to restock sweet');
    }
  };

  const startEdit = (sweet: Sweet) => {
    setEditingSweet(sweet);
    setFormData({
      name: sweet.name,
      category: sweet.category,
      price: sweet.price,
      quantity: sweet.quantity,
    });
    setShowAddForm(true);
  };

  const cancelForm = () => {
    setShowAddForm(false);
    setEditingSweet(null);
    setFormData({ name: '', category: '', price: 0, quantity: 0 });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">मिठास Control Center</h1>
            <p className="text-gray-600">Where magic (and sugar) happens ✨</p>
            <p className="text-orange-600 text-sm italic">With great power comes great responsibility... to add more sweets!</p>
          </div>
          <button
            onClick={() => {
              setEditingSweet(null);
              setFormData({ name: '', category: '', price: 0, quantity: 0 });
              setShowAddForm(true);
            }}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Add New Sweet
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Add/Edit Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {editingSweet ? 'Edit Sweet' : 'Add New Sweet'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                    required
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  {editingSweet ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={cancelForm}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )
}

        <AdminDashboard />

        {/* Sweets Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sweets.map((sweet) => (
                  <tr key={sweet.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {sweet.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {sweet.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${sweet.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`font-medium ${
                        sweet.quantity > 10 
                          ? 'text-green-600' 
                          : sweet.quantity > 0 
                          ? 'text-yellow-600' 
                          : 'text-red-600'
                      }`}>
                        {sweet.quantity}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => startEdit(sweet)}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(sweet.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                        <div className="flex items-center space-x-2">
                          <input
                            type="number"
                            value={restockData[sweet.id] || ''}
                            onChange={(e) => setRestockData({ ...restockData, [sweet.id]: e.target.value })}
                            placeholder="Qty"
                            min="1"
                            className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                          <button
                            onClick={() => handleRestock(sweet.id)}
                            className="text-green-600 hover:text-green-900 text-sm"
                          >
                            Restock
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {sweets.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <p className="text-gray-500 text-lg">No sweets found. Add your first sweet!</p>
          </div>
        )}
      </div>
    </div>
  );
};

