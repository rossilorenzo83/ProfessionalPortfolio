export interface Profile {
  name: string;
  title: string;
  summary: string;
  currentRole: string;
  experience: string;
  location: string;
  education: string;
  avatar: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface Tool {
  name: string;
}

export interface SoftSkill {
  name: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  liveUrl: string;
  githubUrl: string;
  tech: string[];
}

export interface GitHubStats {
  repoCount: number;
  stars: number;
  forks: number;
  contributions: number;
  contributionPeriod: {
    start: string;
    end: string;
  };
  languages: {
    name: string;
    percentage: number;
    color: string;
  }[];
  recentRepos: {
    name: string;
    description: string;
    stars: number;
    forks: number;
    language: string;
    languageColor: string;
    updatedAt: string;
    url: string;
  }[];
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  social: {
    linkedin: string;
    github: string;
    twitter: string;
  };
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
