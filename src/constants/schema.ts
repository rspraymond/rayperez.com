import { PROFILE } from './profile'
import { SKILLS } from './skills'

export const PERSON_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: PROFILE.name,
  jobTitle: PROFILE.role,
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Red Rocks Community College',
  },
  image: PROFILE.image,
  url: 'https://www.rayperez.com',
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
