import Map "mo:core/Map";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Option "mo:core/Option";

import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  include MixinStorage();

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Types
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

  public type UserProfile = {
    name : Text;
  };

  // State
  var nextSkillId = 1;
  var nextProjectId = 1;
  var nextExperienceId = 1;
  var nextSocialLinkId = 1;
  var nextMessageId = 1;

  var aboutContent : About = {
    content = "Experienced software developer with a passion for building web applications.";
  };

  let skills = Map.empty<Nat, Skill>();
  let projects = Map.empty<Nat, Project>();
  let experiences = Map.empty<Nat, Experience>();
  let socialLinks = Map.empty<Nat, SocialLink>();
  let contactMessages = Map.empty<Nat, ContactMessage>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Initialize with seed data
  public shared ({ caller }) func initialize() : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can initialize seed data");
    };

    // Seed skills
    skills.add(
      nextSkillId,
      { id = nextSkillId; name = "Motoko"; category = "Programming Language"; level = "Advanced" },
    );
    nextSkillId += 1;

    // Seed projects (empty image placeholder)
    let emptyImage = {
      id = "";
      url = "";
    };
    projects.add(
      nextProjectId,
      {
        id = nextProjectId;
        title = "Personal Website";
        description = "A personal portfolio website.";
        technologies = ["Motoko", "Internet Computer"];
        liveDemoUrl = "https://example.com";
        githubUrl = "https://github.com/example";
        image = emptyImage;
      },
    );
    nextProjectId += 1;
  };

  // User Profile functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Skill functions (Admin only)
  public shared ({ caller }) func createSkill(skill : Skill) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can create skills");
    };
    let newSkill = { skill with id = nextSkillId };
    skills.add(nextSkillId, newSkill);
    nextSkillId += 1;
  };

  public shared ({ caller }) func updateSkill(id : Nat, skill : Skill) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update skills");
    };
    if (not skills.containsKey(id)) {
      Runtime.trap("Skill not found");
    };
    skills.add(id, { skill with id });
  };

  public shared ({ caller }) func deleteSkill(id : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete skills");
    };
    skills.remove(id);
  };

  // Project functions (Admin only for CUD)
  public shared ({ caller }) func createProject(project : Project) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can create projects");
    };
    let newProject = { project with id = nextProjectId };
    projects.add(nextProjectId, newProject);
    nextProjectId += 1;
  };

  public shared ({ caller }) func updateProject(id : Nat, project : Project) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update projects");
    };
    if (not projects.containsKey(id)) {
      Runtime.trap("Project not found");
    };
    projects.add(id, { project with id });
  };

  public shared ({ caller }) func deleteProject(id : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete projects");
    };
    projects.remove(id);
  };

  // Experience functions (Admin only for CUD)
  public shared ({ caller }) func createExperience(experience : Experience) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can create experience entries");
    };
    let newExperience = { experience with id = nextExperienceId };
    experiences.add(nextExperienceId, newExperience);
    nextExperienceId += 1;
  };

  public shared ({ caller }) func updateExperience(id : Nat, experience : Experience) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update experience entries");
    };
    if (not experiences.containsKey(id)) {
      Runtime.trap("Experience not found");
    };
    experiences.add(id, { experience with id });
  };

  public shared ({ caller }) func deleteExperience(id : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete experience entries");
    };
    experiences.remove(id);
  };

  // Social Links functions (Admin only for CUD)
  public shared ({ caller }) func createSocialLink(socialLink : SocialLink) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can create social links");
    };
    let newSocialLink = { socialLink with id = nextSocialLinkId };
    socialLinks.add(nextSocialLinkId, newSocialLink);
    nextSocialLinkId += 1;
  };

  public shared ({ caller }) func updateSocialLink(id : Nat, socialLink : SocialLink) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update social links");
    };
    if (not socialLinks.containsKey(id)) {
      Runtime.trap("Social link not found");
    };
    socialLinks.add(id, { socialLink with id });
  };

  public shared ({ caller }) func deleteSocialLink(id : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete social links");
    };
    socialLinks.remove(id);
  };

  // About content (Admin only for update)
  public shared ({ caller }) func updateAbout(content : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update about content");
    };
    aboutContent := { content };
  };

  // Contact Messages
  public shared ({ caller }) func submitContactMessage(name : Text, email : Text, message : Text) : async () {
    // Public function - no authorization required
    let newMessage = {
      id = nextMessageId;
      name;
      email;
      message;
      createdAt = Time.now();
      read = false;
    };
    contactMessages.add(nextMessageId, newMessage);
    nextMessageId += 1;
  };

  public query ({ caller }) func getContactMessages() : async [ContactMessage] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view contact messages");
    };
    contactMessages.values().toArray();
  };

  public shared ({ caller }) func markMessageAsRead(id : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can mark messages as read");
    };
    let updatedMessage = switch (contactMessages.get(id)) {
      case (null) { Runtime.trap("Message not found") };
      case (?message) { { message with read = true } };
    };
    contactMessages.add(id, updatedMessage);
  };

  public shared ({ caller }) func deleteContactMessage(id : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete contact messages");
    };
    contactMessages.remove(id);
  };

  // Public query functions (no authorization required)
  public query func getSkills() : async [Skill] {
    skills.values().toArray();
  };

  public query func getProjects() : async [Project] {
    projects.values().toArray();
  };

  public query func getExperiences() : async [Experience] {
    experiences.values().toArray();
  };

  public query func getAbout() : async About {
    aboutContent;
  };

  public query func getSocialLinks() : async [SocialLink] {
    socialLinks.values().toArray();
  };
};
