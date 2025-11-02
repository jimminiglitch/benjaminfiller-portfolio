# Benjamin Filler Portfolio - AI Coding Agent Instructions

## Project Overview

This is a **single-page Astro static portfolio** with bold cyberpunk aesthetics featuring custom animations, particle effects, and advanced CSS glassmorphism. Built with **Astro 5.14** and vanilla JavaScript—no React, Vue, or UI frameworks.

## Architecture

### Single-File Pattern
- **All content lives in `src/pages/index.astro`** (~1,890 lines)
- Frontmatter imports profile data and projects; rest is HTML/CSS/JS in one file
- No components, layouts, or utilities—intentionally monolithic for simplicity
- **Profile metadata** in `src/data/profile.ts` drives SEO, JSON-LD, and social links
- **Projects data** in `src/data/projects.ts` sourced from production Desktop OS

### Static Asset Organization
- **Profile images**: `public/images/BenjaminFiller*.png` (variants for A/B testing)
- **Project assets**: `public/images/DOGOFWAR.png`, `public/images/desktop/*.png`
- **No image optimization pipeline**—Astro serves directly from `/public`

### Visual Design Parallel
- `design/visual-editor.html` is a standalone copy of the portfolio for rapid visual iteration
- Does NOT share code with `index.astro`—manually sync changes when needed

## Syncing visual-editor.html ↔ index.astro

The visual editor is a **decoupled sandbox** for quick CSS/HTML experiments without Astro overhead.

### When to Use Each File
- **`visual-editor.html`**: Quick visual tweaks, color experiments, layout adjustments
- **`index.astro`**: Final implementation, SEO updates, profile data changes

### Sync Process (Manual - No Automation)
1. **CSS Changes**: Copy `<style>` blocks from visual-editor → Astro `<style>` section (lines ~100-1100)
2. **HTML Structure**: Copy `.skill-card` / `.project-card` markup from visual-editor → corresponding sections in Astro
3. **JavaScript**: Copy `<script>` content from visual-editor → Astro `<script>` section (lines ~1400-1773)

### Key Differences to Watch
- **Astro frontmatter**: `index.astro` has `---` imports at top (lines 1-40) — visual-editor lacks this
- **Profile data**: `index.astro` uses `{profile.title}` expressions — visual-editor uses hardcoded strings
- **Image paths**: Both use `/images/*` but Astro validates against `/public` at build time

### Quick Sync Checklist
```bash
# After editing visual-editor.html, test visually:
# 1. Open visual-editor.html in browser
# 2. Verify changes look correct
# 3. Copy changed sections to index.astro
# 4. Run: npm run dev
# 5. Test at localhost:4321
```

**⚠️ No automated sync—changes must be manually ported both directions**

## Future Architecture Plans

### Current Status: Intentional Monolith
- **No component breakup planned** — single-file pattern is a feature, not a bug
- Optimized for: fast edits, low cognitive overhead, minimal file navigation
- Trade-off: harder to reuse patterns across projects, but this is a single-page portfolio

### If Componentization Becomes Necessary
Should the site grow beyond a single page, follow this migration path:

```
src/
  components/
    Hero.astro           # Extract hero section
    SkillCard.astro      # Reusable skill card component
    ProjectCard.astro    # Reusable project card component
    ParticleCanvas.astro # Canvas particle system
  layouts/
    BaseLayout.astro     # Shared <head>, nav, footer
  pages/
    index.astro          # Import components here
    projects/[slug].astro # Future individual project pages
```

**Trigger for componentization**: Adding a second page (blog, case studies, etc.)

**Until then**: Keep monolith—premature abstraction adds complexity without benefit

## Content Update Guide (Non-Technical)

### Quick Reference: Where to Edit What

#### 1. Personal Info & SEO (Technical File)
**File**: `src/data/profile.ts`
```typescript
export const profile: Profile = {
  name: 'Benjamin Filler',
  title: 'Benjamin Filler - Creative Developer & Digital Artist',
  description: 'Detroit-based creative developer...',
  handles: {
    twitter: 'jimminiglitch',
    github: 'https://github.com/jimminiglitch',
  },
  ogImagePath: '/images/BenjaminFiller2.png',
}
```
- Line 18: Update `name` for copyright/attribution

