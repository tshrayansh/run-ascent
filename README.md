# ASCENT

Static website for ASCENT, a voluntary student-led running community around IISER Thiruvananthapuram / Vithura, Kerala.

## Local Setup

```bash
npm install
npm run dev
```

Build the production site:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Editable Content

Most weekly content is in `src/data/site.js`:

- next run ticker
- community links
- weekly event cards
- route library
- Club Pulse placeholder stats
- consistency board
- gallery placeholder labels

Replace the placeholder WhatsApp, Instagram, and Strava links before launch.

## GitHub Pages Deployment

This site uses Vite and React Router. It includes `404.html` so direct visits to `/routes`, `/pulse`, and `/join` can fall back to the React app on GitHub Pages.

For a user or organization page served at the domain root:

```bash
npm run build
```

For a project page served from a repository path, build with a base path:

```bash
VITE_BASE_PATH=/your-repo-name/ npm run build
```

Then deploy the generated `dist` folder through GitHub Pages. If you use GitHub Actions, set the same `VITE_BASE_PATH` value during the build step.

## Images

Version 1 intentionally avoids external stock photography. Add real ASCENT photos later under `public/images`, then wire them into the React components or the local data file.
