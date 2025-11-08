# Portfolio Links Guide

This document explains every link in the Benjamin Filler portfolio and where they lead.

## Navigation Links

### Header Navigation

- **About** (`#about`) - Scrolls to the About section on the homepage
- **Skills** (`#skills`) - Scrolls to the Skills section showcasing your abilities
- **Projects** (`#projects`) - Scrolls to the Projects section with featured work
- **Contact** (`#contact`) - Scrolls to the Contact section at the bottom

## Hero Section Links

### Call-to-Action Buttons

- **View Projects** (`#projects`) - Jumps directly to your portfolio projects
- **Let's Collaborate** (`#contact`) - Takes visitors to your contact options

## Project Links

Each project card may contain up to 4 different link types:

### Desktop OS

- **View Demo** (`/desktop`) - Opens the live Desktop OS application on your site
- **GitHub** (`https://github.com/jimminiglitch/bbfillerdesktop`) - Source code repository

### The Weight of Care

- **Watch** (`https://vimeo.com/1029675569`) - Vimeo video of the documentary
- **YouTube** (`https://www.youtube.com/watch?v=Kp-qxAbYwf4`) - YouTube version of the film

### Birding with Brian

- **Watch** (`https://vimeo.com/1029676041`) - Vimeo video of the series
- **YouTube** (`https://www.youtube.com/watch?v=dQw4w9WgXcQ`) - YouTube version

### Bully Boy

- **Watch** (`https://vimeo.com/1029679031`) - Vimeo video of the film

### The Eternal Void

- **Watch** (`https://vimeo.com/1029677652`) - Vimeo video of the project

### Glitch Art Series

- **View Live** (`https://example.com/glitch-art`) - Live gallery (placeholder URL)

### Ambient Music Collection

- **View Live** (`https://soundcloud.com/example`) - SoundCloud profile (placeholder URL)

### Interactive Story Engine

- **View Demo** (`/interactive-story`) - Demo on your site
- **GitHub** (`https://github.com/jimminiglitch/interactive-story`) - Source code (placeholder)

## Contact Section Links

### Contact Cards

- **Email** (`/contact`) - Goes to your contact page (to be created)
- **GitHub** (`https://github.com/jimminiglitch`) - Your GitHub profile
- **Desktop** (`/desktop`) - Opens the Desktop OS experience

## Footer Links

### Footer Navigation

- **Astro** (`https://astro.build`) - Opens Astro framework website in new tab
- **Desktop OS** (`/desktop`) - Same as Desktop contact link
- **GitHub** (`https://github.com/jimminiglitch/bbfillerdesktop`) - Desktop OS repository

## Social Media Links

### Configured in profile.ts

These are generated from your profile data but may appear in various places:

- **Twitter/X**: `@jimminiglitch` → `https://twitter.com/jimminiglitch`
- **GitHub**: `jimminiglitch` → `https://github.com/jimminiglitch`

## Internal Routes

### Application Routes

- `/` - Homepage (main portfolio)
- `/desktop` - Desktop OS application
- `/contact` - Contact page (needs to be created)

## External vs Internal Links

### Internal Links (Same Site)

- Start with `/` or `#`
- Examples: `/desktop`, `#projects`, `/contact`
- Open in the same tab/window

### External Links (Other Sites)

- Full URLs starting with `https://`
- Examples: `https://vimeo.com/...`, `https://github.com/...`
- Open in new tab with `target="_blank"`
- Include `rel="noopener noreferrer"` for security

## Link Behavior

### Smooth Scroll Links

All hash links (`#about`, `#skills`, etc.) use **Lenis smooth scroll** with:

- 1.2 second duration
- Custom easing curve
- Smooth deceleration

### Project Filter Links

Filter buttons are **not** actual links, they're JavaScript-powered buttons:

- `data-filter="all"` - Shows all projects
- `data-filter="code"` - Shows only code projects
- `data-filter="film"` - Shows only film projects
- `data-filter="art"` - Shows only art projects
- `data-filter="music"` - Shows only music projects
- `data-filter="interactive"` - Shows only interactive projects

## Missing Links / To Be Created

These links currently exist but need pages/content:

1. **`/contact`** - Contact page needs to be created
2. **`/interactive-story`** - Interactive story demo route
3. **Glitch Art Live URL** - Currently placeholder
4. **Ambient Music Collection** - Currently placeholder SoundCloud URL

## Link Management

### Where Links Are Defined

1. **Project Links**: Defined in `src/data/projects.ts`

   ```typescript
   links: {
     live: 'https://...',
     demo: '/demo-path',
     youtube: 'https://youtube.com/...',
     github: 'https://github.com/...'
   }
   ```

2. **Navigation Links**: Hardcoded in `src/pages/index.astro` (lines ~1296-1304)

3. **Social Links**: Generated from `src/data/profile.ts` handles object

### How to Update Links

1. **Change a project link**: Edit `src/data/projects.ts`
2. **Change navigation**: Edit the `<nav>` section in `src/pages/index.astro`
3. **Change social media**: Edit `profile.handles` in `src/data/profile.ts`
4. **Change contact links**: Edit the contact section in `src/pages/index.astro`

## SEO & Canonical Links

### Meta Tags

- **Canonical URL**: Points to your main site URL (from `PUBLIC_SITE_URL` env var)
- **Open Graph URL**: Same as canonical, for social media sharing
- **Twitter URL**: Same as canonical


These are auto-generated from your profile data and environment variables.
