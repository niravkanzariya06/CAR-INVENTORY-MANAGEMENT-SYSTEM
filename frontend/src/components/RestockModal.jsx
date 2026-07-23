import React, { useState } from 'react';
import { useVehicles } from '../context/VehicleContext';
import { X, RefreshCw, Plus } from 'lucide-react';

export const RestockModal = ({ vehicle, isOpen, onClose }) => {
  const { restockVehicle } = useVehicles();
  const [amount, setAmount] = useState(5);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen || !vehicle) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      await restockVehicle(vehicle._id, Number(amount));
      onClose();
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md glass-panel rounded-3xl p-8 border border-gray-800 shadow-2xl bg-gray-950/95">
        
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-gray-900 text-gray-400 hover:text-white border border-gray-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-teal-950 text-teal-400 border border-teal-800/60">
            <RefreshCw className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Restock Inventory</h2>
            <p className="text-xs text-gray-400">Increase available units for {vehicle.make} {vehicle.model}.</p>
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 mb-4 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-300 text-xs font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="p-4 rounded-2xl bg-gray-900 border border-gray-800 flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-400 block">Current Stock</span>
              <span className="text-2xl font-bold text-white">{vehicle.quantity} Units</span>
            </div>
            <div className="text-right">
              <span className="text-xs text-teal-400 block">+ Restock Amount</span>
              <span className="text-2xl font-bold text-teal-400">+{amount}</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-2">Select Restock Increment</label>
            <div className="grid grid-cols-4 gap-2 mb-3">
              {[1, 5, 10, 25].map((val) => (
                <button
                  type="button"
                  key={val}
                  onClick={() => setAmount(val)}
                  className={`py-2 rounded-xl font-semibold text-xs transition-all border ${
                    amount === val
                      ? 'bg-teal-600 text-white border-teal-500 shadow-md shadow-teal-900/50'
                      : 'bg-gray-900 text-gray-400 border-gray-800 hover:text-white'
                  }`}
                >
                  +{val}
                </button>
              ))}
            </div>

            <input
              type="number"
              min="1"
              required
              value={amount}
              onChange={(e) => setAmount(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-900 border border-gray-800 text-sm text-white font-bold text-center focus:border-teal-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-semibold text-sm shadow-lg shadow-teal-900/40 flex items-center justify-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>{loading ? 'Restocking...' : `Confirm Restock (+${amount} Units)`}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
