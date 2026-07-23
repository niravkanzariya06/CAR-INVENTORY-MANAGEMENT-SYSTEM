import React from 'react';
import { useVehicles } from '../context/VehicleContext';
import { Sparkles, ShieldCheck, Zap, PackageCheck } from 'lucide-react';

export const HeroBanner = () => {
  const { vehicles } = useVehicles();
  const totalInStock = vehicles.reduce((sum, v) => sum + v.quantity, 0);

  return (
    <div className="relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background Ambient Lights */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 glass-panel rounded-3xl p-8 sm:p-12 border border-gray-800 shadow-2xl bg-gradient-to-r from-gray-900/90 via-gray-900/60 to-indigo-950/40">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-900/40 border border-indigo-700/50 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            TDD Driven Inventory & Purchasing Engine
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Next-Generation <br />
            <span className="brand-gradient-text">Automotive Showroom</span> & Fleet Control
          </h1>

          <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8">
            Explore live luxury inventory, verify real-time stock levels, and execute instant secure purchases backed by robust MongoDB REST API endpoints.
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-gray-800/80 pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-indigo-950/80 text-indigo-400 border border-indigo-800/50">
                <PackageCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{totalInStock}</p>
                <p className="text-xs text-gray-400 font-medium">Vehicles In Stock</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-emerald-950/80 text-emerald-400 border border-emerald-800/50">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">Instant</p>
                <p className="text-xs text-gray-400 font-medium">Purchase Execution</p>
              </div>
            </div>

            <div className="flex items-center gap-3 col-span-2 sm:col-span-1">
              <div className="p-3 rounded-xl bg-amber-950/80 text-amber-400 border border-amber-800/50">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">JWT</p>
                <p className="text-xs text-gray-400 font-medium">RBAC Admin Protected</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