#### 1a. Projects Data (NEW - Technical File)
**File**: `src/data/projects.ts`
**Source**: Derived from production Desktop OS (bbfiller.com)
```typescript
export const projects: Project[] = [
  {
    id: 'desktop-os',
    title: 'BBFiller Desktop OS',
    description: 'Browser-based operating system...',
    category: 'code',
    tags: ['Astro', 'React', 'TypeScript'],
    links: {
      live: 'https://bbfiller.com',
      github: 'https://github.com/jimminiglitch/bbfillerdesktop'
    },
    featured: true
  }
]
```
- **Update projects**: Edit individual project objects
- **Add projects**: Append new objects to the array
- **Categories**: 'film', 'code', 'art', 'music', 'interactive'
- **Featured flag**: Controls which projects show on homepage (currently 8 featured)
- **Links**: `live`, `demo`, `youtube`, `github` (all optional)
- **Thumbnails**: Path to image in `/public/images/`
- Line 19: Update `title` for browser tab text & SEO
- Line 20-22: Update `description` for Google search snippet
- Line 26-32: Update social handles (auto-generates links)
- Line 34: Change profile image (must exist in `/public/images/`)

#### 2. Hero Section (Main File)
**File**: `src/pages/index.astro`
- Lines **1160-1165**: Hero title (currently "BENJAMIN FILLER")
- Lines **1166-1170**: Hero subtitle (currently "Creative Developer...")
- Lines **1173-1179**: Call-to-action buttons

#### 3. About Section
**File**: `src/pages/index.astro`
- Lines **1185-1205**: Bio paragraphs (3 paragraphs currently)
- **Search for**: `<section id="about">` to locate quickly

#### 4. Skills Section
**File**: `src/pages/index.astro`
- Lines **1215-1305**: Six skill cards (Visual Art, Film, Sound, Tech, Learning, AI)
- Each card structure:
  ```astro
  <div class="skill-card reveal">
    <span class="skill-icon">🎨</span>            <!-- Emoji icon -->
    <h3 class="skill-title">Visual Art & Design</h3>
    <p class="skill-description">Creating composite...</p>
    <div class="skill-tags">
      <span class="skill-tag">Composites</span>   <!-- Technology tags -->
    </div>
  </div>
  ```

#### 5. Projects Section
**File**: `src/pages/index.astro`
- Lines **1312-1450**: Project cards (Desktop OS, Weight of Care, Birding with Brian, etc.)
- Each project structure:
  ```astro
  <div class="project-card reveal">
    <img src="/images/desktop/psychtoadglow.gif" alt="BBFiller Desktop OS" />
    <h3 class="project-title">Desktop OS</h3>
    <p class="project-description">Browser-based operating system...</p>
    <div class="project-tags">
      <span class="project-tag">Astro</span>
    </div>
    <div class="project-links">
      <a href="/desktop">View Demo →</a>
    </div>
  </div>
  ```

#### 6. Contact Links
**File**: `src/pages/index.astro`
- Lines **1455-1470**: Contact section links (Twitter, GitHub, Email)

### Content Update Workflow
```bash
# 1. Edit content in index.astro
# 2. Save file (Ctrl+S)
# 3. Dev server auto-reloads (if running npm run dev)
# 4. Preview changes at localhost:4321
# 5. Commit changes: git add . && git commit -m "Update projects"
# 6. Deploy: git push (Vercel auto-deploys from master branch)
```

### Adding New Projects (Step-by-Step)
**NEW WORKFLOW (Data-Driven)**:
1. Add project data to `src/data/projects.ts`
   ```typescript
   {
     id: 'my-new-project',
     title: 'My Amazing Project',
     description: 'What this project does...',
     category: 'code', // or 'film', 'art', 'music', 'interactive'
     tags: ['Tech1', 'Tech2', 'Tech3'],
     links: {
       live: 'https://project.com',
       github: 'https://github.com/you/project',
       youtube: 'https://youtube.com/watch?v=...'
     },
     thumbnail: '/images/project-thumb.png',
     featured: true // Shows on homepage
   }
   ```
2. Add project image to `public/images/` (optimized PNG/GIF/WEBP)
3. Save files and test with `npm run dev`
4. Projects auto-render from data file

**OLD WORKFLOW (Hardcoded - Deprecated)**:
1. Directly edit project cards in `index.astro` lines 1370-1510
2. Not recommended—use data file instead for consistency with Desktop OS

