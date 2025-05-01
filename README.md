# Professional Portfolio Website

A modern, responsive portfolio website that automatically integrates with LinkedIn, GitHub, and Google Drive to showcase your professional information, code projects, and CV.

## Features

- **LinkedIn Integration**: Automatically pulls your professional profile information
- **GitHub Integration**: Displays repository stats, languages, and contributions
- **Google Drive Integration**: Retrieves and serves your latest CV/Resume
- **Responsive Design**: Works on all devices (mobile, tablet, desktop)
- **Dark Mode**: Toggle between light and dark themes
- **Progressive Web App**: Installable on devices with offline capabilities
- **Contact Form**: Allow visitors to send you messages directly

## Technologies Used

- **Frontend**: React with TypeScript, TailwindCSS, ShadcnUI
- **Backend**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **APIs**: LinkedIn API, GitHub API, Google Drive API

## Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL database

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/portfolio-website.git
   cd portfolio-website
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env
   # Edit .env with your database and API credentials
   ```

4. Initialize the database
   ```bash
   npm run db:push
   npm run db:seed
   ```

5. Start the development server
   ```bash
   npm run dev
   ```

6. Open your browser to http://localhost:5000

## External API Integration

This portfolio website can integrate with external services to automatically pull your professional data. See [API Integration Guide](docs/API_INTEGRATION.md) for detailed setup instructions.

### API Configuration

All API credentials are stored as environment variables. When deploying, make sure to set these variables accordingly.

## Deploy to Production

1. Build the project
   ```bash
   npm run build
   ```

2. Start the production server
   ```bash
   npm start
   ```

## Customization

### Styling

The site uses TailwindCSS and ShadcnUI components. You can customize the styling by:

1. Editing the `tailwind.config.ts` file to update colors and theme
2. Modifying component styles in the `client/src/components` directory

### Content

Initial content is seeded in `db/seed.ts`. You can update this file to reflect your information before running the seed command.

## Project Structure

```
├── client/             # Frontend React application
│   ├── public/         # Static assets and PWA files
│   └── src/            # React source code
├── db/                 # Database configuration and seed data
├── server/             # Express backend API
│   ├── api/            # External API integrations
│   ├── services/       # Business logic services
│   └── routes.ts       # API route definitions
├── shared/             # Shared types and schemas
└── docs/               # Documentation
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
