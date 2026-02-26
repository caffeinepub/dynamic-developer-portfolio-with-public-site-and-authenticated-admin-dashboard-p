import { useEffect, useState } from 'react';
import { useActor } from './useActor';
import { useQueryClient } from '@tanstack/react-query';

export function useInitializeSeed() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!actor || initialized) return;

    const initializeSeedData = async () => {
      try {
        const isAdmin = await actor.isCallerAdmin();
        if (isAdmin) {
          await actor.initialize();
          queryClient.invalidateQueries();
          setInitialized(true);
        }
      } catch (error) {
        console.log('Seed initialization skipped or already done');
        setInitialized(true);
      }
    };

    initializeSeedData();
  }, [actor, initialized, queryClient]);
}
