import { useAdminSession } from './useAdminSession';

export function useAdminGuard() {
  const { isAuthenticated, isLoading } = useAdminSession();

  return {
    isAuthenticated,
    isAdmin: isAuthenticated,
    isLoading,
    isDenied: false, // No longer used with email/password auth
  };
}
