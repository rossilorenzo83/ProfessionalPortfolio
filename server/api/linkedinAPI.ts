import { ProfileInsert } from "@shared/schema";
import { linkedinConfig, loggingConfig } from "../config";
import axios from "axios";
import * as cheerio from "cheerio";

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
      let response: LinkedInApiResponse;
      
      if (linkedinConfig.useRealApi) {
        // In a real implementation, this would make an API call to LinkedIn using the access token
        if (loggingConfig.logApiCalls) {
          console.log('Making live LinkedIn API call');
        }
        response = await makeLiveApiCall();
      } else {
        // Fall back to simulated data if API credentials aren't configured
        if (loggingConfig.logApiCalls) {
          console.log('Using simulated LinkedIn data (API credentials not configured)');
        }
        response = await simulateApiCall();
      }

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

// Fetch public LinkedIn profile data
async function makeLiveApiCall(): Promise<LinkedInApiResponse> {
  try {
    // Use the public profile URL if provided, or default to a hardcoded profile
    const profileUrl = linkedinConfig.publicProfileUrl || 'https://www.linkedin.com/in/lrossism/';
    
    console.log(`Fetching public LinkedIn profile from: ${profileUrl}`);
    
    // Create a request with appropriate headers to mimic a browser
    const response = await axios.get(profileUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'DNT': '1',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Cache-Control': 'max-age=0'
      }
    });
    
    // Load the HTML response into cheerio for parsing
    const $ = cheerio.load(response.data);
    
    // Extract profile information using cheerio selectors
    // Note: LinkedIn's HTML structure can change, so these selectors may need updates
    const fullName = $('h1.text-heading-xlarge').text().trim() || 'L Ross';
    const nameParts = fullName.split(' ');
    const firstName = nameParts[0] || 'L';
    const lastName = nameParts.slice(1).join(' ') || 'Ross';
    
    const headline = $('div.text-body-medium').first().text().trim() || 'Software Developer';
    
    // Extract summary/about section
    const summary = $('div.display-flex.ph5.pv3 div.pv-shared-text-with-see-more p.visually-hidden').text().trim() ||
                   'Professional software developer with expertise in modern web technologies.';
    
    // Extract location information
    const locationText = $('span.text-body-small.inline.t-black--light.break-words').text().trim() || 'San Francisco Bay Area';
    const locationParts = locationText.split(',').map(part => part.trim());
    const city = locationParts[0] || 'San Francisco';
    const country = locationParts[1] || 'US';
    
    // Extract experience information
    const positions: LinkedInApiResponse['positions'] = [];
    
    // Try to find the experience section
    $('section#experience-section ul.pv-profile-section__section-info > li').each((i, elem) => {
      const title = $(elem).find('h3.t-16.t-black.t-bold').text().trim();
      const company = $(elem).find('p.pv-entity__secondary-title').text().trim();
      const dateRange = $(elem).find('h4.pv-entity__date-range span:not(.visually-hidden)').text().trim();
      
      // Determine if current position
      const isCurrent = dateRange.toLowerCase().includes('present');
      
      positions.push({
        title: title || 'Software Developer',
        company: company || 'Technology Company',
        startDate: '2020-01', // Default date format
        isCurrent
      });
    });
    
    // If no positions found, add a default current position
    if (positions.length === 0) {
      positions.push({
        title: 'Software Developer',
        company: 'Technology Company',
        startDate: '2020-01',
        isCurrent: true
      });
    }
    
    // Extract education information
    const education: LinkedInApiResponse['education'] = [];
    
    // Try to find the education section
    $('section#education-section ul.pv-profile-section__section-info > li').each((i, elem) => {
      const schoolName = $(elem).find('h3.pv-entity__school-name').text().trim();
      const degreeField = $(elem).find('p.pv-entity__degree-name span.pv-entity__comma-item').text().trim();
      const fieldOfStudy = $(elem).find('p.pv-entity__fos span.pv-entity__comma-item').text().trim();
      
      education.push({
        schoolName: schoolName || 'University',
        degree: degreeField || 'BS',
        fieldOfStudy: fieldOfStudy || 'Computer Science'
      });
    });
    
    // If no education found, add a default
    if (education.length === 0) {
      education.push({
        schoolName: 'University',
        degree: 'BS',
        fieldOfStudy: 'Computer Science'
      });
    }
    
    // Extract profile picture
    const profilePicture = $('img.pv-top-card-profile-picture__image').attr('src') ||
                          undefined;
    
    // Return the parsed profile information
    return {
      firstName,
      lastName,
      headline,
      summary,
      positions,
      education,
      location: {
        city,
        country
      },
      profilePicture,
      publicProfileUrl: profileUrl
    };
  } catch (error) {
    console.error('LinkedIn public profile fetch error:', error);
    console.log('Falling back to simulated data due to error');
    return simulateApiCall();
  }
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
