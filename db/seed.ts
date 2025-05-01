import { db } from "./index";
import * as schema from "@shared/schema";
import { eq } from "drizzle-orm";

async function seed() {
  try {
    console.log("Starting database seed...");

    // Seed profile data
    const profileData: schema.ProfileInsert = {
      name: "John Doe",
      title: "Full-Stack Developer",
      summary: "Passionate developer with 5+ years of experience building scalable web applications and solving complex problems. Specializing in modern JavaScript frameworks and cloud technologies.",
      currentRole: "Senior Developer at Tech Company",
      experience: "5+ Years",
      location: "San Francisco, CA",
      education: "Computer Science, Stanford University",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80",
      linkedinUrl: "https://linkedin.com/in/johndoe",
    };
    
    // Check if profile exists before inserting
    const existingProfile = await db.query.profile.findMany({ limit: 1 });
    if (existingProfile.length === 0) {
      console.log("Seeding profile data...");
      await db.insert(schema.profile).values(profileData);
    } else {
      console.log("Profile data already exists, skipping...");
    }

    // Seed technical skills
    const technicalSkills: schema.SkillInsert[] = [
      { name: "JavaScript", level: 90, type: "technical", order: 1 },
      { name: "React", level: 85, type: "technical", order: 2 },
      { name: "Node.js", level: 80, type: "technical", order: 3 },
      { name: "Python", level: 75, type: "technical", order: 4 }
    ];
    
    // Check if technical skills exist before inserting
    const existingTechSkills = await db.query.skills.findMany({ 
      where: eq(schema.skills.type, "technical"),
      limit: 1
    });
    
    if (existingTechSkills.length === 0) {
      console.log("Seeding technical skills...");
      await db.insert(schema.skills).values(technicalSkills);
    } else {
      console.log("Technical skills already exist, skipping...");
    }

    // Seed tools/frameworks
    const tools: schema.SkillInsert[] = [
      { name: "React", level: 0, type: "tool", order: 1 },
      { name: "Express.js", level: 0, type: "tool", order: 2 },
      { name: "Next.js", level: 0, type: "tool", order: 3 },
      { name: "Docker", level: 0, type: "tool", order: 4 },
      { name: "AWS", level: 0, type: "tool", order: 5 },
      { name: "MongoDB", level: 0, type: "tool", order: 6 },
      { name: "PostgreSQL", level: 0, type: "tool", order: 7 },
      { name: "Git", level: 0, type: "tool", order: 8 },
      { name: "Jest", level: 0, type: "tool", order: 9 },
      { name: "Redux", level: 0, type: "tool", order: 10 }
    ];
    
    const existingTools = await db.query.skills.findMany({ 
      where: eq(schema.skills.type, "tool"),
      limit: 1
    });
    
    if (existingTools.length === 0) {
      console.log("Seeding tools/frameworks...");
      await db.insert(schema.skills).values(tools);
    } else {
      console.log("Tools/frameworks already exist, skipping...");
    }

    // Seed soft skills
    const softSkills: schema.SkillInsert[] = [
      { name: "Problem Solving", level: 0, type: "soft", order: 1 },
      { name: "Communication", level: 0, type: "soft", order: 2 },
      { name: "Team Collaboration", level: 0, type: "soft", order: 3 },
      { name: "Project Management", level: 0, type: "soft", order: 4 },
      { name: "Adaptability", level: 0, type: "soft", order: 5 }
    ];
    
    const existingSoftSkills = await db.query.skills.findMany({ 
      where: eq(schema.skills.type, "soft"),
      limit: 1
    });
    
    if (existingSoftSkills.length === 0) {
      console.log("Seeding soft skills...");
      await db.insert(schema.skills).values(softSkills);
    } else {
      console.log("Soft skills already exist, skipping...");
    }

    // Seed projects
    const projectsData: schema.ProjectInsert[] = [
      {
        title: "E-commerce Platform",
        description: "A full-featured online store with payment processing, inventory management, and analytics dashboard.",
        imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        liveUrl: "https://ecommerce-demo.example.com",
        githubUrl: "https://github.com/johndoe/ecommerce-platform",
        tech: ["React", "Node.js", "MongoDB"],
        featured: true,
        order: 1
      },
      {
        title: "Task Management App",
        description: "A collaborative task manager with real-time updates, notifications, and team performance analytics.",
        imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        liveUrl: "https://taskmanager-demo.example.com",
        githubUrl: "https://github.com/johndoe/task-manager",
        tech: ["Vue.js", "Express", "Socket.io"],
        featured: true,
        order: 2
      },
      {
        title: "AI Chatbot Assistant",
        description: "An intelligent virtual assistant with natural language processing capabilities for customer support.",
        imageUrl: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        liveUrl: "https://aichatbot-demo.example.com",
        githubUrl: "https://github.com/johndoe/ai-chatbot",
        tech: ["Python", "TensorFlow", "Flask"],
        featured: true,
        order: 3
      }
    ];
    
    const existingProjects = await db.query.projects.findMany({ limit: 1 });
    
    if (existingProjects.length === 0) {
      console.log("Seeding projects...");
      await db.insert(schema.projects).values(projectsData);
    } else {
      console.log("Projects already exist, skipping...");
    }

    // Seed GitHub stats
    const githubStatsData: schema.GitHubStatsInsert = {
      repoCount: 25,
      stars: 142,
      forks: 47,
      contributions: 734,
      contributionPeriod: {
        start: "Jun 2022",
        end: "Jun 2023"
      },
      languages: [
        { name: "JavaScript", percentage: 45, color: "#f1e05a" },
        { name: "TypeScript", percentage: 30, color: "#2b7489" },
        { name: "Python", percentage: 15, color: "#3572A5" },
        { name: "HTML/CSS", percentage: 10, color: "#e34c26" }
      ],
      recentRepos: [
        {
          name: "react-dashboard-template",
          description: "A customizable React dashboard with dark mode and responsive design",
          stars: 24,
          forks: 8,
          language: "TypeScript",
          languageColor: "#2b7489",
          updatedAt: "2 days ago",
          url: "https://github.com/johndoe/react-dashboard-template"
        },
        {
          name: "node-api-starter",
          description: "A production-ready Node.js API boilerplate with authentication and testing",
          stars: 42,
          forks: 15,
          language: "JavaScript",
          languageColor: "#f1e05a",
          updatedAt: "1 week ago",
          url: "https://github.com/johndoe/node-api-starter"
        },
        {
          name: "ml-image-classifier",
          description: "A machine learning image classification system using TensorFlow",
          stars: 18,
          forks: 3,
          language: "Python",
          languageColor: "#3572A5",
          updatedAt: "3 weeks ago",
          url: "https://github.com/johndoe/ml-image-classifier"
        }
      ]
    };
    
    const existingGitHubStats = await db.query.githubStats.findMany({ limit: 1 });
    
    if (existingGitHubStats.length === 0) {
      console.log("Seeding GitHub stats...");
      await db.insert(schema.githubStats).values(githubStatsData);
    } else {
      console.log("GitHub stats already exist, skipping...");
    }

    // Seed contact info
    const contactInfoData: schema.ContactInfoInsert = {
      email: "john.doe@example.com",
      phone: "+1 (234) 567-890",
      location: "San Francisco, CA",
      social: {
        linkedin: "https://linkedin.com/in/johndoe",
        github: "https://github.com/johndoe",
        twitter: "https://twitter.com/johndoe"
      }
    };
    
    const existingContactInfo = await db.query.contactInfo.findMany({ limit: 1 });
    
    if (existingContactInfo.length === 0) {
      console.log("Seeding contact info...");
      await db.insert(schema.contactInfo).values(contactInfoData);
    } else {
      console.log("Contact info already exists, skipping...");
    }

    // Seed Resume/CV
    const resumeData: schema.ResumeCVInsert = {
      title: "John Doe - Professional Resume 2023",
      fileUrl: "https://drive.google.com/uc?export=download&id=1abc123",
      isActive: true
    };
    
    const existingResume = await db.query.resumeCV.findMany({ limit: 1 });
    
    if (existingResume.length === 0) {
      console.log("Seeding resume/CV...");
      await db.insert(schema.resumeCV).values(resumeData);
    } else {
      console.log("Resume/CV already exists, skipping...");
    }

    console.log("Database seed completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

seed();