## Testing & Deployment

### Current State: No Formal Testing
- **No unit tests** — vanilla JS doesn't have test coverage
- **No integration tests** — single-page site tested manually
- **No CI pipeline** — Vercel handles build validation

### Manual Testing Checklist (Before Deploy)
```bash
# 1. Build locally
npm run build

# 2. Preview production build
npm run preview
# Opens at http://localhost:4321

# 3. Test checklist:
# ✓ All sections scroll correctly (#about, #skills, #projects, #contact)
# ✓ Custom cursor works on desktop (disabled on mobile)
# ✓ Particle animation renders
# ✓ All images load (check /public/images/*)
# ✓ External links open in new tabs
# ✓ Mobile responsive (test at 375px, 768px, 1440px)
# ✓ Reduced motion preference respected (System Preferences → Accessibility)
```

### Deployment Pipeline (Vercel)
**Automatic deployment on push to `master`**:
1. Push to GitHub: `git push origin master`
2. Vercel detects commit via webhook
3. Runs `npm run build` (via `vercel.json` config)
4. Deploys `dist/` folder to CDN
5. Available at production URL (~30-60 seconds)

**No staging environment** — test locally with `npm run preview` before pushing

### Environment Variables (Vercel Dashboard)
- `PUBLIC_SITE_URL`: Set to `https://benjaminfiller.com` (or your domain)
  - Used for canonical URLs and Open Graph images
  - Auto-set by Vercel but can be overridden

### Monitoring & Errors
- **Build failures**: Check Vercel dashboard → Deployments → Build Logs
- **Runtime errors**: Open browser DevTools → Console (F12)
- **Lighthouse audits**: Run in Chrome DevTools → Lighthouse tab
  - Target: 90+ Performance, 100 Accessibility, 100 Best Practices

### Adding CI/CD (If Needed in Future)
If project grows, consider:
- **GitHub Actions**: Run Lighthouse CI on PRs
- **Playwright**: E2E tests for critical user flows
- **Staging environment**: Vercel preview deployments (already automatic on PRs)

**Current rationale for no CI**: Static site with no backend = low failure risk

## Key Development Patterns

### CSS-in-Astro Conventions
```astro
<style>
  :root {
    --cyan: #00ffff;
    --magenta: #ff00ff;
    --purple: #8b5cf6;
    --font-main: 'Space Grotesk', sans-serif;
    --font-display: 'Archivo Black', sans-serif;
  }
</style>
```
- **All styles scoped in `<style>` block**—no external CSS files
- Custom properties define color palette and typography
- Heavy use of `backdrop-filter`, `mix-blend-mode`, and layered gradients

### JavaScript Patterns
```javascript
// Configuration object for easy tuning
const CONFIG = {
  PARTICLE_COUNT: 50,
  CONNECTION_DISTANCE: 150,
  TILT_DIVISOR: 15,
  MAGNETIC_MULTIPLIER: 0.15
};
```
- **TypeScript-flavored vanilla JS** inside `<script>` tags
- Feature detection for desktop-only effects (custom cursor, tilt, magnetic nav)
- Respects `prefers-reduced-motion` for accessibility

### Profile Data Structure
**Edit `src/data/profile.ts` to update:**
- `profile.title` / `profile.description` → Meta tags & JSON-LD
- `profile.handles` → Social links (auto-formats GitHub/Twitter URLs)
- `profile.ogImagePath` → Points to image in `/public`
- `resolvedSiteUrl` pulls from `PUBLIC_SITE_URL` env var (Vercel automatic)

## Development Workflow

### Commands (via npm scripts)
```bash
npm run dev      # Start dev server (localhost:4321)
npm run build    # Generate static site to dist/
npm run preview  # Preview production build locally
```
- **No test suite, linting, or type-checking configured**
- Astro handles TypeScript in `.ts` files automatically

### Deployment (Vercel)
- `vercel.json` specifies `"framework": "astro"` for auto-detection
- Output: `static` mode (pre-rendered HTML)
- `@astrojs/vercel` adapter used but output is fully static
- **Env variable**: Set `PUBLIC_SITE_URL` in Vercel for correct canonical/OG URLs

## Common Modifications

