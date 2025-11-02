export interface Profile {
  name: string
  title: string
  description: string
  location: { city: string; region: string; country: string }
  siteUrl?: string
  handles: {
    twitter?: string // handle like "jimminiglitch" or "@jimminiglitch"
    github?: string // username like "jimminiglitch" or full URL
    linkedin?: string // slug like "your-slug" or full URL
    instagram?: string // handle or full URL
    youtube?: string // channel/handle or full URL
    vimeo?: string // username or full URL
  }
  ogImagePath: string // relative path under /public
}

export const profile: Profile = {
  name: 'Benjamin Filler',
  title: 'Benjamin Filler - Creative Developer & Digital Artist',
  description:
    'Detroit-based creative developer, filmmaker, and artist. Building immersive web experiences, directing films, and creating interactive multimedia projects.',
  location: { city: 'Detroit', region: 'MI', country: 'US' },
  // Optional default if PUBLIC_SITE_URL is not set
  siteUrl: undefined,
  handles: {
    twitter: 'jimminiglitch',
    github: 'https://github.com/jimminiglitch',
    // Add more as you like; left blank until verified
    linkedin: undefined,
    instagram: undefined,
    youtube: undefined,
    vimeo: undefined,
  },
  ogImagePath: '/images/BenjaminFiller2.png',
}

export const sameAs = (
  Object.values({
    twitter:
      profile.handles.twitter &&
      `https://twitter.com/${profile.handles.twitter.replace(/^@/, '')}`,
    github:
      profile.handles.github &&
      (profile.handles.github.startsWith('http')
        ? profile.handles.github
        : `https://github.com/${profile.handles.github}`),
    linkedin:
      profile.handles.linkedin &&
      (profile.handles.linkedin.startsWith('http')
        ? profile.handles.linkedin
        : `https://www.linkedin.com/in/${profile.handles.linkedin}`),
    instagram:
      profile.handles.instagram &&
      `https://instagram.com/${profile.handles.instagram.replace(/^@/, '')}`,
    youtube:
      profile.handles.youtube &&
      (profile.handles.youtube.startsWith('http')
        ? profile.handles.youtube
        : `https://youtube.com/${profile.handles.youtube}`),
    vimeo:
      profile.handles.vimeo &&
      (profile.handles.vimeo.startsWith('http')
        ? profile.handles.vimeo
        : `https://vimeo.com/${profile.handles.vimeo}`),
  }).filter(Boolean) as string[]
)

export const resolvedSiteUrl: string | undefined =
  (import.meta as any).env?.PUBLIC_SITE_URL || profile.siteUrl

export function getAbsoluteOgImage(): string {
  const base = resolvedSiteUrl ? resolvedSiteUrl.replace(/\/$/, '') : ''
  const path = profile.ogImagePath.startsWith('/')
    ? profile.ogImagePath
    : `/${profile.ogImagePath}`
  return base ? `${base}${path}` : path
}
