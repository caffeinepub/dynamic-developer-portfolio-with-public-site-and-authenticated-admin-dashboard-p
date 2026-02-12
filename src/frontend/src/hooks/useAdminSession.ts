import { useState, useEffect } from 'react';
import { useActor } from './useActor';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import type { AdminCredentials, CreateSessionResponse } from '../backend';

const ADMIN_SESSION_KEY = 'admin_session_token';

// Module-level token store for shared state
let sharedSessionToken: string | null = null;
const subscribers = new Set<(token: string | null) => void>();

function notifySubscribers(token: string | null) {
  sharedSessionToken = token;
  subscribers.forEach(callback => callback(token));
}

function subscribeToToken(callback: (token: string | null) => void) {
  subscribers.add(callback);
  return () => {
    subscribers.delete(callback);
  };
}

export function useAdminSession() {
  const { actor, isFetching: actorFetching } = useActor();
  const queryClient = useQueryClient();
  
  // Initialize shared token from localStorage on first load
  const [sessionToken, setSessionToken] = useState<string | null>(() => {
    if (sharedSessionToken !== null) {
      return sharedSessionToken;
    }
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(ADMIN_SESSION_KEY);
      sharedSessionToken = stored;
      return stored;
    }
    return null;
  });

  // Subscribe to shared token changes
  useEffect(() => {
    return subscribeToToken((token) => {
      setSessionToken(token);
    });
  }, []);

  // Validate session token
  const sessionValidation = useQuery({
    queryKey: ['adminSessionValidation', sessionToken],
    queryFn: async () => {
      if (!actor || !sessionToken) return false;
      return actor.isValidAdminSession(sessionToken);
    },
    enabled: !!actor && !actorFetching && !!sessionToken,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials: AdminCredentials) => {
      if (!actor) throw new Error('Actor not available');
      const response: CreateSessionResponse = await actor.createAdminSession(credentials);
      return response;
    },
    onSuccess: (response) => {
      if (response.__kind__ === 'ok') {
        const token = response.ok.sessionToken;
        localStorage.setItem(ADMIN_SESSION_KEY, token);
        notifySubscribers(token);
        // Invalidate to trigger immediate re-validation
        queryClient.invalidateQueries({ queryKey: ['adminSessionValidation'] });
      }
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not available');
      await actor.logoutAdmin();
    },
    onSuccess: () => {
      localStorage.removeItem(ADMIN_SESSION_KEY);
      notifySubscribers(null);
      // Clear all admin-related queries
      queryClient.removeQueries({ queryKey: ['adminSessionValidation'] });
      queryClient.removeQueries({ queryKey: ['contactMessages'] });
      queryClient.removeQueries({ queryKey: ['currentUserProfile'] });
    },
  });

  const login = async (credentials: AdminCredentials) => {
    const response = await loginMutation.mutateAsync(credentials);
    return response;
  };

  const logout = async () => {
    await logoutMutation.mutateAsync();
  };

  const isAuthenticated = sessionValidation.data === true;
  const isLoading = actorFetching || sessionValidation.isLoading || loginMutation.isPending;

  return {
    login,
    logout,
    isAuthenticated,
    isLoading,
    isLoginError: loginMutation.isError,
    loginError: loginMutation.error,
    sessionToken,
  };
}
