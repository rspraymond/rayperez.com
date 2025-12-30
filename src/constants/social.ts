import { PROFILE } from './profile'

export const SITE_URL = 'https://www.rayperez.com' as const

export const SOCIAL_CONFIG = {
  siteName: 'Raymond Perez - Software Engineer',
  defaultDescription:
    'Software Engineer specializing in modern web development, performance optimization, and scalable architecture.',
  defaultImage: PROFILE.image,
  twitterCreator: PROFILE.twitterCreator,
} as const

export type ContentType = 'website' | 'article' | 'profile'
