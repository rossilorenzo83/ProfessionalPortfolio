# API Integration Guide

## Overview

This portfolio website integrates with LinkedIn, GitHub, and Google Drive APIs to automatically fetch and display your professional information. This guide explains how to set up and configure these integrations.

## GitHub Integration

### Setting up GitHub API Access

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Generate new token
2. Give your token a descriptive name (e.g., "Portfolio Website Integration")
3. Set the expiration as needed (or select "No expiration" if allowed)
4. Select the following scopes:
   - `repo` (for repository statistics)
   - `read:user` (for profile information)
5. Click "Generate token" and copy the generated token

### Configuring GitHub Integration

In your `.env` file, set the following variables:

```
GITHUB_API_KEY=your_github_personal_access_token
GITHUB_USERNAME=your_github_username
GITHUB_REFRESH_INTERVAL=86400000  # How often to sync data (in ms)
```

### What GitHub Data is Displayed

- Total repositories count
- Star count across all repositories
- Fork count across all repositories
- Total contribution count
- Contribution period (date range)
- Most used programming languages with percentages
- Recent repositories with descriptions, stars, and languages

## LinkedIn Integration

### Setting up LinkedIn API Access

1. Go to [LinkedIn Developer Portal](https://www.linkedin.com/developers/)
2. Create a new app
3. Request the following permissions:
   - `r_liteprofile` (for basic profile information)
   - `r_emailaddress` (for email access)
   - `r_fullprofile` (for full profile details)
4. Set up the OAuth redirect URL to your application's callback URL
5. Once approved, note your Client ID and Client Secret

### Authenticating with LinkedIn

1. Implement the OAuth 2.0 flow to authenticate with LinkedIn
2. Store the refresh token for ongoing access

### Configuring LinkedIn Integration

In your `.env` file, set the following variables:

```
LINKEDIN_CLIENT_ID=your_client_id
LINKEDIN_CLIENT_SECRET=your_client_secret
LINKEDIN_REDIRECT_URI=your_redirect_uri
LINKEDIN_ACCESS_TOKEN=your_access_token
LINKEDIN_REFRESH_INTERVAL=86400000  # How often to sync data (in ms)
```

### What LinkedIn Data is Displayed

- Profile name and headline
- Current position
- Work experience
- Education information
- Skills and endorsements
- Profile picture
- Location

## Google Drive Integration

### Setting up Google Drive API Access

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable the Google Drive API
4. Configure the OAuth consent screen
5. Create OAuth 2.0 credentials (Web application type)
6. Add authorized redirect URIs
7. Note your Client ID and Client Secret

### Authenticating with Google Drive

1. Implement the OAuth 2.0 flow to authenticate with Google
2. Request access to the user's Google Drive
3. Store the refresh token for ongoing access

### Configuring Google Drive Integration

In your `.env` file, set the following variables:

```
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_REDIRECT_URI=your_redirect_uri
GOOGLE_REFRESH_TOKEN=your_refresh_token
GOOGLE_DRIVE_REFRESH_INTERVAL=86400000  # How often to sync data (in ms)
```

### What Google Drive Data is Used

- CV/Resume document (PDF format)
- Document metadata (name, last updated)

## Using the API Sync Service

The portfolio website includes an API synchronization service that periodically fetches fresh data from the configured APIs. The service:

1. Runs automatically at the configured intervals
2. Stores the fetched data in the database
3. Serves cached data when API requests fail
4. Provides a manual refresh endpoint for immediate updates

### Manual Refresh

Administrators can manually trigger a refresh of all APIs by calling the admin endpoint:

```
POST /api/admin/refresh
```

This endpoint requires authentication with an admin token, which is configured in the `.env` file:

```
ADMIN_TOKEN=your_secure_admin_token
```

## Troubleshooting API Integrations

### GitHub Integration Issues

- **Error: Bad credentials**: Your GitHub token is invalid or has expired
- **Rate limit exceeded**: You've made too many requests to the GitHub API

### LinkedIn Integration Issues

- **Invalid access token**: Your LinkedIn token has expired
- **Invalid redirect URI**: The redirect URI doesn't match what's configured in LinkedIn

### Google Drive Integration Issues

- **Invalid credentials**: Your Google API credentials are invalid
- **Token expired**: Your refresh token has expired and needs to be renewed

## Security Considerations

- Never commit API keys, tokens, or credentials to your repository
- Use environment variables to store sensitive information
- Regularly rotate access tokens
- Set appropriate scopes for API access (principle of least privilege)

## Fallback Behavior

If API integrations fail or are not configured, the application will:

1. Use cached data from the database if available
2. Display a placeholder or message indicating the integration is not configured

This ensures the portfolio continues to function even if external APIs are unavailable.
