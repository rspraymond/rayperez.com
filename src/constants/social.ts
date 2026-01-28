import { PROFILE } from './profile'
import TwitterIcon from '@mui/icons-material/Twitter'
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary'
import React from 'react'

export const SITE_URL = 'https://www.rayperez.com' as const

export const SOCIAL_CONFIG = {
  siteName: 'Raymond Perez - Software Engineer',
  defaultDescription:
    'Software Engineer specializing in modern web development, performance optimization, and scalable architecture.',
  defaultImage: PROFILE.image,
  twitterCreator: PROFILE.twitterCreator,
} as const

export interface SocialLink {
  text: string
  href: string
  platform: 'twitter' | 'twitch'
  icon: React.ReactNode
}

export const FOOTER_SOCIAL_LINKS: SocialLink[] = [
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
