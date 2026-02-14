import { useState } from 'react';
import { LogIn, UserPlus, Mail, Lock, User, Eye, EyeOff, Zap } from 'lucide-react';
import { useAuth } from '../AuthContext';
import type { RegisterData } from '../auth.types';

export function LoginPage() {
  const { login, register } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isRegister) {
      if (!name.trim()) { setError('Name is required'); return; }
      if (!email.trim()) { setError('Email is required'); return; }
      if (email === 'admin@gmail.com') { setError('Cannot register with admin email'); return; }
      if (password.length < 6) { setError('Password must be at least 6 characters'); return; }
      const result = await register({ name, email, password });
      if (!result.success) setError(result.error || 'Registration failed');
    } else {
      if (!email.trim()) { setError('Email is required'); return; }
      if (!password.trim()) { setError('Password is required'); return; }
      const result = await login({ email, password });
      if (!result.success) setError(result.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 via-primary-700 to-violet-700 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-violet-400/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 flex flex-col justify-center px-16">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-white/15 backdrop-blur rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">SalesFlow</span>
          </div>
          <h1 className="text-3xl font-bold text-white leading-tight mb-4">
            Connect companies with<br />
            <span className="text-primary-200">top sales talent</span>
          </h1>
          <p className="text-base text-primary-100/70 max-w-md leading-relaxed">
            Manage your leads, track conversions, and grow your sales pipeline — all in one powerful CRM platform.
          </p>
          <div className="mt-12 grid grid-cols-3 gap-5">
            <div className="bg-white/10 backdrop-blur rounded-xl p-4">
              <p className="text-2xl font-bold text-white">2.4k+</p>
              <p className="text-[12px] text-primary-200 mt-1">Active Leads</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4">
              <p className="text-2xl font-bold text-white">89%</p>
              <p className="text-[12px] text-primary-200 mt-1">Conversion</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4">
              <p className="text-2xl font-bold text-white">150+</p>
              <p className="text-[12px] text-primary-200 mt-1">Companies</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white dark:bg-slate-900">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-slate-800 dark:text-slate-100">SalesFlow</span>
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            {isRegister ? 'Create your account' : 'Welcome back'}
          </h2>
          <p className="text-[13px] text-slate-400 dark:text-slate-500 mt-1.5 mb-7">
            {isRegister
              ? 'Start managing your sales pipeline today'
              : 'Sign in to your SalesFlow CRM account'}
          </p>

          {error && (
            <div className="mb-5 p-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/30 rounded-lg">
              <p className="text-[13px] text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div className="space-y-1.5">
                <label className="block text-[13px] font-medium text-slate-600 dark:text-slate-400">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 dark:text-slate-600" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-[13px] text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-primary-300 dark:focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/10"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="block text-[13px] font-medium text-slate-600 dark:text-slate-400">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 dark:text-slate-600" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-[13px] text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-primary-300 dark:focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/10"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[13px] font-medium text-slate-600 dark:text-slate-400">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 dark:text-slate-600" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-2.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-[13px] text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-primary-300 dark:focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600 hover:text-slate-500 dark:hover:text-slate-400 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>



            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-primary-600 text-white py-2.5 rounded-lg font-medium text-[13px] hover:bg-primary-700 transition-colors cursor-pointer"
            >
              {isRegister ? (
                <>
                  <UserPlus className="w-4 h-4" />
                  Create Account
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="mt-5 text-center">
            <button
              onClick={() => { setIsRegister(!isRegister); setError(''); }}
              className="text-[13px] text-primary-600 hover:text-primary-700 font-medium cursor-pointer"
            >
              {isRegister
                ? 'Already have an account? Sign in'
                : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
