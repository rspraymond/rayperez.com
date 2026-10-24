import { PROFILE } from './profile'
import { ABOUT_PATH } from './paths'
import { SITE_URL } from './siteUrl'
import { SKILLS } from './skills'

/**
 * Stable identifier for the author entity.
 * Articles, the home page, and the About page reference it so search engines resolve them to one person.
 */
export const PERSON_ID = `${SITE_URL}/#person`

export const PERSON_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': PERSON_ID,
  name: PROFILE.name,
  jobTitle: PROFILE.role,
  worksFor: {
    '@type': 'Organization',
    name: 'DHI Group, Inc.',
    alternateName: 'Dice.com',
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Red Rocks Community College',
  },
  image: PROFILE.image,
  url: SITE_URL,
  knowsAbout: SKILLS.map((s) => s.label),
  hasOccupation: [
    {
      '@type': 'Occupation',
      name: 'Senior Software Engineer',
      occupationalCategory: 'Software Development',
    },
  ],
  sameAs: [
    'https://prejump.com',
    'https://twitch.tv/onlyray',
    'https://github.com/rspraymond',
    'https://www.linkedin.com/in/raymond-perez-eng/',
    'https://twitter.com/onlyray7',
  ],
} as const

export interface BlogPostingSchemaInput {
  title: string
  url: string
  datePublished: string
  dateModified?: string
  image?: string
}

// Article pages carry only this reference; the full Person block lives on the About page.
export const buildBlogPostingSchema = ({
  title,
  url,
  datePublished,
  dateModified = datePublished,
  image = PROFILE.image,
}: BlogPostingSchemaInput) =>
  ({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    author: {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: PROFILE.name,
      url: `${SITE_URL}${ABOUT_PATH}`,
    },
    datePublished,
    dateModified,
    mainEntityOfPage: url,
    image,
  }) as const

export const buildProfilePageSchema = (image: string = PROFILE.image) =>
  ({
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: `${SITE_URL}${ABOUT_PATH}`,
    mainEntity: { ...PERSON_SCHEMA, image },
  }) as const
