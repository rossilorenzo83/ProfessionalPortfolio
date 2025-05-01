/**
 * Configuration module for API integrations
 * Loads environment variables and provides default values
 */

// Default refresh intervals (24 hours in milliseconds)
const DEFAULT_REFRESH_INTERVAL = 24 * 60 * 60 * 1000;

// GitHub configuration
export const githubConfig = {
  // API credentials
  apiKey: process.env.GITHUB_API_KEY || '',
  username: process.env.GITHUB_USERNAME || '',
  
  // Refresh interval configuration
  refreshInterval: parseInt(process.env.GITHUB_REFRESH_INTERVAL || DEFAULT_REFRESH_INTERVAL.toString(), 10),
  
  // Whether to use real API (false will use simulated data)
  useRealApi: Boolean(process.env.GITHUB_API_KEY && process.env.GITHUB_USERNAME),
};

// LinkedIn configuration
export const linkedinConfig = {
  // API credentials
  clientId: process.env.LINKEDIN_CLIENT_ID || '',
  clientSecret: process.env.LINKEDIN_CLIENT_SECRET || '',
  redirectUri: process.env.LINKEDIN_REDIRECT_URI || '',
  accessToken: process.env.LINKEDIN_ACCESS_TOKEN || '',
  
  // Refresh interval configuration
  refreshInterval: parseInt(process.env.LINKEDIN_REFRESH_INTERVAL || DEFAULT_REFRESH_INTERVAL.toString(), 10),
  
  // Whether to use real API (false will use simulated data)
  useRealApi: Boolean(
    process.env.LINKEDIN_CLIENT_ID && 
    process.env.LINKEDIN_CLIENT_SECRET && 
    process.env.LINKEDIN_ACCESS_TOKEN
  ),
};

// Google Drive configuration
export const googleDriveConfig = {
  // API credentials
  clientId: process.env.GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  redirectUri: process.env.GOOGLE_REDIRECT_URI || '',
  refreshToken: process.env.GOOGLE_REFRESH_TOKEN || '',
  
  // Refresh interval configuration
  refreshInterval: parseInt(process.env.GOOGLE_DRIVE_REFRESH_INTERVAL || DEFAULT_REFRESH_INTERVAL.toString(), 10),
  
  // Whether to use real API (false will use simulated data)
  useRealApi: Boolean(
    process.env.GOOGLE_CLIENT_ID && 
    process.env.GOOGLE_CLIENT_SECRET && 
    process.env.GOOGLE_REFRESH_TOKEN
  ),
};

// Logging configuration
export const loggingConfig = {
  // Whether to log API calls and responses
  logApiCalls: process.env.NODE_ENV !== 'production',
  
  // Whether to log errors
  logErrors: true,
};

// Admin configuration
export const adminConfig = {
  // Enable manual refresh from admin panel
  allowManualRefresh: true,
};
