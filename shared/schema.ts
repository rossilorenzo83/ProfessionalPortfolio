import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// User profile table
export const profile = pgTable("profile", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  currentRole: text("current_role").notNull(),
  experience: text("experience").notNull(),
  location: text("location").notNull(),
  education: text("education").notNull(),
  avatar: text("avatar").notNull(),
  linkedinUrl: text("linkedin_url"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Skills table
export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  level: integer("level").notNull(),
  type: text("type").notNull(), // "technical", "tool", "soft"
  order: integer("order").notNull().default(0),
});

// Projects table
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  liveUrl: text("live_url"),
  githubUrl: text("github_url"),
  tech: text("tech").array().notNull(),
  featured: boolean("featured").default(false).notNull(),
  order: integer("order").notNull().default(0),
});

// GitHub stats table (cached data from GitHub API)
export const githubStats = pgTable("github_stats", {
  id: serial("id").primaryKey(),
  repoCount: integer("repo_count").notNull(),
  stars: integer("stars").notNull(),
  forks: integer("forks").notNull(),
  contributions: integer("contributions").notNull(),
  contributionPeriod: jsonb("contribution_period").notNull(),
  languages: jsonb("languages").notNull(),
  recentRepos: jsonb("recent_repos").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Contact information
export const contactInfo = pgTable("contact_info", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  phone: text("phone"),
  location: text("location").notNull(),
  social: jsonb("social").notNull(),
});

// Contact form submissions
export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  read: boolean("read").default(false).notNull(),
});

// Resume/CV
export const resumeCV = pgTable("resume_cv", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  fileUrl: text("file_url").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  uploadedAt: timestamp("uploaded_at").defaultNow().notNull(),
});

// Validation schemas using drizzle-zod
export const profileInsertSchema = createInsertSchema(profile);
export const skillsInsertSchema = createInsertSchema(skills);
export const projectsInsertSchema = createInsertSchema(projects);
export const githubStatsInsertSchema = createInsertSchema(githubStats);
export const contactInfoInsertSchema = createInsertSchema(contactInfo);
export const contactSubmissionsInsertSchema = createInsertSchema(contactSubmissions);
export const resumeCVInsertSchema = createInsertSchema(resumeCV);

// Types
export type Profile = typeof profile.$inferSelect;
export type Skill = typeof skills.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type GitHubStats = typeof githubStats.$inferSelect;
export type ContactInfo = typeof contactInfo.$inferSelect;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type ResumeCV = typeof resumeCV.$inferSelect;

export type ProfileInsert = z.infer<typeof profileInsertSchema>;
export type SkillInsert = z.infer<typeof skillsInsertSchema>;
export type ProjectInsert = z.infer<typeof projectsInsertSchema>;
export type GitHubStatsInsert = z.infer<typeof githubStatsInsertSchema>;
export type ContactInfoInsert = z.infer<typeof contactInfoInsertSchema>;
export type ContactSubmissionInsert = z.infer<typeof contactSubmissionsInsertSchema>;
export type ResumeCVInsert = z.infer<typeof resumeCVInsertSchema>;
