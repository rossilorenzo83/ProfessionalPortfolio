# Deployment Guide for Portfolio Website

## Overview

This document outlines the steps required to deploy this professional portfolio website to a production environment. The portfolio integrates with LinkedIn, GitHub, and Google Drive APIs to showcase professional achievements, skills, and projects with real-time data synchronization.

## Prerequisites

- Node.js (v16+)
- PostgreSQL database
- GitHub account with Personal Access Token
- (Optional) LinkedIn Developer account
- (Optional) Google Cloud account with Drive API enabled

## Database Setup

1. Create a PostgreSQL database for the application
2. Configure environment variables as described in the Environment Configuration section
3. Run database setup using the provided script:

```bash
chmod +x ./scripts/setup-db.sh
./scripts/setup-db.sh
```

Alternatively, you can manually run the SQL migration:

```bash
psql -h YOUR_DB_HOST -U YOUR_DB_USER -d YOUR_DB_NAME -f ./drizzle/0000_lyrical_wild_pack.sql
```

## Environment Configuration

Create a `.env` file based on the provided `.env.example`:

### Database Configuration

```
DATABASE_URL=postgresql://username:password@hostname:port/database
PGHOST=hostname
PGUSER=database_user
PGPASSWORD=database_password
PGDATABASE=database_name
PGPORT=5432
```

### GitHub API Configuration

```
GITHUB_API_KEY=your_github_personal_access_token
GITHUB_USERNAME=your_github_username
```

### LinkedIn API Configuration (Optional)

```
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
LINKEDIN_REDIRECT_URI=your_linkedin_redirect_uri
LINKEDIN_ACCESS_TOKEN=your_linkedin_access_token
```

### Google Drive API Configuration (Optional)

```
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=your_google_redirect_uri
GOOGLE_REFRESH_TOKEN=your_google_refresh_token
```

### API Refresh Intervals

Configure how often data should be fetched from external APIs (in milliseconds):

```
GITHUB_REFRESH_INTERVAL=86400000
LINKEDIN_REFRESH_INTERVAL=86400000
GOOGLE_DRIVE_REFRESH_INTERVAL=86400000
```

### Server Configuration

```
PORT=5000
NODE_ENV=production
```

## Building for Production

1. Install dependencies

```bash
npm install
```

2. Build the frontend for production

```bash
npm run build
```

3. Start the production server

```bash
npm start
```

## Deploying with Docker (Optional)

A Dockerfile is provided for containerized deployment:

```bash
# Build the Docker image
docker build -t portfolio-website .

# Run the container
docker run -p 5000:5000 --env-file .env portfolio-website
```

## Continuous Integration/Deployment (CI/CD)

If you're using CI/CD platforms like GitHub Actions, GitLab CI, or Jenkins, the project includes example workflows in the `.github/workflows` directory.

## API Integration Notes

### GitHub Integration

1. Create a Personal Access Token at GitHub (Settings → Developer settings → Personal access tokens)
2. Grant it access to 'repo' (for repository stats) and 'read:user' (for profile info)

### LinkedIn Integration (Optional)

1. Create an application in the LinkedIn Developer Console
2. Configure the OAuth 2.0 settings and redirect URIs
3. Generate an access token or implement the OAuth flow

### Google Drive Integration (Optional)

1. Create a project in Google Cloud Console
2. Enable the Google Drive API
3. Configure OAuth consent screen and create OAuth credentials
4. Follow the OAuth 2.0 flow to obtain refresh token

## Fallback Data

The application includes a fallback mechanism for when API credentials are not provided or when API requests fail. The fallback uses simulated data to ensure the portfolio remains functional.

## Troubleshooting

- Database connection issues: Verify database credentials and connectivity
- API integration problems: Check API keys and credentials in your environment variables
- Server won't start: Ensure the PORT is not already in use

## Security Considerations

- Always keep your .env file secure and out of version control
- Regularly rotate API keys and tokens
- Consider using environment-specific configurations for development, staging, and production

## Performance Optimization

- The frontend uses React with code splitting for optimal loading
- API responses are cached to minimize external API calls
- Database queries are optimized with indexes

## Support and Maintenance

For questions or issues, please open a GitHub issue in the repository or contact the maintainer.
