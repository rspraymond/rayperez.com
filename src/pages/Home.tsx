import React from 'react'
import { helmetJsonLdProp } from 'react-schemaorg'
import { Person } from 'schema-dts'
import { Box } from '@mui/material'
import Summary from '../components/Summary.tsx'
import Links from '../components/Links.tsx'
import Experience from '../components/Experience.tsx'
import Education from '../components/Education.tsx'
import Skills from '../components/Skills.tsx'
import Achievements from '../components/Achievements.tsx'
import { Helmet } from 'react-helmet'
import SocialMeta from '../components/SocialMeta.tsx'
import { PROFILE } from '../constants/profile'
import { SKILLS } from '../constants/skills'

const experiences = [
  {
    title: 'Senior Software Engineer',
    company: 'Red Ventures',
    duration: 'Sep 2021 - Present',
    bullets: [
      'Built JavaScript applications with focus on performance monitoring and scalable infrastructure.',
      'Helped develop AI tools for content enhancement.',
      'Worked on application monitoring and performance tracking.',
    ],
  },
  {
    title: 'Senior Software Engineer',
    company: 'Dealer Inspire',
    duration: 'Feb 2021 - Sep 2021',
    bullets: [
      'Maintained chatbot and admin interface for dealership websites using Datadog, Bitbucket, and AWS.',
      'Improved testing pipeline for Laravel applications.',
      'Completed React and Node.js development tasks.',
    ],
  },
  {
    title: 'Senior Software Engineer',
    company: 'RE/MAX',
    duration: 'Aug 2018 - Jan 2021',
    bullets: [
      'Developed Max Center agent referral system using GitLab, GitHub, Datadog, and TravisCI.',
      'Implemented test coverage on APIs, improving code quality and reducing bugs.',
      'Mentored junior developers and fostered team collaboration.',
    ],
  },
  {
    title: 'Software Developer',
    company: 'Schomp Automotive Group',
    duration: 'Jun 2015 - Dec 2017',
    bullets: [
      'Built features for Laravel business application using Digital Ocean, Bitbucket, and CircleCI.',
      'Developed third-party integrations to improve dealership efficiency.',
    ],
  },
  {
    title: 'Web Developer',
    company: 'Denver Website Repair',
    duration: 'Jan 2015 - Jun 2015',
    bullets: [
      'Fixed issues across PHP, WordPress, and CodeIgniter environments.',
      'Optimized MySQL databases for faster server response.',
    ],
  },
  {
    title: 'Marketing Director',
    company: 'Nip and Tuck Carpet Repair',
    duration: 'Apr 2014 - Jan 2015',
    bullets: [
      'Led online marketing efforts and managed website development with SEO improvements.',
    ],
  },
  {
    title: 'Web Developer',
    company: 'Omni Premier Marketing',
    duration: 'Jun 2013 - Mar 2014',
    bullets: [
      'Developed responsive WordPress websites with mobile-first design.',
      'Completed website projects with quick turnaround times.',
    ],
  },
  {
    title: 'Web Developer',
    company: 'Reality Concepts',
    duration: 'Jul 2010 - Jun 2013',
    bullets: [
      'Migrated static websites to dynamic WordPress-based CMS.',
      'Integrated plugin system for community and floor plan management.',
    ],
  },
]
const educations = [
  {
    degree: 'Web Development Certificate',
    school: 'Red Rocks Community College',
    duration: '2010-2012',
    details:
      'Completed rigorous coursework related to web development, honing skills in web design, databases, and JavaScript.',
  },
]
const achievements = [
  'Developed AI tools for backend operations at Red Ventures.',
  'Mentored junior developers and improved team collaboration at RE/MAX.',
  'Built key features for Schomp Automotive Group that supported business growth.',
  'Improved testing pipeline efficiency at Dealer Inspire.',
  'Increased dealership efficiency through third-party integrations at Schomp Automotive Group.',
]

const links = [
  { text: 'Prejump', href: 'https://prejump.com' },
  { text: 'Twitch', href: 'https://twitch.tv/onlyray' },
  { text: 'GitHub', href: 'https://github.com/rspraymond' },
  { text: 'LinkedIn', href: 'https://www.linkedin.com/in/raymond-perez-eng/' },
  { text: 'Twitter', href: 'https://twitter.com/onlyray7' },
  { text: 'Twitch Clips Finder', href: 'http://clipsfinder.com' },
  { text: 'Palworld Fast Travel Map', href: 'https://palworld-map.appsample.com' },
]

const Home: React.FC = () => {
  return (
    <React.Fragment>
      <Helmet
        script={[
          helmetJsonLdProp<Person>({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: PROFILE.name,
            description: PROFILE.description,
            jobTitle: PROFILE.role,
            email: PROFILE.email,
            address: {
              '@type': 'PostalAddress',
              addressLocality: PROFILE.location.city,
              addressRegion: PROFILE.location.state,
              addressCountry: PROFILE.location.country,
            },
            worksFor: {
              '@type': 'Organization',
              name: 'Red Ventures',
            },
            alumniOf: {
              '@type': 'CollegeOrUniversity',
              name: 'Red Rocks Community College',
            },
            image: PROFILE.image,
            url: 'https://www.rayperez.com',
            knowsAbout: [
              'Software Engineering',
              'Web Development',
              'React.js',
              'Node.js',
              'TypeScript',
              'Laravel',
              'GraphQL',
              'NestJS',
              'Object-Oriented Programming',
            ],
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
          }),
        ]}
      >
        <link rel='canonical' href='https://www.rayperez.com' />
      </Helmet>
      <SocialMeta
        title={PROFILE.name}
        description='Software Engineer specializing in modern web development, performance optimization, and scalable architecture.'
        image={PROFILE.image}
        url='https://www.rayperez.com'
        type='profile'
      />
      <Box>
        <Summary />
        <Links links={links} />
        <Skills skills={SKILLS} />
        <Achievements achievements={achievements} />
        {experiences.map((exp, key) => (
          <Experience {...exp} key={key} />
        ))}
        {educations.map((edu, key) => (
          <Education {...edu} key={key} />
        ))}
      </Box>
    </React.Fragment>
  )
}

export default Home
