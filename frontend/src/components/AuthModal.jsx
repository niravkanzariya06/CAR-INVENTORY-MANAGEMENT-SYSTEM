import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Lock, Mail, User, Key, ShieldCheck, ArrowRight } from 'lucide-react';

export const AuthModal = ({ isOpen, onClose }) => {
  const { login, register, loading } = useAuth();
  const [isLoginTab, setIsLoginTab] = useState(true);
  
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [adminSecret, setAdminSecret] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      if (isLoginTab) {
        await login(email, password);
      } else {
        await register(name, email, password, role, adminSecret);
      }
      onClose();
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md glass-panel rounded-3xl p-8 border border-gray-800 shadow-2xl bg-gray-950/95">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-gray-900 text-gray-400 hover:text-white border border-gray-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tab Headers */}
        <div className="flex border-b border-gray-800 mb-6">
          <button
            onClick={() => { setIsLoginTab(true); setErrorMsg(''); }}
            className={`pb-3 px-4 font-semibold text-sm transition-colors relative ${
              isLoginTab ? 'text-indigo-400 border-b-2 border-indigo-500' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setIsLoginTab(false); setErrorMsg(''); }}
            className={`pb-3 px-4 font-semibold text-sm transition-colors relative ${
              !isLoginTab ? 'text-indigo-400 border-b-2 border-indigo-500' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            Create Account
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 mb-4 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-300 text-xs font-medium">
            {errorMsg}
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {!isLoginTab && (
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1.5">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-900 border border-gray-800 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-900 border border-gray-800 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-900 border border-gray-800 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Registration Options: Admin Key */}
          {!isLoginTab && (
            <div className="pt-2 border-t border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-300">Account Type</span>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-1.5 text-xs text-gray-300 cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      value="user"
                      checked={role === 'user'}
                      onChange={() => setRole('user')}
                      className="accent-indigo-500"
                    />
                    Customer
                  </label>
                  <label className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      value="admin"
                      checked={role === 'admin'}
                      onChange={() => setRole('admin')}
                      className="accent-amber-500"
                    />
                    Admin
                  </label>
                </div>
              </div>

              {role === 'admin' && (
                <div className="mt-2">
                  <label className="block text-xs font-medium text-amber-400 mb-1.5">Admin Secret Key</label>
                  <div className="relative">
                    <Key className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-500" />
                    <input
                      type="password"
                      required
                      placeholder="Enter secret key (default: admin123secret)"
                      value={adminSecret}
                      onChange={(e) => setAdminSecret(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-900 border border-amber-800/80 text-sm text-amber-200 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all"
          >
            <span>{loading ? 'Processing...' : isLoginTab ? 'Sign In' : 'Create Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
