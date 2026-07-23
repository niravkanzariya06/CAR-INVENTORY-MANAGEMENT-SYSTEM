import React, { useState, useEffect } from 'react';
import { useVehicles } from '../context/VehicleContext';
import { X, Edit, Save } from 'lucide-react';

const CATEGORIES = ['Electric', 'Sports', 'Sedan', 'SUV', 'Luxury', 'Truck'];

export const EditVehicleModal = ({ vehicle, isOpen, onClose }) => {
  const { updateVehicle } = useVehicles();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [formData, setFormData] = useState({
    make: '',
    model: '',
    category: 'Electric',
    year: 2024,
    price: 0,
    quantity: 0,
    imageUrl: '',
    description: '',
  });

  useEffect(() => {
    if (vehicle) {
      setFormData({
        make: vehicle.make || '',
        model: vehicle.model || '',
        category: vehicle.category || 'Electric',
        year: vehicle.year || 2024,
        price: vehicle.price || 0,
        quantity: vehicle.quantity || 0,
        imageUrl: vehicle.imageUrl || '',
        description: vehicle.description || '',
      });
    }
  }, [vehicle]);

  if (!isOpen || !vehicle) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      await updateVehicle(vehicle._id, formData);
      onClose();
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
          <div className="p-3 rounded-xl bg-amber-950 text-amber-400 border border-amber-800/60">
            <Edit className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Edit Vehicle Details</h2>
            <p className="text-xs text-gray-400">Update specification, pricing, or stock for {vehicle.make} {vehicle.model}.</p>
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
                value={formData.price}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl bg-gray-900 border border-gray-800 text-sm text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Stock Quantity</label>
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
            <label className="block text-xs font-medium text-gray-300 mb-1">Image URL</label>
            <input
              type="url"
              name="imageUrl"
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
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3.5 py-2 rounded-xl bg-gray-900 border border-gray-800 text-sm text-white focus:border-indigo-500 focus:outline-none resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-sm shadow-lg shadow-amber-600/30 flex items-center justify-center gap-2 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? 'Saving Changes...' : 'Update Vehicle Details'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
