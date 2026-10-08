import type { ContentType } from '../constants/social'

export interface SocialMetaProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: ContentType
  twitterCreator?: string
  siteName?: string
  keywords?: string
}

export type ResolvedSocialMetaValues = Required<SocialMetaProps>