### Adding a Project
Edit the `<section id="projects">` in `index.astro`:
```astro
<div class="project-card reveal">
  <img src="/images/your-project.png" alt="Project Name" class="project-image" />
  <div class="project-content">
    <h3 class="project-title">Project Name</h3>
    <p class="project-description">Description...</p>
    <div class="project-tags">
      <span class="project-tag">Tag 1</span>
    </div>
  </div>
</div>
```

### Updating Skills
Modify the `.skills-grid` section—each card has:
- `.skill-icon` (emoji or SVG)
- `.skill-title` (bold heading)
- `.skill-description` (gray text)

### Changing Colors
Update CSS custom properties in `:root` block:
```css
--cyan: #00ffff;      /* Primary accent */
--magenta: #ff00ff;   /* Secondary accent */
--purple: #8b5cf6;    /* Tertiary accent */
```

### Adjusting Animations
Tune `CONFIG` object values (particle density, tilt sensitivity, etc.)
- Particle effects canvas-rendered in `animate()` function
- Custom cursor disabled on touch/mobile via `enableDesktopInteractions` check

## SEO & Metadata

**JSON-LD structured data** built from `profile.ts`:
- Uses `resolvedSiteUrl` (env-driven) for absolute URLs
- `sameAs` array auto-generated from social handles
- Open Graph image path: `profile.ogImagePath`

**Critical for correct metadata**:
1. Set `PUBLIC_SITE_URL=https://yoursite.com` in Vercel env
2. Ensure `ogImagePath` points to valid image in `/public`
3. Update `profile.description` for accurate SEO snippet

## Gotchas & Constraints

- **No build-time image optimization**—manually optimize before adding to `/public`
- **Single route app**—all sections are hash anchors (`#about`, `#projects`, etc.)
- **Monolithic file**—full context searches may be slow; use line ranges
- **No dark mode toggle**—always dark theme
- **Desktop-first interactions**—custom cursor and 3D effects skip mobile entirely
- **Font loading**—Google Fonts preconnected but not self-hosted (potential GDPR concern)

## Performance Notes

- Film grain noise SVG animates via `@keyframes` (10 steps)
- Particle canvas uses `requestAnimationFrame` loop
- Scroll reveal uses `IntersectionObserver` (threshold: 0.1)
- Debounced resize handler (250ms delay)

## Next Level: Comprehensive Enhancement Roadmap

### Phase 1: Quick Wins (Week 1-2)
**Goal**: Performance + filtering + self-hosted fonts

#### 1.1 Self-Host Fonts
```bash
# Download fonts to public/fonts/
# Update <head> to use local files instead of Google Fonts
# Benefits: GDPR compliance, faster load, offline capability
```
**Files to modify**:
- `src/pages/index.astro` (lines 85-89): Replace Google Fonts with local
- Create `public/fonts/` directory
- Add `@font-face` declarations in CSS

#### 1.2 Project Filtering
```astro
<!-- Add filter buttons above projects grid -->
<div class="project-filters">
  <button data-filter="all">All</button>
  <button data-filter="code">Code</button>
  <button data-filter="film">Film</button>
  <button data-filter="art">Art</button>
</div>
```
**Implementation**:
- Add `data-category` to each project card
- JavaScript filter function in `<script>` section
- Animated transitions with FLIP technique

#### 1.3 Image Optimization
```bash
npm install @astrojs/image sharp
```
**Files to modify**:
- `astro.config.mjs`: Add image integration
- Convert all images to WebP/AVIF with fallbacks
- Add proper `srcset` for responsive images

### Phase 2: Content Architecture (Week 3-4)
**Goal**: Blog + case studies + dynamic routing

#### 2.1 Blog System
```
src/
  content/
    config.ts           # Content collections schema
    blog/
      post-1.md
      post-2.md
      post-3.md
  pages/
    blog/
      index.astro       # Blog listing page
      [slug].astro      # Individual blog post
```

**Initial 3 Posts**:
1. "Building a Browser OS in Under 500ms" (Desktop OS technical deep dive)
2. "Cyberpunk UI: Canvas Particles & Glassmorphism" (Design breakdown)
3. "Directing Docs as a Developer: My Hybrid Process" (Career journey)

**Schema**:
```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    author: z.string(),
    tags: z.array(z.string()),
    image: z.string().optional(),
  }),
});

export const collections = { blog: blogCollection };
```

