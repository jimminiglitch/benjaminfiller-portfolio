# Benjamin Filler - Portfolio

Professional portfolio website for Benjamin Filler - Creative Developer, Filmmaker & Digital Artist.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📦 Project Structure

```
benjaminfiller-portfolio/
├── src/
│   └── pages/
│       └── index.astro          # Main portfolio page
├── public/
│   └── images/                   # Profile photo and project images
├── astro.config.mjs             # Astro configuration
├── package.json
└── vercel.json                  # Vercel deployment config
```

## 🎨 Features

- **Bold Modern Design**: Space Grotesk + Archivo Black typography
- **Animated Backgrounds**: Gradient shifts and grid overlays
- **Glass-morphism UI**: Backdrop blur effects on cards
- **Responsive Layout**: Mobile-first design
- **Smooth Animations**: Scroll-based reveals and hover effects
- **Performance Optimized**: Fast loading, minimal dependencies

## 🛠️ Tech Stack

- **Astro 5.14** - Static site generator
- **Vanilla JS** - No framework overhead
- **Google Fonts** - Space Grotesk & Archivo Black
- **Vercel** - Deployment platform

## 📝 Customization

### Update Content

Edit `src/pages/index.astro` to customize:

- Hero section (title, subtitle)
- About section (bio text)
- Skills cards
- Project showcases
- Contact links

### Update Images

Replace images in `public/images/`:

- `BenjaminFiller.png` - Your profile photo
- `DOGOFWAR.png` - Project images
- `desktop/*.png` - Additional project images

### Update Colors

Modify CSS variables in `index.astro`:

```css
:root {
  --cyan: #00ffff;
  --magenta: #ff00ff;
  --purple: #8b5cf6;
  --dark: #0a0a0f;
}
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import repository in Vercel
3. Deploy automatically

### Manual Build

```bash
npm run build
# Upload dist/ folder to any static host
```

## 📄 License

© 2025 Benjamin Filler. All rights reserved.

## 🔗 Links

- **Live Site**: [Your Vercel URL]
- **GitHub**: [@jimminiglitch](https://github.com/jimminiglitch)
- **Cyberpunk Desktop**: [bbfillerdesktop](https://github.com/jimminiglitch/bbfillerdesktop)
