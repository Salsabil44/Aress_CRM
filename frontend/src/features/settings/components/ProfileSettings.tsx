import { useState } from 'react';
import { Save, User, Shield } from 'lucide-react';
import { useAuth } from '@/features/auth';

export function ProfileSettings() {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaved(false);
    if (!name.trim() || !email.trim()) {
      setError('Name and email are required');
      return;
    }
    const result = updateProfile({ name, email });
    if (result.success) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } else {
      setError(result.error || 'Failed to update');
    }
  };

  const getRoleBadge = () => {
    switch (user?.role) {
      case 'admin':
        return { label: 'Administrator', color: 'bg-red-50 text-red-600' };
      case 'manager':
        return { label: 'Manager', color: 'bg-blue-50 text-blue-600' };
      case 'sales_rep':
        return { label: 'Sales Representative', color: 'bg-emerald-50 text-emerald-600' };
      default:
        return { label: 'User', color: 'bg-slate-50 text-slate-600' };
    }
  };

  const roleBadge = getRoleBadge();

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200/60 dark:border-slate-700">
      <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center">
            <User className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400" />
          </div>
          <div>
            <h3 className="text-[14px] font-semibold text-slate-800 dark:text-slate-200">Profile Information</h3>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">Update your account details</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-5 space-y-4">
        <div className="flex items-center gap-3.5 p-3.5 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-100 dark:border-slate-600">
          <div className="w-11 h-11 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center text-white text-base font-semibold">
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div>
            <p className="text-[14px] font-semibold text-slate-700 dark:text-slate-200">{user?.name}</p>
            <p className="text-[12px] text-slate-400 dark:text-slate-400">{user?.email}</p>
            <div className="flex items-center gap-1 mt-1">
              <Shield className="w-3 h-3 text-slate-400 dark:text-slate-500" />
              <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-md ${roleBadge.color}`}>
                {roleBadge.label}
              </span>
            </div>
          </div>
        </div>

        {error && (
          <div className="p-2.5 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/30 rounded-lg">
            <p className="text-[12px] text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {saved && (
          <div className="p-2.5 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/30 rounded-lg">
            <p className="text-[12px] text-emerald-600 dark:text-emerald-400">Profile updated successfully!</p>
          </div>
        )}

        <div className="space-y-1.5">
          <label className="block text-[13px] font-medium text-slate-600 dark:text-slate-400">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-3.5 py-2 text-[13px] text-slate-900 dark:text-slate-100 focus:border-primary-300 dark:focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/10 hover:border-slate-300 dark:hover:border-slate-500 transition-all duration-150"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-[13px] font-medium text-slate-600 dark:text-slate-400">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-3.5 py-2 text-[13px] text-slate-900 dark:text-slate-100 focus:border-primary-300 dark:focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/10 hover:border-slate-300 dark:hover:border-slate-500 transition-all duration-150"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-[13px] font-medium text-slate-600 dark:text-slate-400">Role</label>
          <input
            type="text"
            value={roleBadge.label}
            disabled
            className="w-full rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 px-3.5 py-2 text-[13px] text-slate-400 dark:text-slate-500 cursor-not-allowed"
          />
          <p className="text-[11px] text-slate-300 dark:text-slate-600">Contact an admin to change your role</p>
        </div>

        <div className="pt-1">
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 bg-primary-600 text-white px-4 py-2 rounded-lg font-medium text-[13px] hover:bg-primary-700 transition-all duration-150 cursor-pointer active:scale-[0.98]"
          >
            <Save className="w-3.5 h-3.5" />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