#### 2.2 Case Study Pages
```
src/
  pages/
    projects/
      [slug].astro      # Dynamic project pages
  data/
    projects.ts         # Project data with full content
```

**Each case study includes**:
- Hero image/video
- Problem statement
- Solution/approach
- Tech stack breakdown
- Outcomes/metrics
- Process images/screenshots
- Related projects
- Call-to-action

**Priority case studies**:
1. Desktop OS (most technical)
2. The Weight of Care (most artistic)
3. Birding with Brian (hybrid)

#### 2.3 RSS Feed
```bash
npm install @astrojs/rss
```
```typescript
// src/pages/rss.xml.js
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const blog = await getCollection('blog');
  return rss({
    title: 'Benjamin Filler | Blog',
    description: 'Creative developer, filmmaker, artist',
    site: context.site,
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      link: `/blog/${post.slug}/`,
    })),
  });
}
```

### Phase 3: Interactive Features (Week 5-6)
**Goal**: Live demos, video embeds, engagement

#### 3.1 Embed Live Demos
```astro
<!-- Desktop OS project card -->
<div class="project-demo">
  <iframe 
    src="/desktop" 
    title="Desktop OS Demo"
    loading="lazy"
  ></iframe>
</div>
```

#### 3.2 Video Embeds
```bash
npm install @astro-community/astro-embed-youtube @astro-community/astro-embed-vimeo
```
```astro
---
import { Vimeo } from '@astro-community/astro-embed-vimeo';
---
<Vimeo id="your-video-id" />
```

#### 3.3 Contact Form
```astro
<!-- Use Web3Forms (free, no backend needed) -->
<form action="https://api.web3forms.com/submit" method="POST">
  <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY">
  <input type="text" name="name" required>
  <input type="email" name="email" required>
  <textarea name="message" required></textarea>
  <button type="submit">Send Message</button>
</form>
```

### Phase 4: Advanced Animations (Week 7)
**Goal**: GSAP scroll-driven effects

#### 4.1 Install GSAP
```bash
npm install gsap
```

#### 4.2 Implement ScrollTrigger
```javascript
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Parallax hero
gsap.to('.hero-title', {
  scrollTrigger: {
    trigger: '.hero',
    scrub: true,
  },
  y: 300,
  opacity: 0.5,
});

// Project card reveals
gsap.from('.project-card', {
  scrollTrigger: {
    trigger: '.projects-grid',
    start: 'top 80%',
  },
  y: 100,
  opacity: 0,
  stagger: 0.2,
  duration: 1,
});
```

#### 4.3 Page Transitions
```javascript
// Astro View Transitions
---
import { ViewTransitions } from 'astro:transitions';
---
<head>
  <ViewTransitions />
</head>
```

### Phase 5: Lab & Experiments (Week 8)
**Goal**: Creative playground section

#### 5.1 Lab Structure
```
src/
  pages/
    lab/
      index.astro       # Lab landing page
      [experiment].astro # Individual experiments
  data/
    experiments.ts      # Experiment metadata
```

**Experiment Ideas**:
- Particle playground (visitors adjust CONFIG)
- Generative art canvas
- WebGL shader experiments (Three.js)
- AI art gallery
- Interactive music visualizer
- Glitch text generator

#### 5.2 Navigation Update
```astro
<nav class="nav">
  <a href="/">Portfolio</a>
  <a href="/blog">Blog</a>
  <a href="/lab">Lab</a>
  <a href="#contact">Contact</a>
</nav>
```

### Phase 6: Analytics & Newsletter (Week 9)
**Goal**: Data-driven optimization + audience building

#### 6.1 Privacy-Friendly Analytics
```bash
# Option 1: Plausible (paid but beautiful)
# Add script in <head>
<script defer data-domain="benjaminfiller.com" 
  src="https://plausible.io/js/script.js"></script>

# Option 2: Vercel Analytics (free tier)
npm install @vercel/analytics
```

```astro
---
import { Analytics } from '@vercel/analytics/astro';
---
<Analytics />
```

#### 6.2 Email Newsletter (Buttondown)
```astro
<!-- Signup form -->
<form
  action="https://buttondown.email/api/emails/embed-subscribe/benjaminfiller"
  method="post"
  target="popupwindow"
>
  <input type="email" name="email" placeholder="your@email.com" />
  <button type="submit">Subscribe</button>
</form>
```

