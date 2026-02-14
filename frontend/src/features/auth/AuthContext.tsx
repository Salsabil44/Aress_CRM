import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { User, LoginCredentials, RegisterData } from './auth.types';
import { authService } from './auth.service';

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => { success: boolean; error?: string };
  register: (data: RegisterData) => { success: boolean; error?: string };
  logout: () => void;
  updateProfile: (data: { name: string; email: string }) => { success: boolean; error?: string };
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  const login = useCallback((credentials: LoginCredentials) => {
    const loggedInUser = authService.login(credentials);
    if (loggedInUser) {
      setUser(loggedInUser);
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password' };
  }, []);

  const register = useCallback((data: RegisterData) => {
    const newUser = authService.register(data);
    if (newUser) {
      setUser(newUser);
      return { success: true };
    }
    return { success: false, error: 'Email already exists' };
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
  }, []);

  const updateProfile = useCallback(
    (data: { name: string; email: string }) => {
      if (!user) return { success: false, error: 'Not authenticated' };
      const updated = authService.updateProfile(user.id, data);
      if (updated) {
        setUser(updated);
        return { success: true };
      }
      return { success: false, error: 'Failed to update profile' };
    },
    [user]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
