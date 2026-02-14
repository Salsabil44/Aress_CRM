import { useAuth } from '@/features/auth';
import type { User } from '@/features/auth/auth.types';

export function usePermissions() {
  const { user } = useAuth();

  const isAdmin = user?.role === 'admin';
  const isManager = user?.role === 'manager';
  const isSalesRep = user?.role === 'sales_rep';

  return {
    // Role checks
    isAdmin,
    isManager,
    isSalesRep,
    
    // Permission checks
    canAccessSettings: isAdmin,
    canDeleteLeads: isAdmin || isManager,
    canEditAllLeads: isAdmin || isManager,
    canManageUsers: isAdmin,
    canViewReports: isAdmin || isManager,
    
    // Combined checks
    isAdminOrManager: isAdmin || isManager,
    
    // Role label helper
    getRoleLabel: () => {
      if (isAdmin) return 'Administrator';
      if (isManager) return 'Manager';
      if (isSalesRep) return 'Sales Representative';
      return 'User';
    },
  };
}
