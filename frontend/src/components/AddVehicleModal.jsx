import React, { useState } from 'react';
import { useVehicles } from '../context/VehicleContext';
import { X, Plus, Car, Tag, Calendar, DollarSign, Package, Hash, Image, FileText } from 'lucide-react';

const CATEGORIES = ['Electric', 'Sports', 'Sedan', 'SUV', 'Luxury', 'Truck'];

export const AddVehicleModal = ({ isOpen, onClose }) => {
  const { addVehicle } = useVehicles();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [formData, setFormData] = useState({
    make: '',
    model: '',
    category: 'Electric',
    year: new Date().getFullYear(),
    price: '',
    quantity: 1,
    vin: '',
    imageUrl: '',
    description: '',
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      await addVehicle(formData);
      onClose();
      setFormData({
        make: '',
        model: '',
        category: 'Electric',
        year: new Date().getFullYear(),
        price: '',
        quantity: 1,
        vin: '',
        imageUrl: '',
        description: '',
      });
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg glass-panel rounded-3xl p-8 border border-gray-800 shadow-2xl bg-gray-950/95 max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-gray-900 text-gray-400 hover:text-white border border-gray-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800/60">
            <Plus className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Add New Vehicle</h2>
            <p className="text-xs text-gray-400">Add a new car record to the live dealership inventory.</p>
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 mb-4 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-300 text-xs font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Make</label>
              <input
                type="text"
                name="make"
                required
                placeholder="e.g. Tesla"
                value={formData.make}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl bg-gray-900 border border-gray-800 text-sm text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Model</label>
              <input
                type="text"
                name="model"
                required
                placeholder="e.g. Model S"
                value={formData.model}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl bg-gray-900 border border-gray-800 text-sm text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl bg-gray-900 border border-gray-800 text-sm text-white focus:border-indigo-500 focus:outline-none"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Year</label>
              <input
                type="number"
                name="year"
                required
                min="1990"
                max="2030"
                value={formData.year}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl bg-gray-900 border border-gray-800 text-sm text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Price ($)</label>
              <input
                type="number"
                name="price"
                required
                min="0"
                placeholder="89990"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl bg-gray-900 border border-gray-800 text-sm text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Initial Stock Quantity</label>
              <input
                type="number"
                name="quantity"
                required
                min="0"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl bg-gray-900 border border-gray-800 text-sm text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">VIN (Unique Identifier)</label>
            <input
              type="text"
              name="vin"
              required
              placeholder="e.g. TSLA987654321000"
              value={formData.vin}
              onChange={handleChange}
              className="w-full px-3.5 py-2 rounded-xl bg-gray-900 border border-gray-800 text-sm text-white font-mono focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Image URL (Optional)</label>
            <input
              type="url"
              name="imageUrl"
              placeholder="https://images.unsplash.com/..."
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full px-3.5 py-2 rounded-xl bg-gray-900 border border-gray-800 text-sm text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Description</label>
            <textarea
              name="description"
              rows="2"
              placeholder="High performance luxury trim with autopilot..."
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3.5 py-2 rounded-xl bg-gray-900 border border-gray-800 text-sm text-white focus:border-indigo-500 focus:outline-none resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-semibold text-sm shadow-lg shadow-teal-900/40 transition-all"
          >
            {loading ? 'Adding Vehicle...' : 'Save to Inventory'}
          </button>
        </form>
      </div>
    </div>
  );
};