**Placement**:
- Footer of every page
- Blog post endings
- Lab experiments page

### Phase 7: SEO Strategy (Ongoing)
**Goal**: Organic traffic growth

#### 7.1 Technical SEO
```astro
---
// Each page gets proper meta
const seo = {
  title: 'Page Title | Benjamin Filler',
  description: 'Unique description under 160 chars',
  canonical: `${resolvedSiteUrl}/page`,
  ogImage: '/images/og/page.png',
};
---
```

#### 7.2 Content Strategy
**Blog posting cadence**: Bi-weekly (26 posts/year)

**Topic clusters**:
- **Web Performance**: Canvas optimization, Astro tips, loading strategies
- **Creative Coding**: Particle systems, animations, WebGL
- **Film/Storytelling**: Documentary techniques, visual storytelling
- **Hybrid Work**: Developer + artist mindset

**Long-tail keywords**:
- "browser-based operating system tutorial"
- "astro particle animation"
- "cyberpunk portfolio design"
- "documentary filmmaker developer"

#### 7.3 Internal Linking
- Blog posts link to relevant projects
- Case studies link to related blog posts
- Lab experiments link to technical breakdowns

---

## Implementation Order: Dependency Chain

```
Week 1-2: Foundation (fonts, images, filtering)
  ↓
Week 3-4: Content (blog, case studies, RSS)
  ↓
Week 5-6: Interactive (demos, videos, forms)
  ↓
Week 7: Animation (GSAP, transitions)
  ↓
Week 8: Lab (experiments section)
  ↓
Week 9: Growth (analytics, newsletter)
  ↓
Ongoing: SEO & content creation
```

---

## Updated Project Structure

```
benjaminfiller-portfolio/
├── src/
│   ├── components/           # NEW: Break monolith gradually
│   │   ├── BlogCard.astro
│   │   ├── ProjectCard.astro
│   │   ├── ExperimentCard.astro
│   │   └── NewsletterSignup.astro
│   ├── content/              # NEW: Content collections
│   │   ├── config.ts
│   │   ├── blog/
│   │   └── experiments/
│   ├── data/
│   │   ├── profile.ts
│   │   ├── projects.ts       # NEW: Expanded project data
│   │   └── experiments.ts    # NEW: Lab experiments
│   ├── layouts/              # NEW: Shared layouts
│   │   ├── BaseLayout.astro
│   │   ├── BlogLayout.astro
│   │   └── ProjectLayout.astro
│   └── pages/
│       ├── index.astro       # Homepage
│       ├── blog/
│       │   ├── index.astro
│       │   └── [slug].astro
│       ├── projects/
│       │   └── [slug].astro
│       ├── lab/
│       │   ├── index.astro
│       │   └── [experiment].astro
│       ├── rss.xml.js
│       └── 404.astro
├── public/
│   ├── fonts/                # NEW: Self-hosted fonts
│   ├── images/
│   │   └── og/               # NEW: Open Graph images
│   └── robots.txt
└── design/
    └── visual-editor.html
```

---

## Key Dependencies to Add

```json
{
  "dependencies": {
    "@astrojs/image": "^0.18.0",
    "@astrojs/rss": "^4.0.0",
    "@astrojs/sitemap": "^3.0.0",
    "@vercel/analytics": "^1.1.0",
    "gsap": "^3.12.0",
    "sharp": "^0.33.0"
  }
}
```

---

## Migration Strategy: Componentization

**Trigger met**: Adding blog/lab pages means we need components!

**Gradual approach**:
1. Week 3: Extract `<ProjectCard>` component (reuse in index + projects page)
2. Week 4: Extract `<BlogCard>` component
3. Week 5: Extract `<BaseLayout>` (shared `<head>`, nav, footer)
4. Keep `index.astro` mostly intact (don't break what works)

**New convention**:
- Components are for **reusable UI elements**
- Layouts are for **page structure**
- Pages are for **content & routing**

---

## When in Doubt

1. Check `src/data/profile.ts` for content/metadata changes
2. Search `index.astro` for section IDs (`#about`, `#skills`, `#projects`, `#contact`)
3. Grep for CSS custom properties (`--cyan`, `--font-main`) to trace theme usage
4. Test locally with `npm run dev` before deploying
5. **NEW**: Check this roadmap for implementation order and dependencies
