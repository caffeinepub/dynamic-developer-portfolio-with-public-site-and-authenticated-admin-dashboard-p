import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface AdminAuthResponse {
    isAdmin: boolean;
}
export type Time = bigint;
export interface SocialLink {
    id: bigint;
    url: string;
    platform: string;
}
export interface AdminSession {
    principal: Principal;
    createdAt: Time;
    email: string;
    sessionToken: string;
}
export interface ContactMessage {
    id: bigint;
    name: string;
    createdAt: Time;
    read: boolean;
    email: string;
    message: string;
}
export interface AdminFile {
    blob: ExternalBlob;
    name: string;
    fileType: AdminFileType;
    uploadedAt: Time;
}
export interface Skill {
    id: bigint;
    name: string;
    level: string;
    category: string;
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
export type CreateSessionResponse = {
    __kind__: "ok";
    ok: AdminSession;
} | {
    __kind__: "failure";
    failure: string;
} | {
    __kind__: "invalidCredentials";
    invalidCredentials: null;
};
export interface AdminCredentials {
    password: string;
    email: string;
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
export enum AdminFileType {
    resume = "resume",
    avatar = "avatar"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    adminUploadAvatar(blob: ExternalBlob, name: string): Promise<void>;
    adminUploadResume(blob: ExternalBlob, name: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createAdminSession(credentials: AdminCredentials): Promise<CreateSessionResponse>;
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
    getAvatar(): Promise<AdminFile | null>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getContactMessages(): Promise<Array<ContactMessage>>;
    getExperiences(): Promise<Array<Experience>>;
    getProjects(): Promise<Array<Project>>;
    getResume(): Promise<AdminFile | null>;
    getSkills(): Promise<Array<Skill>>;
    getSocialLinks(): Promise<Array<SocialLink>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    hasActiveSession(): Promise<boolean>;
    initialize(): Promise<void>;
    isCallerAdmin(): Promise<boolean>;
    isValidAdminSession(sessionToken: string): Promise<boolean>;
    loginAsAdmin(credentials: AdminCredentials): Promise<AdminAuthResponse>;
    logoutAdmin(): Promise<void>;
    markMessageAsRead(id: bigint): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitContactMessage(name: string, email: string, message: string): Promise<void>;
    updateAbout(content: string): Promise<void>;
    updateExperience(id: bigint, experience: Experience): Promise<void>;
    updateProject(id: bigint, project: Project): Promise<void>;
    updateSkill(id: bigint, skill: Skill): Promise<void>;
    updateSocialLink(id: bigint, socialLink: SocialLink): Promise<void>;
}
