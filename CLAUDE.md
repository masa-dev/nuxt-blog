# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This repository contains **two separate blog implementations**:
- **Legacy Nuxt.js app** (`/nuxt-app/`) - Vue 2 + Bootstrap 4 + TypeScript class components
- **Current Astro app** (`/astro-blog/`) - Astro + React + Bootstrap 5 + TypeScript

Both use the same Newt CMS backend and share similar content structures. The Astro implementation is actively developed based on docker-compose configuration.

**Live Site:** https://masa-dev.net  
**Dev Site:** https://gh-pages-dev.masa-dev.net

## Development Commands

### Astro App (Primary)
```bash
npm run dev          # Development server with --host
npm run build        # Build + Pagefind search indexing  
npm run preview      # Preview production build
npm run format       # Prettier formatting
```

### Nuxt App (Legacy)
```bash
npm run dev          # Development server
npm run build        # Production build
npm run generate     # Static generation
npm run test         # Jest tests
npm run lint         # ESLint + Prettier
npm run lintfix      # Auto-fix linting
```

### Docker Development
```bash
docker-compose up    # Full development environment with nginx proxy
```

## Content Management System

Both implementations use **Newt CMS** (https://www.newt.so/):
- **Content Types:** Posts (blog articles) and Notes (shorter content)
- **Format:** Markdown with metadata (title, slug, description, tags, author)
- **API:** RESTful with Bearer token authentication
- **Environment Variables:** NEWT_TOKEN, NEWT_API_URL required

## Architecture Patterns

### Shared TypeScript Types
Both apps use similar interfaces for:
- `Post` and `Note` content structures
- API response pagination (`items[]`, `total`, `limit`, `skip`)
- Author and tag metadata

### Component Structure
- **Posts/Notes Lists:** Paginated content displays with thumbnails
- **Individual Content Pages:** Full article/note rendering with code highlighting
- **Code Copy Feature:** Recently implemented for code blocks in content

### API Integration
- Axios-based API clients with TypeScript interfaces
- Query parameter utilities for pagination and filtering
- Error handling with proper type validation

### Styling Approach
- Bootstrap framework (v4 for Nuxt, v5 for Astro)
- SCSS preprocessing with custom variables
- Code highlighting: Prism.js (Nuxt) or Shiki (Astro)
- Responsive design with custom breakpoints

## Configuration Files

### `/astro-blog/astro.config.mjs`
- MDX and React integration
- SCSS preprocessing
- Sitemap generation

### `/nuxt-app/nuxt.config.ts`  
- Static generation with dynamic routes
- Bootstrap Vue configuration
- Google Analytics/AdSense integration
- Custom webpack config for htmlparser2/cheerio compatibility

### `/nuxt-app/blog.config.ts`
- Pagination limits (10 posts, 20 notes per page)
- Social media links and site metadata

## Recent Development Notes

Based on git history, recent work includes:
- Code copy functionality for syntax-highlighted blocks
- Bug fixes for Note page code copying
- URL trailing slash configuration
- Docker environment improvements

## Deployment

- **Hosting:** Firebase Hosting for production
- **Static Generation:** Both frameworks generate static files
- **SEO:** Comprehensive meta tags, sitemaps, canonical URLs