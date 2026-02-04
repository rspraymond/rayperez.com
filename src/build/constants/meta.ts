import { buildMetaTags, MetaTagValues } from '../utils/meta'
import { DEFAULT_SEO_KEYWORDS } from '../../constants/seo'

export const DEFAULT_META_TITLE = 'Raymond Perez - Senior Software Engineer in Denver, Colorado'
export const DEFAULT_META_DESCRIPTION =
  'Raymond Perez, a software engineer in Denver, Colorado with over a decade of experience. Check out his skills, experiences, and achievements.'
export const DEFAULT_META_KEYWORDS = DEFAULT_SEO_KEYWORDS
export const DEFAULT_META_IMAGE = '/assets/raymond-perez.jpg'
export const DEFAULT_META_URL = 'https://www.rayperez.com'
export const DEFAULT_META_TYPE = 'website'
export const DEFAULT_META_SITE_NAME = 'rayperez.com'
export const DEFAULT_META_TWITTER_CREATOR = '@onlyray7'

const DEFAULT_META_VALUES: MetaTagValues = {
  title: DEFAULT_META_TITLE,
  description: DEFAULT_META_DESCRIPTION,
  keywords: DEFAULT_META_KEYWORDS,
  image: DEFAULT_META_IMAGE,
  url: DEFAULT_META_URL,
  type: DEFAULT_META_TYPE,
  siteName: DEFAULT_META_SITE_NAME,
  twitterCreator: DEFAULT_META_TWITTER_CREATOR,
}

export const DEFAULT_META_TAGS = buildMetaTags(DEFAULT_META_VALUES)
