import { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { linkedinAPI } from "./api/linkedinAPI";
import { githubAPI } from "./api/githubAPI";
import { googleDriveAPI } from "./api/googleDriveAPI";
import { contactSubmissionsInsertSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API prefix
  const apiPrefix = "/api";

  // Profile endpoint
  app.get(`${apiPrefix}/profile`, async (req: Request, res: Response) => {
    try {
      // Try to get from LinkedIn API first
      try {
        const linkedinProfile = await linkedinAPI.getProfile();
        return res.json(linkedinProfile);
      } catch (linkedinError) {
        console.error("LinkedIn API error:", linkedinError);
        // Fall back to database if LinkedIn API fails
        const profile = await storage.getProfile();
        if (!profile) {
          return res.status(404).json({ message: "Profile not found" });
        }
        return res.json(profile);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // Skills endpoints
  app.get(`${apiPrefix}/skills`, async (req: Request, res: Response) => {
    try {
      const type = req.query.type as string | undefined;
      const skills = await storage.getSkills(type);
      return res.json(skills);
    } catch (error) {
      console.error("Error fetching skills:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // Projects endpoint
  app.get(`${apiPrefix}/projects`, async (req: Request, res: Response) => {
    try {
      const featured = req.query.featured === "true";
      const projects = await storage.getProjects(featured);
      return res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // GitHub stats endpoint
  app.get(`${apiPrefix}/github`, async (req: Request, res: Response) => {
    try {
      // Try to get from GitHub API first
      try {
        const githubStats = await githubAPI.getStats();
        // Cache the results in the database
        await storage.updateGitHubStats(githubStats);
        return res.json(githubStats);
      } catch (githubError) {
        console.error("GitHub API error:", githubError);
        // Fall back to cached database data if GitHub API fails
        const cachedStats = await storage.getGitHubStats();
        if (!cachedStats) {
          return res.status(404).json({ message: "GitHub stats not found" });
        }
        return res.json(cachedStats);
      }
    } catch (error) {
      console.error("Error fetching GitHub stats:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // Contact info endpoint
  app.get(`${apiPrefix}/contact`, async (req: Request, res: Response) => {
    try {
      const contactInfo = await storage.getContactInfo();
      if (!contactInfo) {
        return res.status(404).json({ message: "Contact info not found" });
      }
      return res.json(contactInfo);
    } catch (error) {
      console.error("Error fetching contact info:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // Contact form submission endpoint
  app.post(`${apiPrefix}/contact`, async (req: Request, res: Response) => {
    try {
      const validatedData = contactSubmissionsInsertSchema.parse(req.body);
      const submission = await storage.saveContactSubmission(validatedData);
      return res.status(201).json({ message: "Message sent successfully", id: submission.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors });
      }
      console.error("Error saving contact submission:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // CV download endpoint
  app.get(`${apiPrefix}/cv`, async (req: Request, res: Response) => {
    try {
      // Try to get from Google Drive API first
      try {
        const cvUrl = await googleDriveAPI.getCV();
        // Redirect to the Google Drive file
        return res.redirect(cvUrl);
      } catch (driveError) {
        console.error("Google Drive API error:", driveError);
        // Fall back to database if Google Drive API fails
        const cv = await storage.getActiveCV();
        if (!cv) {
          return res.status(404).json({ message: "CV not found" });
        }
        return res.redirect(cv.fileUrl);
      }
    } catch (error) {
      console.error("Error fetching CV:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
