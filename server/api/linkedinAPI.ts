import { ProfileInsert } from "@shared/schema";

interface LinkedInApiResponse {
  firstName: string;
  lastName: string;
  headline: string;
  summary: string;
  positions: {
    title: string;
    company: string;
    startDate: string;
    endDate?: string;
    isCurrent: boolean;
  }[];
  education: {
    schoolName: string;
    degree: string;
    fieldOfStudy: string;
  }[];
  location: {
    country: string;
    city: string;
  };
  profilePicture?: string;
  publicProfileUrl: string;
}

export const linkedinAPI = {
  getProfile: async (): Promise<ProfileInsert> => {
    try {
      // Check for API key
      const apiKey = process.env.LINKEDIN_API_KEY;
      if (!apiKey) {
        throw new Error("LinkedIn API key not configured");
      }

      // In a real implementation, this would make an API call to LinkedIn
      // For now, we'll simulate a response
      const response: LinkedInApiResponse = await simulateApiCall();

      // Transform the LinkedIn response to our schema format
      return {
        name: `${response.firstName} ${response.lastName}`,
        title: response.headline,
        summary: response.summary,
        currentRole: response.positions.find(p => p.isCurrent)?.title || "Not specified",
        experience: calculateExperience(response.positions),
        location: `${response.location.city}, ${response.location.country}`,
        education: formatEducation(response.education),
        avatar: response.profilePicture || "/avatar-placeholder.svg",
        linkedinUrl: response.publicProfileUrl,
      };
    } catch (error) {
      console.error("LinkedIn API error:", error);
      throw error;
    }
  }
};

// Helper functions
function calculateExperience(positions: LinkedInApiResponse["positions"]): string {
  // In a real implementation, this would calculate years of experience
  // based on position dates
  return "5+ Years";
}

function formatEducation(education: LinkedInApiResponse["education"]): string {
  if (!education || education.length === 0) return "Not specified";
  const mostRecent = education[0];
  return `${mostRecent.degree} in ${mostRecent.fieldOfStudy}, ${mostRecent.schoolName}`;
}

// Simulate an API call for development
async function simulateApiCall(): Promise<LinkedInApiResponse> {
  // This simulates an API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // For now, return mock data
  // In production, this would be replaced with actual API calls
  return {
    firstName: "John",
    lastName: "Doe",
    headline: "Full-Stack Developer",
    summary: "Passionate developer with 5+ years of experience building scalable web applications and solving complex problems. Specializing in modern JavaScript frameworks and cloud technologies.",
    positions: [
      {
        title: "Senior Developer",
        company: "Tech Company",
        startDate: "2020-01-01",
        isCurrent: true
      },
      {
        title: "Frontend Developer",
        company: "Previous Company",
        startDate: "2018-01-01",
        endDate: "2019-12-31",
        isCurrent: false
      }
    ],
    education: [
      {
        schoolName: "Stanford University",
        degree: "BS",
        fieldOfStudy: "Computer Science"
      }
    ],
    location: {
      country: "CA",
      city: "San Francisco"
    },
    publicProfileUrl: "https://linkedin.com/in/johndoe"
  };
}
