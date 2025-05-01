# API Integration Guide

## Overview

This portfolio website supports integration with external services to automatically pull data from:

- **LinkedIn** - For professional profile information
- **GitHub** - For code repository statistics and contributions 
- **Google Drive** - For CV/resume retrieval

This guide explains how to set up these integrations.

## Configuration

All API keys and credentials are stored as environment variables. You should create a `.env` file in the root directory of your project based on the `.env.example` template.

```bash
# Copy the example file
cp .env.example .env

# Edit the file to add your API keys
nano .env
```

## LinkedIn API Setup

1. **Create a LinkedIn Developer Account**
   - Go to [LinkedIn Developer Portal](https://developer.linkedin.com/)
   - Sign in with your LinkedIn account
   - Create a new application

2. **Configure OAuth 2.0 Settings**
   - Add a redirect URL (for development, use `http://localhost:5000/auth/linkedin/callback`)
   - Request the necessary scopes:
     - `r_liteprofile`
     - `r_emailaddress` 
     - `r_basicprofile`

3. **Configure Environment Variables**
   Add the following to your `.env` file:
   ```
   LINKEDIN_CLIENT_ID=your_client_id
   LINKEDIN_CLIENT_SECRET=your_client_secret
   LINKEDIN_REDIRECT_URI=your_redirect_uri
   LINKEDIN_ACCESS_TOKEN=your_access_token
   ```

4. **Getting an Access Token**
   For simplicity, you can generate a permanent access token for your account:
   - Use the OAuth 2.0 flow to get an initial token
   - Store this token in `LINKEDIN_ACCESS_TOKEN`

## GitHub API Setup

1. **Create a Personal Access Token**
   - Go to [GitHub Developer Settings](https://github.com/settings/tokens)
   - Generate a new token with the following permissions:
     - `repo` (For repository statistics)
     - `read:user` (For user profile information)
     - `user:email` (For email information)

2. **Configure Environment Variables**
   Add the following to your `.env` file:
   ```
   GITHUB_API_KEY=your_personal_access_token
   GITHUB_USERNAME=your_github_username
   ```

## Google Drive API Setup

1. **Create a Google Cloud Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project
   - Enable the Google Drive API

2. **Set Up OAuth Credentials**
   - Configure the OAuth consent screen
   - Create OAuth client ID credentials
   - Add authorized redirect URIs (for development, use `http://localhost:5000/auth/google/callback`)

3. **Configure Environment Variables**
   Add the following to your `.env` file:
   ```
   GOOGLE_CLIENT_ID=your_client_id
   GOOGLE_CLIENT_SECRET=your_client_secret
   GOOGLE_REDIRECT_URI=your_redirect_uri
   GOOGLE_REFRESH_TOKEN=your_refresh_token
   ```

4. **Getting a Refresh Token**
   To obtain a refresh token, you'll need to go through the OAuth flow once:
   - Use the OAuth 2.0 flow to get an authorization code
   - Exchange the code for a refresh token
   - Store this token in `GOOGLE_REFRESH_TOKEN`

## Refresh Intervals

You can configure how often the application syncs data from external APIs by setting the following environment variables:

```
# Values in milliseconds (default: 24 hours = 86400000 ms)
GITHUB_REFRESH_INTERVAL=86400000
LINKEDIN_REFRESH_INTERVAL=86400000
GOOGLE_DRIVE_REFRESH_INTERVAL=86400000
```

## Manual Refresh

You can manually trigger a refresh of all external API data by sending a POST request to the refresh endpoint:

```bash
curl -X POST http://localhost:5000/api/admin/refresh
```

## Troubleshooting

### API Errors

If you encounter errors with API integrations:

1. **Check your API keys** - Ensure they haven't expired and have the correct permissions
2. **Check API quotas** - Some API providers have usage limits
3. **Examine server logs** - Look for error messages in the server console output

### Fallback to Database

The application is designed to work even when APIs are unavailable:

- If an API call fails, the system will use cached data from the database
- This ensures your portfolio site remains functional even if external services are temporarily down

## Security Considerations

1. **Never commit `.env` to version control** - It contains sensitive credentials
2. **Rotate API keys periodically** - For improved security
3. **Use the minimum required permissions** - Follow the principle of least privilege

---

For further assistance, refer to the official documentation for each service:
- [LinkedIn API Documentation](https://developer.linkedin.com/docs)
- [GitHub API Documentation](https://docs.github.com/en/rest)
- [Google Drive API Documentation](https://developers.google.com/drive/api/v3/about-sdk)
