import { useState, useRef, useEffect } from 'react';
import {
  LayoutDashboard,
  Users,
  Kanban,
  LogOut,
  Menu,
  X,
  Zap,
  Clock,
  ChevronDown,
  UserCircle,
  Settings as SettingsIcon,
  ChevronsLeft,
  ChevronsRight,
  Search,
} from 'lucide-react';
import { AuthProvider, useAuth, LoginPage } from '@/features/auth';
import { Dashboard } from '@/features/dashboard';
import { Leads } from '@/features/leads';
import { Pipeline } from '@/features/pipeline';
import { Settings } from '@/features/settings';
import { useLeads } from '@/hooks/useLeads';
import { useToast } from '@/hooks/useToast';
import { ToastContainer } from '@/components/ui';
import type { HistoryEntry } from '@/services/api';

type Page = 'dashboard' | 'leads' | 'pipeline' | 'settings' | 'history';

const NAV_ITEMS: { id: Page; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'leads', label: 'Leads', icon: Users },
  { id: 'pipeline', label: 'Pipeline', icon: Kanban },
  { id: 'history', label: 'Activity', icon: Clock },
];

function HistoryPage({ history }: { history: HistoryEntry[] }) {
  const getActionBadge = (action: HistoryEntry['action']) => {
    switch (action) {
      case 'created':
        return { label: 'Created', color: 'bg-emerald-50 text-emerald-700 border border-emerald-100' };
      case 'updated':
        return { label: 'Updated', color: 'bg-blue-50 text-blue-700 border border-blue-100' };
      case 'deleted':
        return { label: 'Deleted', color: 'bg-red-50 text-red-700 border border-red-100' };
      case 'status_changed':
        return { label: 'Status Changed', color: 'bg-amber-50 text-amber-700 border border-amber-100' };
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900 tracking-tight">Activity History</h1>
        <p className="text-[13px] text-slate-400 mt-1">Track all actions performed on leads</p>
      </div>
      <div className="bg-white rounded-xl border border-slate-200/60 overflow-hidden">
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-4">
              <Clock className="w-5 h-5 text-slate-300" />
            </div>
            <p className="text-sm font-medium text-slate-400">No activity yet</p>
            <p className="text-xs text-slate-300 mt-1">Actions will appear here as you manage leads</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {history.map((entry) => {
              const badge = getActionBadge(entry.action);
              return (
                <div key={entry.id} className="flex items-start gap-4 px-5 py-4 hover:bg-slate-50/50 transition-colors duration-150">
                  <div className="mt-1.5">
                    <div className={`w-2 h-2 rounded-full ${
                      entry.action === 'created' ? 'bg-emerald-400' :
                      entry.action === 'updated' ? 'bg-blue-400' :
                      entry.action === 'deleted' ? 'bg-red-400' :
                      'bg-amber-400'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[13px] font-medium text-slate-800">{entry.leadName}</span>
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${badge.color}`}>
                        {badge.label}
                      </span>
                    </div>
                    <p className="text-[12px] text-slate-400 mt-0.5 leading-relaxed">{entry.details}</p>
                  </div>
                  <span className="text-[11px] text-slate-300 shrink-0 mt-0.5 tabular-nums">
                    {new Date(entry.timestamp).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function UserDropdown({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getRoleLabel = () => {
    switch (user?.role) {
      case 'admin': return 'Administrator';
      case 'manager': return 'Manager';
      case 'sales_rep': return 'Sales Rep';
      default: return 'User';
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-2 py-1.5 rounded-xl hover:bg-slate-50 transition-colors duration-150 cursor-pointer"
      >
        <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center text-white text-xs font-semibold">
          {user?.name?.charAt(0)?.toUpperCase() || 'U'}
        </div>
        <div className="hidden sm:block text-left">
          <p className="text-[13px] font-medium text-slate-700 leading-tight">{user?.name}</p>
          <p className="text-[11px] text-slate-400 leading-tight">{getRoleLabel()}</p>
        </div>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-300 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1.5 w-56 bg-white rounded-xl shadow-lg shadow-slate-200/50 border border-slate-100 overflow-hidden z-50 animate-slide-down">
          <div className="px-4 py-3 border-b border-slate-50">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center text-white text-sm font-semibold">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div className="min-w-0">
                <p className="text-[13px] font-semibold text-slate-800 truncate">{user?.name}</p>
                <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
              </div>
            </div>
          </div>
          
          <div className="py-1">
            <button
              onClick={() => { setIsOpen(false); onNavigate('settings'); }}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <UserCircle className="w-4 h-4 text-slate-400" />
              Edit Profile
            </button>
          </div>

          <div className="border-t border-slate-50 py-1">
            <button
              onClick={() => { setIsOpen(false); logout(); }}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function CRMApp() {
  const { leads, history, addLead, updateLead, deleteLead, updateStatus } = useLeads();
  const { toasts, showToast, dismissToast } = useToast();
  const { logout } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard leads={leads} history={history} />;
      case 'leads':
        return (
          <Leads
            leads={leads}
            onAdd={addLead}
            onUpdate={updateLead}
            onDelete={deleteLead}
            onToast={showToast}
          />
        );
      case 'pipeline':
        return <Pipeline leads={leads} onStatusChange={updateStatus} />;
      case 'history':
        return <HistoryPage history={history} />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard leads={leads} history={history} />;
    }
  };

  const pageTitle = currentPage === 'history' ? 'Activity' : currentPage.charAt(0).toUpperCase() + currentPage.slice(1);

  return (
    <div className="flex h-screen bg-slate-50">
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-[2px] z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 flex flex-col bg-white border-r border-slate-100 transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? 'lg:w-[72px]' : 'lg:w-[240px]'
        } w-[240px] ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center justify-center h-[60px] border-b border-slate-50 shrink-0 w-full">
          <a
            href="https://aress.work/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center"
            style={{ textDecoration: 'none' }}
          >
  <span
  className="text-[28px] font-semibold tracking-[0.6em] text-[#0E4A4A] lowercase select-none"
  style={{ fontFamily: "Poppins, sans-serif" }}
>
  aress
</span>


          </a>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto">
          {!sidebarCollapsed && (
            <p className="text-[10px] font-semibold text-slate-300 uppercase tracking-widest px-3 mb-3">Menu</p>
          )}
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setCurrentPage(item.id); setSidebarOpen(false); }}
                title={sidebarCollapsed ? item.label : undefined}
                className={`w-full flex items-center gap-2.5 rounded-lg text-[13px] font-medium transition-all duration-150 cursor-pointer group ${
                  sidebarCollapsed ? 'justify-center px-0 py-2.5' : 'px-3 py-2'
                } ${
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-[18px] h-[18px] shrink-0 ${isActive ? 'text-primary-600' : 'text-slate-400 group-hover:text-slate-500'}`} />
                {!sidebarCollapsed && (
                  <>
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.id === 'leads' && (
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md tabular-nums ${
                        isActive ? 'bg-primary-100 text-primary-600' : 'bg-slate-100 text-slate-400'
                      }`}>
                        {leads.length}
                      </span>
                    )}
                  </>
                )}
              </button>
            );
          })}
        </nav>

        {/* Expand toggle icon (only when collapsed, desktop only) */}
        {sidebarCollapsed && (
          <div className="hidden lg:flex justify-center px-3 py-2 border-t border-slate-50">
            <button
              onClick={() => setSidebarCollapsed(false)}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-300 hover:text-slate-500 hover:bg-slate-100 transition-all duration-150 cursor-pointer"
              title="Expand sidebar"
            >
              <ChevronsRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Sign Out at bottom */}
        <div className="px-3 py-3 border-t border-slate-50 shrink-0">
          <button
            onClick={() => { setSidebarOpen(false); logout(); }}
            title={sidebarCollapsed ? 'Sign Out' : undefined}
            className={`w-full flex items-center gap-2.5 rounded-lg text-[13px] font-medium text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all duration-150 cursor-pointer group ${
              sidebarCollapsed ? 'justify-center px-0 py-2.5' : 'px-3 py-2'
            }`}
          >
            <LogOut className="w-[18px] h-[18px] shrink-0 text-slate-400 group-hover:text-red-500" />
            {!sidebarCollapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Header */}
        <header className="flex items-center gap-3 h-[60px] px-6 bg-white border-b border-slate-100 shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>

          <h2 className="text-[15px] font-semibold text-slate-800">{pageTitle}</h2>

          <div className="flex-1" />
          <div className="flex items-center gap-3">
            <UserDropdown onNavigate={setCurrentPage} />
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-[1400px] mx-auto p-6">
            {renderPage()}
          </div>
        </div>
      </main>
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <AuthGate />
    </AuthProvider>
  );
}

function AuthGate() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center animate-pulse">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <p className="text-[13px] text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return <CRMApp />;
}
