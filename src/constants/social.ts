import { PROFILE } from './profile'
import { DEFAULT_SEO_KEYWORDS } from './seo'
import { SITE_URL } from './siteUrl'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TwitterIcon from '@mui/icons-material/Twitter'
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary'
import React from 'react'

export { SITE_URL }

export const SOCIAL_CONFIG = {
  siteName: 'Raymond Perez - Software Engineer',
  defaultDescription:
    'Software Engineer specializing in modern web development, performance optimization, and scalable architecture.',
  defaultImage: PROFILE.image,
  twitterCreator: PROFILE.twitterCreator,
  keywords: DEFAULT_SEO_KEYWORDS,
} as const

export interface SocialLink {
  text: string
  href: string
  platform: 'github' | 'linkedin' | 'twitter' | 'twitch'
  icon: React.ReactNode
}

// The header no longer carries social icons, so the footer holds the full set on every page.
export const FOOTER_SOCIAL_LINKS: SocialLink[] = [
  {
    text: 'GitHub',
    href: PROFILE.githubUrl,
    platform: 'github',
    icon: React.createElement(GitHubIcon, { fontSize: 'small' }),
  },
  {
    text: 'LinkedIn',
    href: PROFILE.linkedinUrl,
    platform: 'linkedin',
    icon: React.createElement(LinkedInIcon, { fontSize: 'small' }),
  },
  {
    text: 'Twitter',
    href: 'https://twitter.com/intent/follow?screen_name=onlyray7',
    platform: 'twitter',
    icon: React.createElement(TwitterIcon, { fontSize: 'small' }),
  },
  {
    text: 'Twitch',
    href: 'https://twitch.tv/onlyray',
    platform: 'twitch',
    icon: React.createElement(VideoLibraryIcon, { fontSize: 'small' }),
  },
]

export type ContentType = 'website' | 'article' | 'profile'
