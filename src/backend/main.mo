import Map "mo:core/Map";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import Migration "migration";

(with migration = Migration.run)
actor {
  // Components (authorization is needed for admin)
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

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

  // Admin authentication using email+password
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

  type AdminAuthResponse = { isAdmin : Bool };

  type CreateSessionResponse = {
    #ok : AdminSession;
    #invalidCredentials;
    #failure : Text;
  };

  // Stable state
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

  // Admin credentials and session (stable)
  var adminCredentials : ?AdminCredentials = ?{
    email = "admin@gmail.com";
    password = "Admin@92505";
  };
  var adminSession : ?AdminSession = null;

  // Session timeout: 24 hours in nanoseconds
  let SESSION_TIMEOUT_NS : Time.Time = 24 * 60 * 60 * 1_000_000_000;

  // === Resume and Avatar ===

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

  var adminFiles : AdminFiles = {
    resumeFile = null;
    avatarFile = null;
  };

  // ========= PUBLIC API methods =========

  // === Authentication ===

  public shared ({ caller }) func loginAsAdmin(credentials : AdminCredentials) : async AdminAuthResponse {
    let isValid = isValidAdminCredentialsInternal(credentials);
    { isAdmin = isValid };
  };

  public shared ({ caller }) func createAdminSession(credentials : AdminCredentials) : async CreateSessionResponse {
    if (not isValidAdminCredentialsInternal(credentials)) {
      return #invalidCredentials;
    };

    let sessionToken = credentials.email # caller.toText() # Time.now().toText();
    let session : AdminSession = {
      email = credentials.email;
      sessionToken;
      createdAt = Time.now();
      principal = caller;
    };

    adminSession := ?session;
    #ok session;
  };

  public shared ({ caller }) func logoutAdmin() : async () {
    switch (adminSession) {
      case (?session) {
        if (session.principal == caller) {
          adminSession := null;
        };
      };
      case (null) {};
    };
  };

  public query ({ caller }) func isValidAdminSession(sessionToken : Text) : async Bool {
    switch (adminSession) {
      case (?session) {
        let isValid = session.sessionToken == sessionToken and session.principal == caller;
        let notExpired = (Time.now() - session.createdAt) < SESSION_TIMEOUT_NS;
        isValid and notExpired;
      };
      case (null) { false };
    };
  };

  public query ({ caller }) func hasActiveSession() : async Bool {
    switch (adminSession) {
      case (?session) {
        let isOwner = session.principal == caller;
        let notExpired = (Time.now() - session.createdAt) < SESSION_TIMEOUT_NS;
        isOwner and notExpired;
      };
      case (null) { false };
    };
  };

  // === Resume and Avatar File Management ===

  public shared ({ caller }) func adminUploadResume(blob : Storage.ExternalBlob, name : Text) : async () {
    if (not isAdminSession(caller)) {
      Runtime.trap("Unauthorized: Only admins can upload resume");
    };
    adminFiles := {
      adminFiles with resumeFile = ?{
        fileType = #resume;
        blob;
        name;
        uploadedAt = Time.now();
      };
    };
  };

  public shared ({ caller }) func adminUploadAvatar(blob : Storage.ExternalBlob, name : Text) : async () {
    if (not isAdminSession(caller)) {
      Runtime.trap("Unauthorized: Only admins can upload avatar");
    };
    adminFiles := {
      adminFiles with avatarFile = ?{
        fileType = #avatar;
        blob;
        name;
        uploadedAt = Time.now();
      };
    };
  };

  public query ({ caller }) func getResume() : async ?AdminFile {
    adminFiles.resumeFile;
  };

  public query ({ caller }) func getAvatar() : async ?AdminFile {
    adminFiles.avatarFile;
  };

  // ========= Portfolio data =========

  public shared ({ caller }) func initialize() : async () {
    if (not isAdminSession(caller)) {
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
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not isAdminSession(caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    userProfiles.add(caller, profile);
  };

  // Skill functions (Admin only)
  public shared ({ caller }) func createSkill(skill : Skill) : async () {
    if (not isAdminSession(caller)) {
      Runtime.trap("Unauthorized: Only admins can create skills");
    };
    let newSkill = { skill with id = nextSkillId };
    skills.add(nextSkillId, newSkill);
    nextSkillId += 1;
  };

  public shared ({ caller }) func updateSkill(id : Nat, skill : Skill) : async () {
    if (not isAdminSession(caller)) {
      Runtime.trap("Unauthorized: Only admins can update skills");
    };
    if (not skills.containsKey(id)) {
      Runtime.trap("Skill not found");
    };
    skills.add(id, { skill with id });
  };

  public shared ({ caller }) func deleteSkill(id : Nat) : async () {
    if (not isAdminSession(caller)) {
      Runtime.trap("Unauthorized: Only admins can delete skills");
    };
    skills.remove(id);
  };

  // Project functions (Admin only for CUD)
  public shared ({ caller }) func createProject(project : Project) : async () {
    if (not isAdminSession(caller)) {
      Runtime.trap("Unauthorized: Only admins can create projects");
    };
    let newProject = { project with id = nextProjectId };
    projects.add(nextProjectId, newProject);
    nextProjectId += 1;
  };

  public shared ({ caller }) func updateProject(id : Nat, project : Project) : async () {
    if (not isAdminSession(caller)) {
      Runtime.trap("Unauthorized: Only admins can update projects");
    };
    if (not projects.containsKey(id)) {
      Runtime.trap("Project not found");
    };
    projects.add(id, { project with id });
  };

  public shared ({ caller }) func deleteProject(id : Nat) : async () {
    if (not isAdminSession(caller)) {
      Runtime.trap("Unauthorized: Only admins can delete projects");
    };
    projects.remove(id);
  };

  // Experience functions (Admin only for CUD)
  public shared ({ caller }) func createExperience(experience : Experience) : async () {
    if (not isAdminSession(caller)) {
      Runtime.trap("Unauthorized: Only admins can create experience entries");
    };
    let newExperience = { experience with id = nextExperienceId };
    experiences.add(nextExperienceId, newExperience);
    nextExperienceId += 1;
  };

  public shared ({ caller }) func updateExperience(id : Nat, experience : Experience) : async () {
    if (not isAdminSession(caller)) {
      Runtime.trap("Unauthorized: Only admins can update experience entries");
    };
    if (not experiences.containsKey(id)) {
      Runtime.trap("Experience not found");
    };
    experiences.add(id, { experience with id });
  };

  public shared ({ caller }) func deleteExperience(id : Nat) : async () {
    if (not isAdminSession(caller)) {
      Runtime.trap("Unauthorized: Only admins can delete experience entries");
    };
    experiences.remove(id);
  };

  // Social Links functions (Admin only for CUD)
  public shared ({ caller }) func createSocialLink(socialLink : SocialLink) : async () {
    if (not isAdminSession(caller)) {
      Runtime.trap("Unauthorized: Only admins can create social links");
    };
    let newSocialLink = { socialLink with id = nextSocialLinkId };
    socialLinks.add(nextSocialLinkId, newSocialLink);
    nextSocialLinkId += 1;
  };

  public shared ({ caller }) func updateSocialLink(id : Nat, socialLink : SocialLink) : async () {
    if (not isAdminSession(caller)) {
      Runtime.trap("Unauthorized: Only admins can update social links");
    };
    if (not socialLinks.containsKey(id)) {
      Runtime.trap("Social link not found");
    };
    socialLinks.add(id, { socialLink with id });
  };

  public shared ({ caller }) func deleteSocialLink(id : Nat) : async () {
    if (not isAdminSession(caller)) {
      Runtime.trap("Unauthorized: Only admins can delete social links");
    };
    socialLinks.remove(id);
  };

  public shared ({ caller }) func updateAbout(content : Text) : async () {
    if (not isAdminSession(caller)) {
      Runtime.trap("Unauthorized: Only admins can update about content");
    };
    aboutContent := { content };
  };

  // Public: Anyone can submit a contact message
  public shared ({ caller }) func submitContactMessage(name : Text, email : Text, message : Text) : async () {
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

  // Admin only: View all contact messages
  public shared ({ caller }) func getContactMessages() : async [ContactMessage] {
    if (not isAdminSession(caller)) {
      Runtime.trap("Unauthorized: Only admins can view contact messages");
    };
    contactMessages.values().toArray();
  };

  // Admin only: Mark message as read
  public shared ({ caller }) func markMessageAsRead(id : Nat) : async () {
    if (not isAdminSession(caller)) {
      Runtime.trap("Unauthorized: Only admins can mark messages as read");
    };
    let updatedMessage = switch (contactMessages.get(id)) {
      case (null) { Runtime.trap("Message not found") };
      case (?message) { { message with read = true } };
    };
    contactMessages.add(id, updatedMessage);
  };

  // Admin only: Delete contact message
  public shared ({ caller }) func deleteContactMessage(id : Nat) : async () {
    if (not isAdminSession(caller)) {
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

  func isValidAdminCredentialsInternal(credentials : AdminCredentials) : Bool {
    switch (adminCredentials) {
      case (?creds) {
        credentials.email == creds.email and credentials.password == creds.password;
      };
      case (null) { false };
    };
  };

  func isAdminSession(caller : Principal) : Bool {
    switch (adminSession) {
      case (?session) {
        let notExpired = (Time.now() - session.createdAt) < SESSION_TIMEOUT_NS;
        notExpired and session.principal == caller;
      };
      case (null) { false };
    };
  };
};

