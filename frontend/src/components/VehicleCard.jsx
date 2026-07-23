import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useVehicles } from '../context/VehicleContext';
import { ShoppingBag, RefreshCw, Edit, Trash2, Tag, Calendar, Hash, CheckCircle, AlertOctagon } from 'lucide-react';

export const VehicleCard = ({ vehicle, onEdit, onRestock }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  const { purchaseVehicle, deleteVehicle } = useVehicles();
  const [purchasing, setPurchasing] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const isOutOfStock = vehicle.quantity <= 0;

  const handlePurchase = async () => {
    if (isOutOfStock || purchasing) return;
    setPurchasing(true);
    try {
      await purchaseVehicle(vehicle._id);
    } finally {
      setPurchasing(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${vehicle.make} ${vehicle.model}?`)) {
      setDeleting(true);
      try {
        await deleteVehicle(vehicle._id);
      } finally {
        setDeleting(false);
      }
    }
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between group relative">
      
      {/* Image Container with Badges */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-900">
        <img
          src={vehicle.imageUrl || 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d'}
          alt={`${vehicle.make} ${vehicle.model}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-80" />

        {/* Category Pill */}
        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-gray-900/80 backdrop-blur-md border border-gray-700/60 text-xs font-semibold text-gray-200 flex items-center gap-1.5 shadow-md">
          <Tag className="w-3 h-3 text-indigo-400" />
          {vehicle.category}
        </div>

        {/* Stock Badge */}
        <div className="absolute top-3 right-3">
          {isOutOfStock ? (
            <span className="px-3 py-1 rounded-full bg-rose-950/90 backdrop-blur-md border border-rose-600/80 text-xs font-bold text-rose-300 flex items-center gap-1.5 shadow-lg animate-pulse">
              <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
              Out of Stock
            </span>
          ) : (
            <span className="px-3 py-1 rounded-full bg-emerald-950/90 backdrop-blur-md border border-emerald-600/80 text-xs font-bold text-emerald-300 flex items-center gap-1.5 shadow-lg">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              {vehicle.quantity} Available
            </span>
          )}
        </div>

        {/* VIN & Year overlay at bottom of image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-gray-300">
          <span className="flex items-center gap-1 font-mono bg-gray-900/70 px-2 py-0.5 rounded border border-gray-700/50">
            <Hash className="w-3 h-3 text-indigo-400" />
            {vehicle.vin}
          </span>
          <span className="flex items-center gap-1 bg-gray-900/70 px-2 py-0.5 rounded border border-gray-700/50">
            <Calendar className="w-3 h-3 text-amber-400" />
            {vehicle.year}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-baseline justify-between mb-1">
            <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
              {vehicle.make} {vehicle.model}
            </h3>
          </div>
          <p className="text-2xl font-black text-amber-400 mb-3 tracking-tight">
            {formatCurrency(vehicle.price)}
          </p>

          {vehicle.description && (
            <p className="text-xs text-gray-400 line-clamp-2 mb-4 leading-relaxed">
              {vehicle.description}
            </p>
          )}
        </div>

        {/* Actions & Buttons */}
        <div className="pt-4 border-t border-gray-800/80 flex flex-col gap-2">
          
          {!isAdmin && (
            <button
              onClick={handlePurchase}
              disabled={isOutOfStock || purchasing || !isAuthenticated}
              className={`w-full py-2.5 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
                isOutOfStock
                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700/50'
                  : !isAuthenticated
                  ? 'bg-gray-800/90 text-gray-400 cursor-not-allowed border border-gray-700'
                  : 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white shadow-indigo-600/30 transform hover:-translate-y-0.5 active:translate-y-0'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              {purchasing ? (
                <span>Processing...</span>
              ) : isOutOfStock ? (
                <span>Out of Stock</span>
              ) : !isAuthenticated ? (
                <span>Sign in to Purchase</span>
              ) : (
                <span>Purchase Vehicle</span>
              )}
            </button>
          )}

          {/* Admin Tools */}
          {isAdmin && (
            <div className="grid grid-cols-3 gap-2 mt-1 pt-2 border-t border-gray-800/40">
              <button
                onClick={() => onRestock(vehicle)}
                className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-teal-950/60 hover:bg-teal-900/80 border border-teal-700/50 text-teal-300 text-xs font-medium transition-colors"
                title="Restock Inventory"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Restock</span>
              </button>

              <button
                onClick={() => onEdit(vehicle)}
                className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-amber-950/60 hover:bg-amber-900/80 border border-amber-700/50 text-amber-300 text-xs font-medium transition-colors"
                title="Edit Vehicle Details"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>

              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-rose-950/60 hover:bg-rose-900/80 border border-rose-700/50 text-rose-300 text-xs font-medium transition-colors"
                title="Delete Vehicle"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
