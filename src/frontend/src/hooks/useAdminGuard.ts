import { useInternetIdentity } from './useInternetIdentity';
import { useIsCallerAdmin } from './useAdminQueries';

export function useAdminGuard() {
  const { identity, loginStatus } = useInternetIdentity();
  const { data: isAdmin, isLoading: isCheckingAdmin } = useIsCallerAdmin();

  const isAuthenticated = !!identity;
  const isInitializing = loginStatus === 'initializing';

  return {
    isAuthenticated,
    isAdmin: isAdmin ?? false,
    isLoading: isInitializing || isCheckingAdmin,
    isDenied: isAuthenticated && !isCheckingAdmin && !isAdmin,
  };
}
