import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ContactMessage {
    id: bigint;
    name: string;
    createdAt: Time;
    read: boolean;
    email: string;
    message: string;
}
export type Time = bigint;
export interface Skill {
    id: bigint;
    name: string;
    level: string;
    category: string;
}
export interface SocialLink {
    id: bigint;
    url: string;
    platform: string;
}
export interface Experience {
    id: bigint;
    title: string;
    endDate: string;
    description: string;
    company: string;
    location: string;
    startDate: string;
}
export interface About {
    content: string;
}
export interface Project {
    id: bigint;
    title: string;
    description: string;
    githubUrl: string;
    liveDemoUrl: string;
    technologies: Array<string>;
    image: {
        id: string;
        url: string;
    };
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createExperience(experience: Experience): Promise<void>;
    createProject(project: Project): Promise<void>;
    createSkill(skill: Skill): Promise<void>;
    createSocialLink(socialLink: SocialLink): Promise<void>;
    deleteContactMessage(id: bigint): Promise<void>;
    deleteExperience(id: bigint): Promise<void>;
    deleteProject(id: bigint): Promise<void>;
    deleteSkill(id: bigint): Promise<void>;
    deleteSocialLink(id: bigint): Promise<void>;
    getAbout(): Promise<About>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getContactMessages(): Promise<Array<ContactMessage>>;
    getExperiences(): Promise<Array<Experience>>;
    getProjects(): Promise<Array<Project>>;
    getSkills(): Promise<Array<Skill>>;
    getSocialLinks(): Promise<Array<SocialLink>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    initialize(): Promise<void>;
    isCallerAdmin(): Promise<boolean>;
    markMessageAsRead(id: bigint): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitContactMessage(name: string, email: string, message: string): Promise<void>;
    updateAbout(content: string): Promise<void>;
    updateExperience(id: bigint, experience: Experience): Promise<void>;
    updateProject(id: bigint, project: Project): Promise<void>;
    updateSkill(id: bigint, skill: Skill): Promise<void>;
    updateSocialLink(id: bigint, socialLink: SocialLink): Promise<void>;
}
