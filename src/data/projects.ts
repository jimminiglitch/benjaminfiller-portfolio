/**
 * Complete Project Data - Sourced from BBFiller Desktop OS
 * Last Updated: 2025-11-01
 * 
 * This file contains accurate, up-to-date information about all projects
 * featured in the Benjamin Filler portfolio, derived from the production
 * Desktop OS at bbfiller.com
 */

export interface Project {
  id: string
  title: string
  description: string
  category: 'film' | 'code' | 'art' | 'music' | 'interactive'
  tags: string[]
  links: {
    live?: string
    github?: string
    youtube?: string
    demo?: string
  }
  thumbnail?: string
  featured?: boolean
}

export const projects: Project[] = [
  // FILMS & VIDEO
  {
    id: 'weight-of-care',
    title: 'The Weight of Care',
    description: 'Experimental documentary on the emotional weight of private care medicine in the USA.',
    category: 'film',
    tags: ['Documentary', 'Healthcare', 'Experimental'],
    links: {
      youtube: 'https://www.youtube.com/watch?v=i3yRphyofs0'
    },
    thumbnail: 'https://i.ytimg.com/vi/i3yRphyofs0/hqdefault.jpg',
    featured: true
  },
  {
    id: 'birding-with-brian',
    title: 'Birding with Brian',
    description: 'Documentary short about a birder named Brian.',
    category: 'film',
    tags: ['Documentary', 'Nature', 'Portrait'],
    links: {
      youtube: 'https://www.youtube.com/watch?v=6l2BltEBLt0'
    },
    thumbnail: 'https://i.ytimg.com/vi/6l2BltEBLt0/hqdefault.jpg',
    featured: true
  },
  {
    id: 'clyde-cup',
    title: 'The Illustrious Clyde Cup',
    description: 'Documentary short about a Detroit Minigolf Tournament.',
    category: 'film',
    tags: ['Documentary', 'Detroit', 'Sports'],
    links: {
      youtube: 'https://www.youtube.com/watch?v=16N_xqMwHDg'
    },
    thumbnail: 'https://i.ytimg.com/vi/16N_xqMwHDg/hqdefault.jpg',
    featured: true
  },
  {
    id: 'joyful-life',
    title: 'A Joyful and Meaningful Life',
    description: 'Phantom of the Oprah pt. 3',
    category: 'film',
    tags: ['Experimental', 'Video Art'],
    links: {
      youtube: 'https://www.youtube.com/watch?v=erZBbUa4Rac',
      live: 'https://bbfiller.com'
    },
    thumbnail: 'https://i.ytimg.com/vi/erZBbUa4Rac/hqdefault.jpg',
    featured: false
  },
  {
    id: 'abstract',
    title: 'Abstract',
    description: 'S.E.P. Challenge Video 6',
    category: 'film',
    tags: ['Experimental', 'Abstract'],
    links: {
      youtube: 'https://www.youtube.com/watch?v=ieB-dxSihuo',
      live: 'https://bbfiller.com'
    },
    thumbnail: 'https://i.ytimg.com/vi/ieB-dxSihuo/hqdefault.jpg',
    featured: false
  },
  {
    id: 'curious-critter',
    title: 'Curious Critter POV',
    description: 'S.E.P. Challenge Video 1',
    category: 'film',
    tags: ['Experimental', 'POV'],
    links: {
      youtube: 'https://www.youtube.com/watch?v=i8h72QCGTWE',
      live: 'https://bbfiller.com'
    },
    thumbnail: 'https://i.ytimg.com/vi/i8h72QCGTWE/hqdefault.jpg',
    featured: false
  },

  // CODE PROJECTS
  {
    id: 'desktop-os',
    title: 'BBFiller Desktop OS',
    description: 'Browser-based operating system with draggable windows, games, music player, and interactive portfolio. Built with Astro 5, React 19, and TypeScript for sub-500ms load times.',
    category: 'code',
    tags: ['Astro', 'React', 'TypeScript', 'Vercel', 'UI/UX'],
    links: {
      live: 'https://bbfiller.com',
      github: 'https://github.com/jimminiglitch/bbfillerdesktop'
    },
    thumbnail: '/images/desktop/psychtoadglow.gif',
    featured: true
  },
  {
    id: 'space-snake',
    title: 'Space Snake',
    description: 'External standalone arcade game with high scores and retro aesthetics. Classic Snake gameplay with cyberpunk styling.',
    category: 'code',
    tags: ['Game', 'JavaScript', 'Canvas'],
    links: {
      live: 'https://jimminiglitch.github.io/spacesnake/',
      github: 'https://github.com/jimminiglitch/spacesnake',
      demo: 'https://bbfiller.com'
    },
    featured: false
  },
  {
    id: 'cybermines',
    title: 'CyberMines',
    description: 'Terminal-based minesweeper with cyberpunk theme and neon effects.',
    category: 'code',
    tags: ['Game', 'JavaScript', 'Terminal'],
    links: {
      live: 'https://jimminiglitch.github.io/cybermines/',
      github: 'https://github.com/jimminiglitch/cybermines',
      demo: 'https://bbfiller.com'
    },
    featured: false
  },
  {
    id: 'tatriz',
    title: 'Tatriz',
    description: 'Falling-block puzzle game (Tetris variant) embedded via ExternalWindow with interactive folder grouping.',
    category: 'code',
    tags: ['Game', 'JavaScript', 'Canvas'],
    links: {
      live: 'https://jimminiglitch.github.io/tetriz/',
      github: 'https://github.com/jimminiglitch/tetriz',
      demo: 'https://bbfiller.com'
    },
    featured: false
  },
  {
    id: 'r3d3ch0',
    title: 'r3d3ch0 Story Map',
    description: 'ArcGIS narrative experience. Interactive story map with geospatial data and multimedia.',
    category: 'interactive',
    tags: ['ArcGIS', 'Storytelling', 'Maps'],
    links: {
      live: 'https://r3d3ch0story.vercel.app/',
      demo: 'https://bbfiller.com'
    },
    thumbnail: '/images/desktop/r3d3ch0-logo.png',
    featured: true
  },
  {
    id: 'joke-terminal',
    title: 'Joke Terminal',
    description: 'AI-powered comedy with real-time generation. Custom-built terminal UI with cyberpunk styling.',
    category: 'code',
    tags: ['API', 'JavaScript', 'Terminal'],
    links: {
      live: 'https://jokes-zeta.vercel.app/',
      demo: 'https://bbfiller.com'
    },
    featured: false
  },

  // MUSIC
  {
    id: 'bbfiller-music',
    title: 'BBFiller Music',
    description: 'Personal music collection with playlist management, shuffle mode, and visualizers. Streaming player hosted on GitHub Pages.',
    category: 'music',
    tags: ['Audio', 'JavaScript', 'UI/UX'],
    links: {
      live: 'https://jimminiglitch.github.io/bbfillermusic/',
      github: 'https://github.com/jimminiglitch/bbfillermusic',
      demo: 'https://bbfiller.com'
    },
    thumbnail: '/images/desktop/TIGERGLOW.gif',
    featured: true
  },

  // ART & PHOTOGRAPHY
  {
    id: 'nature-gallery',
    title: 'Nature Viewer',
    description: 'Atmospheric slideshow featuring curated nature photography collection. Environmental photography showcase.',
    category: 'art',
    tags: ['Photography', 'Slideshow', 'Nature'],
    links: {
      live: 'https://jimminiglitch.github.io/bbfillernature/',
      github: 'https://github.com/jimminiglitch/bbfillernature',
      demo: 'https://bbfiller.com'
    },
    featured: false
  },
  {
    id: 'cool-pics-digital-art',
    title: 'COOL PICS Digital Art',
    description: 'Curated selections from the COOL PICS desktop folder, featuring pieces like DOGOFWAR, OCTAVIA, and TIGER.',
    category: 'art',
    tags: ['Digital Art', 'Composites', 'Gallery'],
    links: {
      live: 'https://bbfiller.com'
    },
    thumbnail: '/images/desktop/octavia.png',
    featured: true
  },
  {
    id: 'composite-gallery',
    title: 'Cool Pics Gallery',
    description: 'Collection of digital art, photography, and composite images: OCTAVIA, TIGERRR, MILES, Psych Toad, and more.',
    category: 'art',
    tags: ['Photography', 'Digital Art', 'Composites'],
    links: {
      live: 'https://bbfiller.com'
    },
    featured: false
  }
]

// Helper functions for filtering and sorting
export function getProjectsByCategory(category: Project['category']) {
  return projects.filter(p => p.category === category)
}

export function getFeaturedProjects() {
  return projects.filter(p => p.featured === true)
}

export function getAllCategories() {
  return Array.from(new Set(projects.map(p => p.category)))
}

export function getProjectById(id: string) {
  return projects.find(p => p.id === id)
}
