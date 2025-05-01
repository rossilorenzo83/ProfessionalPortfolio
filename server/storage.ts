import { db } from "@db";
import { eq, desc } from "drizzle-orm";
import { 
  profile, 
  skills, 
  projects, 
  githubStats, 
  contactInfo,
  contactSubmissions,
  resumeCV,
  ContactSubmissionInsert,
  GitHubStatsInsert
} from "@shared/schema";

export const storage = {
  // Profile methods
  getProfile: async () => {
    const profiles = await db.query.profile.findMany({
      orderBy: desc(profile.updatedAt),
      limit: 1
    });
    return profiles[0] || null;
  },

  // Skills methods
  getSkills: async (type?: string) => {
    let query = db.query.skills.findMany({
      orderBy: skills.order
    });

    if (type) {
      query = db.query.skills.findMany({
        where: eq(skills.type, type),
        orderBy: skills.order
      });
    }

    return query;
  },

  // Projects methods
  getProjects: async (featured: boolean = false) => {
    let query = db.query.projects.findMany({
      orderBy: projects.order
    });

    if (featured) {
      query = db.query.projects.findMany({
        where: eq(projects.featured, true),
        orderBy: projects.order
      });
    }

    return query;
  },

  // GitHub stats methods
  getGitHubStats: async () => {
    const stats = await db.query.githubStats.findMany({
      orderBy: desc(githubStats.updatedAt),
      limit: 1
    });
    return stats[0] || null;
  },

  updateGitHubStats: async (data: GitHubStatsInsert) => {
    const [updated] = await db.insert(githubStats).values(data).returning();
    return updated;
  },

  // Contact info methods
  getContactInfo: async () => {
    const info = await db.query.contactInfo.findMany({
      limit: 1
    });
    return info[0] || null;
  },

  // Contact submissions methods
  saveContactSubmission: async (data: ContactSubmissionInsert) => {
    const [submission] = await db.insert(contactSubmissions).values(data).returning();
    return submission;
  },

  // CV/Resume methods
  getActiveCV: async () => {
    const cvs = await db.query.resumeCV.findMany({
      where: eq(resumeCV.isActive, true),
      orderBy: desc(resumeCV.uploadedAt),
      limit: 1
    });
    return cvs[0] || null;
  }
};
