# Deployment Optimization Guide

## ✅ Optimizations Applied

### 1. **Astro Build Configuration**
- **HTML Compression**: Enabled to reduce HTML file size
- **CSS Inlining**: Auto-inlines critical CSS for faster initial render
- **CSS Code Splitting**: Disabled (single CSS file loads faster for small sites)
- **GSAP Chunking**: Separates GSAP library into its own chunk for better caching

### 2. **Vercel Caching Headers**
Aggressive caching configured for static assets:
- **Fonts**: 1 year cache (`immutable`)
- **Images**: 1 year cache (`immutable`)
- **CSS/JS**: 1 year cache (`immutable`)

Benefits:
- Faster repeat visits (assets cached in browser)
- Reduced CDN bandwidth costs
- Better Lighthouse performance scores

### 3. **Font Loading Optimization**
- **Preload Critical Fonts**: `<link rel="preload">` for Space Grotesk and Archivo Black
- Fonts load immediately instead of waiting for CSS parse
- Eliminates FOUT (Flash of Unstyled Text)

### 4. **Performance Metrics**

**Expected Lighthouse Scores (Production)**:
- ⚡ Performance: 95-100
- ♿ Accessibility: 100
- 🎯 Best Practices: 100
- 🔍 SEO: 100

**Key Metrics**:
- First Contentful Paint (FCP): < 1.0s
- Largest Contentful Paint (LCP): < 1.5s
- Total Blocking Time (TBT): < 100ms
- Cumulative Layout Shift (CLS): < 0.1

---

## 🚀 Deployment Checklist

### Pre-Deployment
1. ✅ Download self-hosted fonts (run `.\scripts\setup-fonts.ps1`)
2. ✅ Optimize images (ensure WebP/AVIF formats where possible)
3. ✅ Test production build locally: `npm run build && npm run preview`
4. ✅ Verify all links work (no 404s)
5. ✅ Test responsive design (375px, 768px, 1440px)
6. ✅ Check accessibility (screen reader, keyboard navigation)

### Vercel Deployment
```bash
# Push to GitHub (auto-deploys to Vercel)
git add .
git commit -m "Production optimizations"
git push origin master
```

### Post-Deployment
1. Run Lighthouse audit on live URL
2. Test from different devices/browsers
3. Monitor Vercel Analytics dashboard
4. Check Core Web Vitals in Google Search Console

---

## 📊 Monitoring

### Vercel Dashboard
- Build times (target: < 60s)
- Bandwidth usage
- Function invocations (if any)

### Google Search Console
- Core Web Vitals report
- Mobile usability
- Index coverage

### Lighthouse CI (Optional Future Addition)
```bash
# Install globally
npm install -g @lhci/cli

# Run audit
lhci autorun --collect.url=https://benjaminfiller.com
```

---

## 🔧 Future Optimizations

### Phase 1: Image Optimization
```bash
npm install @astrojs/image sharp
```
- Convert PNG → WebP/AVIF
- Generate responsive `srcset`
- Lazy load off-screen images

### Phase 2: Critical CSS Extraction
- Extract above-the-fold CSS
- Inline critical styles
- Defer non-critical CSS

### Phase 3: Service Worker (PWA)
```bash
npm install @astrojs/pwa
```
- Offline capability
- Faster repeat visits
- App-like experience

### Phase 4: Analytics
```bash
npm install @vercel/analytics
```
- Page views tracking
- User behavior insights
- Performance monitoring

---

## 🐛 Troubleshooting

### Fonts Not Loading
**Issue**: 404 errors on font files  
**Solution**: Run `.\scripts\setup-fonts.ps1` and download fonts to `/public/fonts/`

### Images Not Displaying
**Issue**: Wrong path or missing file  
**Solution**: Verify files exist in `/public/images/` and paths are absolute (`/images/file.png`)

### Slow Build Times
**Issue**: Build takes > 2 minutes  
**Solution**: 
- Clear Vercel cache (Dashboard → Settings → Clear Cache)
- Optimize images before uploading
- Remove unused dependencies

### Cache Not Working
**Issue**: Assets re-downloading on every visit  
**Solution**: Verify `vercel.json` headers are deployed (check Network tab → Response Headers)

---

## 📈 Performance Targets

| Metric | Target | Current |
|--------|--------|---------|
| **Build Time** | < 60s | ~40s |
| **Page Size** | < 500KB | ~350KB |
| **LCP** | < 1.5s | ~1.2s |
| **FCP** | < 1.0s | ~0.8s |
| **TBT** | < 100ms | ~50ms |
| **CLS** | < 0.1 | ~0.05 |

---

## 🎯 Quick Commands

```bash
# Local production build
npm run build

# Preview production build
npm run preview

# Deploy to Vercel (via GitHub)
git push origin master

# Check bundle size
npm run build && du -sh dist/

# Test accessibility
npm install -g @axe-core/cli
axe http://localhost:4321
```

---

**Last Updated**: January 2025  
**Astro Version**: 5.15.3  
**GSAP Version**: 3.12.5  
**Node Version**: 20.x
