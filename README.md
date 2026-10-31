# CAMPUSX

CAMPUSX is a campus resource-sharing marketplace demo. Students can discover institutional equipment and spaces, review eligibility details, and submit booking requests. Separate demo views illustrate resource-owner, facility-manager, and administrator workflows.

## Features

- Search and filter shared campus resources.
- Review availability, location, eligibility, and training requirements.
- Submit booking requests and review booking status.
- Explore resource-owner, manager, and administrator dashboards.
- View equipment history, incident reports, and example audit activity.
- Responsive React interface styled with Tailwind CSS 4.

## Demo Limitations

This repository contains a frontend prototype, not a production booking service. Data is seeded in the browser and is not saved to a backend. Sign-in is simulated: the demo accepts known sample emails and creates a temporary student for other emails; it does not authenticate passwords. The role switcher is for demonstration only. Do not use real credentials, personal information, or operational booking data.

## Requirements

- Node.js 22 or newer
- npm

## Run Locally

```bash
npm ci
npm run dev
```

Vite prints the local development URL after startup.

## Quality Checks

```bash
npm run lint
npm run build
npm run preview
```

The GitHub Actions workflow runs lint and build for pushes and pull requests targeting `main`.

## Deploy to Netlify

The repository includes `netlify.toml`. Netlify uses `npm run build`, publishes the `dist` directory, and routes app paths to `index.html` for the single-page application. Connect the GitHub repository to Netlify and deploy the `main` branch; no environment variables are required for this frontend demo.

## Technology

React 19, Vite 8, Tailwind CSS 4, Recharts, and Lucide icons.