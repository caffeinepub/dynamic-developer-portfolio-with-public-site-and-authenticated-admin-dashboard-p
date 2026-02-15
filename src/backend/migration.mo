import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Storage "blob-storage/Storage";
import Time "mo:core/Time";

module {
  // Types for migration
  type Skill = {
    id : Nat;
    name : Text;
    category : Text;
    level : Text;
  };

  type Project = {
    id : Nat;
    title : Text;
    description : Text;
    technologies : [Text];
    liveDemoUrl : Text;
    githubUrl : Text;
    image : { id : Text; url : Text };
  };

  type Experience = {
    id : Nat;
    title : Text;
    company : Text;
    location : Text;
    startDate : Text;
    endDate : Text;
    description : Text;
  };

  type About = {
    content : Text;
  };

  type SocialLink = {
    id : Nat;
    platform : Text;
    url : Text;
  };

  type ContactMessage = {
    id : Nat;
    name : Text;
    email : Text;
    message : Text;
    createdAt : Time.Time;
    read : Bool;
  };

  type UserProfile = {
    name : Text;
  };

  type AdminCredentials = {
    email : Text;
    password : Text;
  };

  type AdminSession = {
    email : Text;
    sessionToken : Text;
    createdAt : Time.Time;
    principal : Principal;
  };

  type AdminFileType = {
    #resume;
    #avatar;
  };

  type AdminFile = {
    fileType : AdminFileType;
    blob : Storage.ExternalBlob;
    name : Text;
    uploadedAt : Time.Time;
  };

  type AdminFiles = {
    resumeFile : ?AdminFile;
    avatarFile : ?AdminFile;
  };

  // Old state includes authorization state that will be dropped
  type OldActor = {
    nextSkillId : Nat;
    nextProjectId : Nat;
    nextExperienceId : Nat;
    nextSocialLinkId : Nat;
    nextMessageId : Nat;
    aboutContent : About;
    skills : Map.Map<Nat, Skill>;
    projects : Map.Map<Nat, Project>;
    experiences : Map.Map<Nat, Experience>;
    socialLinks : Map.Map<Nat, SocialLink>;
    contactMessages : Map.Map<Nat, ContactMessage>;
    userProfiles : Map.Map<Principal, UserProfile>;
    adminCredentials : ?AdminCredentials;
    adminSession : ?AdminSession;
    adminFiles : AdminFiles;
  };

  // New state type matches new actor (authorization removed)
  type NewActor = {
    nextSkillId : Nat;
    nextProjectId : Nat;
    nextExperienceId : Nat;
    nextSocialLinkId : Nat;
    nextMessageId : Nat;
    aboutContent : About;
    skills : Map.Map<Nat, Skill>;
    projects : Map.Map<Nat, Project>;
    experiences : Map.Map<Nat, Experience>;
    socialLinks : Map.Map<Nat, SocialLink>;
    contactMessages : Map.Map<Nat, ContactMessage>;
    userProfiles : Map.Map<Principal, UserProfile>;
    adminCredentials : ?AdminCredentials;
    adminSession : ?AdminSession;
    adminFiles : AdminFiles;
  };

  public func run(old : OldActor) : NewActor {
    {
      old with
      nextSkillId = old.nextSkillId;
      nextProjectId = old.nextProjectId;
      nextExperienceId = old.nextExperienceId;
      nextSocialLinkId = old.nextSocialLinkId;
      nextMessageId = old.nextMessageId;
      aboutContent = old.aboutContent;
      skills = old.skills;
      projects = old.projects;
      experiences = old.experiences;
      socialLinks = old.socialLinks;
      contactMessages = old.contactMessages;
      userProfiles = old.userProfiles;
      adminCredentials = old.adminCredentials;
      adminSession = old.adminSession;
      adminFiles = old.adminFiles;
    };
  };
};

