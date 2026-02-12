import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Project, Skill, Experience, SocialLink } from '../backend';
import { toast } from 'sonner';

export function useCreateProject() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (project: Project) => {
      if (!actor) throw new Error('Actor not available');
      await actor.createProject(project);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Project created successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to create project: ${error.message}`);
    },
  });
}

export function useUpdateProject() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, project }: { id: bigint; project: Project }) => {
      if (!actor) throw new Error('Actor not available');
      await actor.updateProject(id, project);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Project updated successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to update project: ${error.message}`);
    },
  });
}

export function useDeleteProject() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error('Actor not available');
      await actor.deleteProject(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Project deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete project: ${error.message}`);
    },
  });
}

export function useCreateSkill() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (skill: Skill) => {
      if (!actor) throw new Error('Actor not available');
      await actor.createSkill(skill);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] });
      toast.success('Skill created successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to create skill: ${error.message}`);
    },
  });
}

export function useUpdateSkill() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, skill }: { id: bigint; skill: Skill }) => {
      if (!actor) throw new Error('Actor not available');
      await actor.updateSkill(id, skill);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] });
      toast.success('Skill updated successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to update skill: ${error.message}`);
    },
  });
}

export function useDeleteSkill() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error('Actor not available');
      await actor.deleteSkill(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] });
      toast.success('Skill deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete skill: ${error.message}`);
    },
  });
}

export function useUpdateAbout() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (content: string) => {
      if (!actor) throw new Error('Actor not available');
      await actor.updateAbout(content);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['about'] });
      toast.success('About content updated successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to update about: ${error.message}`);
    },
  });
}

export function useCreateExperience() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (experience: Experience) => {
      if (!actor) throw new Error('Actor not available');
      await actor.createExperience(experience);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experiences'] });
      toast.success('Experience created successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to create experience: ${error.message}`);
    },
  });
}

export function useUpdateExperience() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, experience }: { id: bigint; experience: Experience }) => {
      if (!actor) throw new Error('Actor not available');
      await actor.updateExperience(id, experience);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experiences'] });
      toast.success('Experience updated successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to update experience: ${error.message}`);
    },
  });
}

export function useDeleteExperience() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error('Actor not available');
      await actor.deleteExperience(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experiences'] });
      toast.success('Experience deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete experience: ${error.message}`);
    },
  });
}

export function useCreateSocialLink() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (socialLink: SocialLink) => {
      if (!actor) throw new Error('Actor not available');
      await actor.createSocialLink(socialLink);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['socialLinks'] });
      toast.success('Social link created successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to create social link: ${error.message}`);
    },
  });
}

export function useUpdateSocialLink() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, socialLink }: { id: bigint; socialLink: SocialLink }) => {
      if (!actor) throw new Error('Actor not available');
      await actor.updateSocialLink(id, socialLink);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['socialLinks'] });
      toast.success('Social link updated successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to update social link: ${error.message}`);
    },
  });
}

export function useDeleteSocialLink() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error('Actor not available');
      await actor.deleteSocialLink(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['socialLinks'] });
      toast.success('Social link deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete social link: ${error.message}`);
    },
  });
}

export function useMarkMessageAsRead() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error('Actor not available');
      await actor.markMessageAsRead(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contactMessages'] });
    },
    onError: (error: Error) => {
      toast.error(`Failed to mark message as read: ${error.message}`);
    },
  });
}

export function useDeleteContactMessage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error('Actor not available');
      await actor.deleteContactMessage(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contactMessages'] });
      toast.success('Message deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete message: ${error.message}`);
    },
  });
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: { name: string }) => {
      if (!actor) throw new Error('Actor not available');
      await actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
      toast.success('Profile saved successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to save profile: ${error.message}`);
    },
  });
}
