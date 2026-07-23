import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { VehicleProvider } from './context/VehicleContext';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { VehicleFilter } from './components/VehicleFilter';
import { VehicleGrid } from './components/VehicleGrid';
import { AuthModal } from './components/AuthModal';
import { AddVehicleModal } from './components/AddVehicleModal';
import { EditVehicleModal } from './components/EditVehicleModal';
import { RestockModal } from './components/RestockModal';
import { Toast } from './components/Toast';
import { Shield, Sparkles, Code2, Database } from 'lucide-react';

const MainLayout = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [restockingVehicle, setRestockingVehicle] = useState(null);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-gray-100 flex flex-col justify-between">
      <div>
        <Navbar
          onOpenAuth={() => setIsAuthOpen(true)}
          onOpenAddModal={() => setIsAddOpen(true)}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HeroBanner />
          <VehicleFilter />
          <VehicleGrid
            onEdit={(vehicle) => setEditingVehicle(vehicle)}
            onRestock={(vehicle) => setRestockingVehicle(vehicle)}
          />
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800/80 bg-gray-950/80 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-300">Apex Motors Inventory System</span>
            <span>— TDD Kata Full-Stack Solution</span>
          </div>
          <div className="flex items-center gap-6 text-gray-400">
            <span className="flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-indigo-400" /> Express & Node.js
            </span>
            <span className="flex items-center gap-1.5">
              <Database className="w-4 h-4 text-emerald-400" /> MongoDB
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" /> React & Tailwind
            </span>
          </div>
        </div>
      </footer>

      {/* Modals & Toast */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <AddVehicleModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />
      <EditVehicleModal
        vehicle={editingVehicle}
        isOpen={!!editingVehicle}
        onClose={() => setEditingVehicle(null)}
      />
      <RestockModal
        vehicle={restockingVehicle}
        isOpen={!!restockingVehicle}
        onClose={() => setRestockingVehicle(null)}
      />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <VehicleProvider>
        <MainLayout />
      </VehicleProvider>
    </AuthProvider>
  );
}
