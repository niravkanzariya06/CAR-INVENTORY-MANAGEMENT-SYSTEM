import React, { useEffect } from 'react';
import { useVehicles } from '../context/VehicleContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = () => {
  const { toastMessage, clearToast } = useVehicles();

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        clearToast();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage, clearToast]);

  if (!toastMessage) return null;

  const isError = toastMessage.type === 'error';
  const isInfo = toastMessage.type === 'info';

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
      <div
        className={`flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl backdrop-blur-xl border ${
          isError
            ? 'bg-rose-950/90 border-rose-700/80 text-rose-200'
            : isInfo
            ? 'bg-blue-950/90 border-blue-700/80 text-blue-200'
            : 'bg-emerald-950/90 border-emerald-700/80 text-emerald-200'
        }`}
      >
        {isError ? (
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
        ) : isInfo ? (
          <Info className="w-5 h-5 text-blue-400 shrink-0" />
        ) : (
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
        )}

        <span className="text-xs sm:text-sm font-semibold pr-2">{toastMessage.message}</span>

        <button
          onClick={clearToast}
          className="p-1 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
