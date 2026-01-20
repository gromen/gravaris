# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Gravaris is a professional services website for an excavation and earth-moving company (Polish market). Built with Astro 5 in SSR mode, deployed on Netlify with Netlify CMS for content management.

## Commands

```bash
npm run dev         # Start dev server at localhost:4321
npm run build       # Production build to ./dist/
npm run preview     # Preview production build locally
npm run netlify:dev # Run with Netlify CLI (for testing edge functions/middleware)
```

## Architecture

### Tech Stack

- **Framework**: Astro 5.16.9 (server output mode)
- **Styling**: Tailwind CSS 4 with custom theme
- **Deployment**: Netlify with edge middleware
- **CMS**: Netlify CMS for project content
- **Image Processing**: Sharp

### Key Directories

- `src/components/` - Astro components (Hero, Header, Footer, ServicesGrid, etc.)
- `src/config/site.ts` - Centralized site configuration (contact info, services list)
- `src/content/projects/` - Project markdown files managed by Netlify CMS
- `src/pages/projekty/[...slug].astro` - Dynamic project detail pages
- `src/styles/global.css` - Tailwind config with custom color theme
- `src/middleware.ts` - Maintenance mode redirect logic
- `public/admin/` - Netlify CMS admin interface and config

### Path Aliases (tsconfig.json)

Use `@` prefix for imports:

- `@/*` → `src/*` (catch-all)
- `@components/*`, `@config/*`, `@assets/*`, `@layouts/*`, `@styles/*`
- `@utils/*`, `@i18n/*`, `@js/*`, `@scripts/*`, `@src-types/*`, `@locales/*`

### Content Management

- Projects are created via `/admin` (Netlify CMS)
- Content stored as markdown in `src/content/projects/`
- Project file naming: `{{year}}-{{month}}-{{day}}-{{slug}}.md`
- Schema defined in `src/content.config.ts` using Zod (title, description, image, date)
- Project images: `public/images/projects/`, general uploads: `public/images/uploads/`

### Design System

Custom Tailwind theme colors in `global.css`:

- `--color-primary`: #FFC107 (yellow/gold)
- `--color-accent`: #E0A800 (darker yellow for hover)
- `--color-dark`: #0f0f0f (background)
- `--color-dark-card`: #141414 (card backgrounds)

### Maintenance Mode

Controlled via `MAINTENANCE_MODE` env variable. Bypass with `?access=true` query param.

## Language

accent`: #E0A800 (darker yellow for hover)

- `--color-dark`: #0f0f0f (background)
- `--color-dark-card`: #141414 (card backgrounds)

### Maintenance Mode

Controlled via `MAINTENANCE_MODE` env variable. Bypass with `?access=true` query param.

## Language

All UI text is in Polish.

## Plan Mode

- Make the plan extremely concise. Sacrifice grammar for the sake of concision.
- At the end of each plan, give me a list of unresolved questions to answer, if any.
