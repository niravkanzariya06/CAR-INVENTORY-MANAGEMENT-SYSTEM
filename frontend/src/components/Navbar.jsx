import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Car, ShieldAlert, LogOut, LogIn, PlusCircle, UserCheck } from 'lucide-react';

export const Navbar = ({ onOpenAuth, onOpenAddModal }) => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-gray-800/80 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 shadow-lg shadow-indigo-500/30 text-white">
            <Car className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-bold tracking-tight text-white font-sans">
              APEX<span className="brand-gradient-text">MOTORS</span>
            </span>
            <span className="block text-[10px] tracking-widest uppercase text-gray-400 font-medium">
              Inventory & Showroom System
            </span>
          </div>
        </div>

        {/* User Controls & Actions */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              {/* Role Badge */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-900/90 border border-gray-800">
                {isAdmin ? (
                  <>
                    <ShieldAlert className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                      Admin Access
                    </span>
                  </>
                ) : (
                  <>
                    <UserCheck className="w-4 h-4 text-indigo-400" />
                    <span className="text-xs font-medium text-gray-300">
                      Customer
                    </span>
                  </>
                )}
              </div>

              {/* Add Vehicle (Admin Only) */}
              {isAdmin && (
                <button
                  onClick={onOpenAddModal}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white text-sm font-semibold shadow-lg shadow-teal-900/40 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Add Vehicle</span>
                </button>
              )}

              {/* User Info & Logout */}
              <div className="flex items-center gap-3 pl-3 border-l border-gray-800">
                <span className="text-sm font-medium text-gray-200 hidden md:inline">
                  {user?.name}
                </span>
                <button
                  onClick={logout}
                  title="Logout"
                  className="p-2 rounded-lg bg-gray-800/70 hover:bg-rose-950/60 hover:text-rose-400 text-gray-400 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm shadow-lg shadow-indigo-600/30 transition-all transform hover:scale-105"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In / Register</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
