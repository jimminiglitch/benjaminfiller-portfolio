---
title: 'Building a Browser OS in Under 500ms'
description: 'How I architected a fully functional desktop operating system for the web using Astro, React, and aggressive performance optimization, loading in under half a second.'
pubDate: 2025-11-11
tags: ['performance', 'astro', 'react', 'web-development', 'optimization']
minutesRead: 12
draft: true
---

When I set out to build [BBFiller Desktop OS](https://bbfiller.com), I had one non-negotiable goal: it had to feel *instant*. Not "fast for a web app," actually instant. Sub-500ms to first interaction on 4G (Pixel 6), INP < 200ms, CLS 0.00.

This meant rethinking everything I knew about web architecture. Here's how I did it.

## The Challenge: Simulating an OS Without the Bloat

Desktop operating systems are inherently complex: window management, file systems, application lifecycles, inter-process communication. Recreating this in a browser typically means shipping hundreds of kilobytes of JavaScript and accepting multi-second load times.

I refused to accept that trade-off.

**Target metrics:**
- **LCP**: 0.8-1.1s (4G, 4× CPU throttle)
- **INP**: < 200ms
- **CLS**: 0.00
- **Total JS on first paint**: ~18kb (brotli), post-idle preloads: +90-120kb cached

Spoiler: I hit all of them.

## Architecture Decision #1: Astro for the Shell

The key insight was recognizing that **most of an OS is static**. The desktop background, taskbar, system chrome: these don't need React. They need HTML and CSS.

### Why Astro Won

**Zero JavaScript by default.** Astro's islands architecture meant I could ship a fully rendered desktop shell with *no client-side JS* for the static parts:

```astro
---
// Desktop.astro - The OS shell
import Taskbar from '../components/Taskbar.astro';
import Wallpaper from '../components/Wallpaper.astro';
---

<div class="desktop-container">
  <Wallpaper />
  <Taskbar />
  <!-- Islands load only when needed -->
  <slot />
</div>

<style>
  .desktop-container {
    position: fixed;
    inset: 0;
    background: #000;
  }
</style>
```

The entire desktop chrome weighs **4kb of HTML** and **12kb of CSS**. No JavaScript on first paint. Interactivity hydrates later.

### The Islands Strategy

Only interactive elements become React islands:

- **Window Manager**: Dragging, resizing, z-index management → React
- **Terminal**: Text input, command execution → React  
- **File Explorer**: Tree navigation, file operations → React
- **Applications**: Games, utilities, media players → React

Each island hydrates independently, on-demand. If you never open the terminal, its JavaScript never downloads.

## Architecture Decision #2: Aggressive Code Splitting

React apps typically bundle everything into one giant `main.js`. I did the opposite.

### Application-Level Chunking

Each desktop application is its own async chunk:

```typescript
// AppRegistry.tsx
const apps = {
  terminal: () => import('./apps/Terminal'),
  explorer: () => import('./apps/FileExplorer'),
  browser: () => import('./apps/Browser'),
  game: () => import('./apps/DogOfWar'),
  // ... 12 more apps
};

// Only load when user clicks the icon
const launchApp = async (appId: string) => {
  const App = await apps[appId]();
  return <App />;
};
```

**Result**: Initial page load downloads *zero* application code. The Terminal app (28kb) only loads when you click the Terminal icon. The game (45kb) only loads when you launch it.

### Shared Dependencies, Preloaded

Common utilities (window state, file system API, drag handlers) are bundled separately and preloaded with priority hints:

```html
<link rel="modulepreload" href="/chunks/window-manager.js">
<link rel="modulepreload" href="/chunks/filesystem.js">
<link rel="preload" as="script" href="/chunks/first-island.js" fetchpriority="high">
```

These download during idle time after initial render, so they're cached before the user needs them. Note: lots of tiny chunks can cause request waterfalls. I rely on HTTP/2 multiplexing and careful dependency ordering to avoid this.

## Performance Optimization #1: Canvas-Based Rendering

Here's where things get spicy. Traditional DOM-based window management is *slow*. Every drag operation triggers layout recalculations. I needed something faster.

### Windows as Canvas Layers

Instead of div-based windows, I render window *chrome* (title bars, borders) to a single canvas element:

```typescript
// WindowCanvas.tsx
const renderWindowChrome = (ctx: CanvasRenderingContext2D, windows: Window[]) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  windows.forEach(win => {
    // Draw title bar
    ctx.fillStyle = 'rgba(0, 255, 255, 0.1)';
    ctx.fillRect(win.x, win.y, win.width, 32);
    
    // Draw border with glow
    ctx.strokeStyle = 'cyan';
    ctx.shadowBlur = 10;
    ctx.strokeRect(win.x, win.y, win.width, win.height);
    
    // Draw title text
    ctx.fillStyle = '#fff';
    ctx.font = '14px Space Grotesk';
    ctx.fillText(win.title, win.x + 12, win.y + 20);
  });
};
```

Window *content* (the actual application) remains a DOM element positioned absolutely, but all the visual chrome is canvas-drawn.

**Why this is fast:**
- Canvas updates don't trigger layout reflows
- GPU-accelerated rendering via single composited layer
- Batched draws each frame instead of hundreds of DOM mutations
- Pointer events handled outside layout, updates scheduled on requestAnimationFrame

**Performance gain**: Window dragging went from 30fps to 60fps, even with 10+ windows open.

### Particle System on the Same Canvas

The desktop background has ~50 animated particles (those cyan dots). Instead of 50 DOM elements, I render them on the same canvas layer:

```typescript
const particles: Particle[] = Array(50).fill(null).map(() => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  vx: (Math.random() - 0.5) * 0.5,
  vy: (Math.random() - 0.5) * 0.5,
}));

const animateParticles = () => {
  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    // Wrap around screen edges
    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
  });
  
  renderWindowChrome(ctx, windows);
  renderParticles(ctx, particles);
  requestAnimationFrame(animateParticles);
};
```

**Total performance cost**: ~2ms per frame. Negligible.

## Performance Optimization #2: Virtual File System in IndexedDB

The file system needed to be fast. LocalStorage is synchronous and slow. I built a virtual file system on IndexedDB for user-created files:

```typescript
// FileSystem.ts
class VirtualFS {
  private db: IDBDatabase;

  async readFile(path: string): Promise<Uint8Array> {
    const tx = this.db.transaction('files', 'readonly');
    const store = tx.objectStore('files');
    return await store.get(path);
  }

  async writeFile(path: string, data: Uint8Array): Promise<void> {
    const tx = this.db.transaction('files', 'readwrite');
    const store = tx.objectStore('files');
    await store.put({ path, data, modified: Date.now() });
  }
}
```

**Why IndexedDB for user data:**
- Persistent across sessions
- Asynchronous (non-blocking)
- Can store binary data (images, audio)
- No server round-trips for user files

Static assets (icons, fonts, application bundles) use Cache Storage + Service Worker:

```javascript
// sw.js
import { precacheAndRoute } from 'workbox-precaching';

precacheAndRoute([
  { url: '/images/desktop/terminal.png', revision: 'abc123' },
  { url: '/chunks/window-manager.js', revision: 'def456' },
]);
```

IndexedDB handles mutable user data. Cache API handles immutable static assets. Subsequent visits load *everything* from local storage.

**Performance gain**: File operations went from 50-200ms (network) to <5ms (IndexedDB).

## Performance Optimization #3: Self-Hosted Fonts & Preconnect

For critical fonts, I host them locally with `font-display: swap` to avoid render-blocking:

```css
@font-face {
  font-family: 'Space Grotesk';
  src: url('/fonts/space-grotesk.woff2') format('woff2');
  font-display: swap;
  font-weight: 400;
}
```

For external resources I *know* will be needed, I preconnect:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Prefetch critical app icons -->
<link rel="prefetch" href="/images/desktop/terminal.png">
<link rel="prefetch" href="/images/desktop/explorer.png">
```

Icons start downloading during the initial page load, so they're ready when the desktop renders.

## The Results: Cold Load Performance

**Test setup:**
- Device: Pixel 6 (4× CPU throttle)
- Network: Simulated Fast 4G (150ms RTT, 4Mbps down)
- Tools: Lighthouse CI, WebPageTest, web-vitals in RUM
- Runs: 5 median values

Lighthouse score on throttled 4G:

- **Performance**: 98/100  
- **LCP**: 1.1s
- **INP**: 180ms  
- **CLS**: 0.00
- **Total Blocking Time**: 120ms  

On a real-world 4G connection (unthrottled):
- **LCP**: 840ms  
- **INP**: 150ms
- **CLS**: 0.00
- **Total JavaScript**: 142kb (gzipped), 18kb on first paint

**Mission accomplished.**

## Architecture Tradeoffs

This approach isn't without compromises:

### What I Gained
- Instant initial render
- Buttery-smooth animations
- Minimal JavaScript payload
- Excellent Lighthouse scores

### What I Sacrificed
- **SEO**: The entire desktop is client-rendered (but it's an app, not content)
- **Accessibility**: Canvas-based windows need careful handling. I implemented:
  - Keyboard focus order and window cycling (Tab, Cmd+`)
  - Screen reader fallbacks with ARIA live regions announcing window state
  - High-contrast mode detection for canvas stroke weights
- **Code complexity**: Managing canvas rendering + DOM positioning is harder than pure DOM

For a portfolio piece, these tradeoffs were worth it. For a production SaaS app, I'd reconsider.

## Key Takeaways

1. **Use the right tool for the job**: Astro for static shell, React for dynamic interactions
2. **Code split aggressively**: Users shouldn't download code for features they don't use, but watch for waterfalls
3. **Canvas when appropriate**: For visual effects and high-frequency updates, canvas beats DOM
4. **Cache strategically**: IndexedDB for user data, Cache API for static assets
5. **Measure with modern metrics**: LCP, INP, and CLS are what matter now

---

**Want to try it yourself?** Visit [bbfiller.com](https://bbfiller.com)

Got questions about the architecture? Reach out on [GitHub](https://github.com/jimminiglitch).
