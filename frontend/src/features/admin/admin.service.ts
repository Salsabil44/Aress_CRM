import { supabase } from '@/lib/supabase';
import type { User } from '@/features/auth/auth.types';

export interface UserListItem {
  id: string;
  name: string;
  email: string;
  role: User['role'];
  createdAt: string;
}

export async function getAllUsers(): Promise<UserListItem[]> {
  try {
    // Get current user's profile to check if they're admin
    const { data: { user } } = await supabase.auth.getUser();
    const isAdmin = user?.email === 'admin@gmail.com' || user?.user_metadata.role === 'admin';
    if (!user || !isAdmin) {
      console.error('Only admins can view all users');
      return [];
    }

    // Query the user_profiles table
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching users:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getAllUsers:', error);
    return [];
  }
}

export async function updateUserInfo(userId: string, updates: { name?: string; email?: string; role?: User['role'] }): Promise<{ success: boolean; error?: string }> {
  try {
    // Update user profile in database
    const { error } = await supabase
      .from('user_profiles')
      .update({
        name: updates.name,
        role: updates.role,
      })
      .eq('id', userId);
    
    if (error) {
      return { success: false, error: error.message };
    }
    
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to update user' };
  }
}

export async function deleteUser(userId: string): Promise<{ success: boolean; error?: string }> {
  try {
    // Delete user profile (this won't delete the auth user, just the profile)
    const { error } = await supabase
      .from('user_profiles')
      .delete()
      .eq('id', userId);
    
    if (error) {
      return { success: false, error: error.message };
    }
    
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to delete user' };
  }
}
