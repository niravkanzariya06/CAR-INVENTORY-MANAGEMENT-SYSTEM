import React from 'react';
import { useVehicles } from '../context/VehicleContext';
import { VehicleCard } from './VehicleCard';
import { Car, SearchX, Loader2 } from 'lucide-react';

export const VehicleGrid = ({ onEdit, onRestock }) => {
  const { filteredVehicles, loading, error } = useVehicles();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-gray-400">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-500 mb-4" />
        <p className="text-sm font-medium">Fetching Live Dealership Inventory...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-panel p-8 rounded-2xl text-center border-rose-900/40 my-8">
        <p className="text-rose-400 font-semibold text-lg mb-2">Error Loading Inventory</p>
        <p className="text-gray-400 text-sm">{error}</p>
      </div>
    );
  }

  if (filteredVehicles.length === 0) {
    return (
      <div className="glass-panel rounded-3xl p-12 text-center border border-gray-800 my-8 max-w-xl mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-gray-900 border border-gray-800 text-gray-500 flex items-center justify-center mx-auto mb-4">
          <SearchX className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">No Vehicles Found</h3>
        <p className="text-gray-400 text-sm leading-relaxed">
          No vehicles matched your criteria. Try adjusting your search query, price slider, or category filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
      {filteredVehicles.map((vehicle) => (
        <VehicleCard
          key={vehicle._id}
          vehicle={vehicle}
          onEdit={onEdit}
          onRestock={onRestock}
        />
      ))}
    </div>
  );
};
