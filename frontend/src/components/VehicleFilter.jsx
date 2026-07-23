import React from 'react';
import { useVehicles } from '../context/VehicleContext';
import { Search, Filter, SlidersHorizontal, CheckSquare, Square } from 'lucide-react';

const CATEGORIES = ['All', 'Electric', 'Sports', 'Sedan', 'SUV', 'Luxury', 'Truck'];

export const VehicleFilter = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    maxPrice,
    setMaxPrice,
    inStockOnly,
    setInStockOnly,
  } = useVehicles();

  const formatPrice = (val) => `$${(val / 1000).toFixed(0)}k`;

  return (
    <div className="glass-panel rounded-2xl p-6 border border-gray-800 mb-8 shadow-lg">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by Make, Model, or VIN (e.g. Tesla, 911, TSLA123)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-950/80 border border-gray-800 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  active
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-gray-900/90 text-gray-400 hover:text-gray-200 hover:bg-gray-800 border border-gray-800'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Secondary Filters: Price Slider & In-Stock Checkbox */}
      <div className="mt-6 pt-4 border-t border-gray-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Price Slider */}
        <div className="flex items-center gap-4 w-full sm:w-auto flex-1 max-w-md">
          <div className="flex items-center gap-2 text-xs font-medium text-gray-400 min-w-fit">
            <SlidersHorizontal className="w-4 h-4 text-indigo-400" />
            Max Price: <span className="text-amber-400 font-bold text-sm">{formatPrice(maxPrice)}</span>
          </div>
          <input
            type="range"
            min="20000"
            max="300000"
            step="10000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-indigo-500 bg-gray-800 h-1.5 rounded-lg cursor-pointer"
          />
        </div>

        {/* In Stock Toggle */}
        <button
          onClick={() => setInStockOnly(!inStockOnly)}
          className={`flex items-center gap-2.5 px-4 py-2 rounded-xl border text-xs font-semibold transition-all ${
            inStockOnly
              ? 'bg-emerald-950/70 border-emerald-600/70 text-emerald-300'
              : 'bg-gray-900/60 border-gray-800 text-gray-400 hover:text-gray-300'
          }`}
        >
          {inStockOnly ? (
            <CheckSquare className="w-4 h-4 text-emerald-400" />
          ) : (
            <Square className="w-4 h-4 text-gray-500" />
          )}
          <span>In Stock Vehicles Only</span>
        </button>
      </div>
    </div>
  );
};
