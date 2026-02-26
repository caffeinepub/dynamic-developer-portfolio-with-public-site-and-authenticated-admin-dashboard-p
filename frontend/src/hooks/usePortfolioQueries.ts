import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { About, Skill, Project, Experience, SocialLink, AdminFile } from '../backend';
import { unwrapOption } from '../utils/motokoOption';

export function useGetAbout() {
  const { actor, isFetching } = useActor();

  return useQuery<About>({
    queryKey: ['about'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAbout();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetSkills() {
  const { actor, isFetching } = useActor();

  return useQuery<Skill[]>({
    queryKey: ['skills'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSkills();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetProjects() {
  const { actor, isFetching } = useActor();

  return useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProjects();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetExperiences() {
  const { actor, isFetching } = useActor();

  return useQuery<Experience[]>({
    queryKey: ['experiences'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getExperiences();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetSocialLinks() {
  const { actor, isFetching } = useActor();

  return useQuery<SocialLink[]>({
    queryKey: ['socialLinks'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSocialLinks();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetResume() {
  const { actor, isFetching } = useActor();

  return useQuery<AdminFile | null>({
    queryKey: ['resume'],
    queryFn: async () => {
      if (!actor) return null;
      const result = await actor.getResume();
      return unwrapOption(result);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAvatar() {
  const { actor, isFetching } = useActor();

  return useQuery<AdminFile | null>({
    queryKey: ['avatar'],
    queryFn: async () => {
      if (!actor) return null;
      const result = await actor.getAvatar();
      return unwrapOption(result);
    },
    enabled: !!actor && !isFetching,
  });
}
