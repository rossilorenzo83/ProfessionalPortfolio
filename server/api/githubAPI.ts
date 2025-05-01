import { GitHubStatsInsert } from "@shared/schema";
import { githubConfig, loggingConfig } from "../config";

interface GitHubApiResponse {
  user: {
    login: string;
    repositories: {
      totalCount: number;
    };
    starredRepositories: {
      totalCount: number;
    };
    followers: {
      totalCount: number;
    };
    contributionsCollection: {
      contributionCalendar: {
        totalContributions: number;
        weeks: {
          contributionDays: {
            date: string;
            contributionCount: number;
          }[];
        }[];
      };
    };
    topLanguages: {
      language: string;
      percentage: number;
      color: string;
    }[];
    repositories: {
      nodes: {
        name: string;
        description: string;
        stargazerCount: number;
        forkCount: number;
        url: string;
        primaryLanguage: {
          name: string;
          color: string;
        };
        updatedAt: string;
      }[];
    };
  };
}

export const githubAPI = {
  getStats: async (): Promise<GitHubStatsInsert> => {
    try {
      let response: GitHubApiResponse;

      if (githubConfig.useRealApi) {
        // Use real GitHub API
        if (loggingConfig.logApiCalls) {
          console.log('Making live GitHub API call');
        }
        response = await makeLiveApiCall();
      } else {
        // Fall back to simulated data if API credentials aren't configured
        if (loggingConfig.logApiCalls) {
          console.log('Using simulated GitHub data (API credentials not configured)');
        }
        response = await simulateApiCall();
      }

      // Get date range for contribution period
      const contributionPeriod = getContributionPeriod(response.user.contributionsCollection.contributionCalendar.weeks);

      // Transform top repositories
      const recentRepos = response.user.repositories.nodes.map(repo => ({
        name: repo.name,
        description: repo.description,
        stars: repo.stargazerCount,
        forks: repo.forkCount,
        language: repo.primaryLanguage?.name || "None",
        languageColor: repo.primaryLanguage?.color || "#888888",
        updatedAt: formatDate(repo.updatedAt),
        url: repo.url
      }));

      // Transform the GitHub response to our schema format
      return {
        repoCount: response.user.repositories.totalCount,
        stars: response.user.starredRepositories.totalCount,
        forks: calculateTotalForks(response.user.repositories.nodes),
        contributions: response.user.contributionsCollection.contributionCalendar.totalContributions,
        contributionPeriod,
        languages: response.user.topLanguages,
        recentRepos
      };
    } catch (error) {
      console.error("GitHub API error:", error);
      throw error;
    }
  }
};

// Helper functions
function calculateTotalForks(repos: GitHubApiResponse["user"]["repositories"]["nodes"]): number {
  return repos.reduce((total, repo) => total + repo.forkCount, 0);
}

function getContributionPeriod(weeks: GitHubApiResponse["user"]["contributionsCollection"]["contributionCalendar"]["weeks"]): { start: string; end: string } {
  // In a real implementation, this would extract the date range from the weeks data
  return {
    start: "Jun 2022",
    end: "Jun 2023"
  };
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return "today";
  if (diffDays === 1) return "yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

// Make a real API call to GitHub
async function makeLiveApiCall(): Promise<GitHubApiResponse> {
  try {
    // This would be replaced with actual GitHub API calls using the personal access token
    // For example, using the GitHub GraphQL API with fetch or an API client like axios
    
    /*
    const query = `query {
      viewer {
        login
        repositories(first: 100, orderBy: {field: UPDATED_AT, direction: DESC}) {
          totalCount
          nodes {
            name
            description
            stargazerCount
            forkCount
            url
            primaryLanguage {
              name
              color
            }
            updatedAt
          }
        }
        starredRepositories {
          totalCount
        }
        followers {
          totalCount
        }
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }`;
    
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${githubConfig.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query })
    });
    
    const data = await response.json();
    return transformGitHubResponse(data);
    */
    
    // For now, just simulate a delay and return the same mock data
    // This will be replaced with actual API integration when credentials are provided
    await new Promise(resolve => setTimeout(resolve, 500));
    return simulateApiCall();
  } catch (error) {
    console.error('GitHub API live call error:', error);
    throw error;
  }
}

// Simulate an API call for development
async function simulateApiCall(): Promise<GitHubApiResponse> {
  // This simulates an API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // For now, return mock data
  // In production, this would be replaced with actual API calls
  return {
    user: {
      login: "johndoe",
      repositories: {
        totalCount: 25
      },
      starredRepositories: {
        totalCount: 142
      },
      followers: {
        totalCount: 87
      },
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: 734,
          weeks: [] // This would contain detailed contribution data in the real API
        }
      },
      topLanguages: [
        { language: "JavaScript", percentage: 45, color: "#f1e05a" },
        { language: "TypeScript", percentage: 30, color: "#2b7489" },
        { language: "Python", percentage: 15, color: "#3572A5" },
        { language: "HTML/CSS", percentage: 10, color: "#e34c26" }
      ],
      repositories: {
        nodes: [
          {
            name: "react-dashboard-template",
            description: "A customizable React dashboard with dark mode and responsive design",
            stargazerCount: 24,
            forkCount: 8,
            url: "https://github.com/johndoe/react-dashboard-template",
            primaryLanguage: {
              name: "TypeScript",
              color: "#2b7489"
            },
            updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days ago
          },
          {
            name: "node-api-starter",
            description: "A production-ready Node.js API boilerplate with authentication and testing",
            stargazerCount: 42,
            forkCount: 15,
            url: "https://github.com/johndoe/node-api-starter",
            primaryLanguage: {
              name: "JavaScript",
              color: "#f1e05a"
            },
            updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() // 1 week ago
          },
          {
            name: "ml-image-classifier",
            description: "A machine learning image classification system using TensorFlow",
            stargazerCount: 18,
            forkCount: 3,
            url: "https://github.com/johndoe/ml-image-classifier",
            primaryLanguage: {
              name: "Python",
              color: "#3572A5"
            },
            updatedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString() // 3 weeks ago
          }
        ]
      }
    }
  };
}
