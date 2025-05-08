import React from 'react'
import { helmetJsonLdProp } from 'react-schemaorg'
import { Person } from 'schema-dts'
import profileImage from '../assets/raymond-perez.jpg'
import { Container, CssBaseline, Box, Grid } from '@mui/material'
import Header from '../components/Header.tsx'
import ProfileCard from '../components/ProfileCard.tsx'
import RecentPosts from '../components/RecentPosts.tsx'
import Summary from '../components/Summary.tsx'
import Links from '../components/Links.tsx'
import Experience from '../components/Experience.tsx'
import Education from '../components/Education.tsx'
import Skills from '../components/Skills.tsx'
import Achievements from '../components/Achievements.tsx'
import { Helmet } from 'react-helmet'
import { PROFILE } from '../constants/profile'

const experiences = [
  {
    title: 'Senior Software Engineer',
    company: 'Red Ventures',
    duration: 'Sep 2021 - Present',
    bullets: [
      'Transitioned to primarily JavaScript projects, leveraging various tools for application performance management and scalable infrastructure building.',
      'Assisted in the design and initiation of AI tool development for content enhancement.',
      'Delved into observability and telemetry operations, enhancing app performance and usability.',
    ],
  },
  {
    title: 'Senior Software Engineer',
    company: 'Dealer Inspire',
    duration: 'Feb 2021 - Sep 2021',
    bullets: [
      'Supported a chatbot and admin interface for dealership websites, used Datadog for monitoring, Bitbucket for code collaboration, and AWS for cloud services.',
      'Fine-tuned the testing pipeline using Bitbucket, improving Laravel application performance.',
      'Adapted and accomplished smaller React and Node.js tasks as needed.',
    ],
  },
  {
    title: 'Senior Software Engineer',
    company: 'RE/MAX',
    duration: 'Aug 2018 - Jan 2021',
    bullets: [
      'Orchestrated the development of Max Center, an agent referral system, utilising GitLab for complete DevOps lifecycle, GitHub for version control, Datadog for monitoring, and TravisCI for Continuous Integration.',
      'Instituted and enforced test coverage on APIs, improving code quality and reducing bugs.',
      'Created a collaborative team atmosphere, mentored junior developers.',
    ],
  },
  {
    title: 'Software Developer',
    company: 'Schomp Automotive Group',
    duration: 'Jun 2015 - Dec 2017',
    bullets: [
      'Oversaw feature development for business-process Laravel application, used Digital Ocean for cloud infrastructure, Bitbucket for code collaboration, and CircleCI for Continuous Integration.',
      'Developed several third-party integrations, improving dealership efficiency and productivity.',
    ],
  },
  {
    title: 'Web Developer',
    company: 'Denver Website Repair',
    duration: 'Jan 2015 - Jun 2015',
    bullets: [
      'Fixed issues across various environments (PHP/WordPress/Code Igniter).',
      'Optimized MySQL databases, contributing to faster server response and streamlined operations.',
    ],
  },
  {
    title: 'Marketing Director',
    company: 'Nip and Tuck Carpet Repair',
    duration: 'Apr 2014 - Jan 2015',
    bullets: [
      'Led online marketing efforts, developed and managed website, driving SEO improvements.',
    ],
  },
  {
    title: 'Web Developer',
    company: 'Omni Premier Marketing',
    duration: 'Jun 2013 - Mar 2014',
    bullets: [
      'Developed responsive WordPress websites, honing skills on mobile-first design.',
      'Showcased speedy task execution; notable for a website turnaround within merely three days.',
    ],
  },
  {
    title: 'Web Developer',
    company: 'Reality Concepts',
    duration: 'Jul 2010 - Jun 2013',
    bullets: [
      'Assisted in dynamic WordPress-based CMS migration, replacing old static websites.',
      'Helped integrate plugin system for community and floor plan management.',
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
  'Contributed significantly to the successes of backend operations at Red Ventures through AI tool development.',
  'Improved testing pipeline efficiency at Dealer Inspire, boosting development performance.',
  'Steered the development of several key features for Schomp Automotive Group, contributing to business growth.',
  'Fostered a collaborative learning environment at RE/MAX and mentored junior developers.',
  'Improved dealership efficiency and productivity at Schomp Automotive Group through third-party integrations.',
  'Streamlined operations at Denver Website Repair by optimizing MySQL databases for faster server response.',
  'Managed website development and drove SEO improvements as Marketing Director at Nip and Tuck Carpet Repair.',
  'Demonstrated efficiency and expertise in web development at Omni Premier Marketing by turning around a website project in just three days.',
  'Assisted in a dynamic WordPress-based CMS migration at Reality Concepts, improving efficiency by replacing static websites.',
]
const skills = [
  { label: 'NestJS', url: '/why-nestjs' },
  { label: 'GraphQL', url: '/why-graphql' },
  { label: 'Node.js', url: '/why-nodejs' },
  { label: 'TypeScript', url: '/why-typescript' },
  { label: 'React.js', url: '/why-react' },
  { label: 'Laravel', url: '/why-laravel' },
  { label: 'OOP', url: '/why-oop' },
  { label: 'Web Development', url: '/why-web-development' },
]

const links = [
  { text: 'Prejump', href: 'https://prejump.com' },
  { text: 'Palworld Fast Travel Map', href: 'https://palworld-map.appsample.com' },
  { text: 'Twitch', href: 'https://twitch.tv/onlyray' },
  { text: 'GitHub', href: 'https://github.com/rspraymond' },
  { text: 'LinkedIn', href: 'https://www.linkedin.com/in/raymond-perez-eng/' },
  { text: 'Twitter', href: 'https://twitter.com/onlyray7' },
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
            jobTitle: PROFILE.role,
            worksFor: {
              '@type': 'Organization',
              name: 'Red Ventures',
            },
            alumniOf: {
              '@type': 'CollegeOrUniversity',
              name: 'Red Rocks Community College',
            },
            image: profileImage,
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
        <meta property='og:image' content={profileImage} />
      </Helmet>
      <Container maxWidth={false}>
        <CssBaseline />
        <Box my={2}>
          <Grid container spacing={2} direction='row-reverse' alignItems='flex-start'>
            <Grid item xs={12} lg={4}>
              <Header />
              <ProfileCard image={profileImage} name={PROFILE.name} role={PROFILE.role} />
              <RecentPosts />
            </Grid>
            <Grid item xs={12} lg={8}>
              <Summary />
              <Links links={links} />
              {experiences.map((exp, key) => (
                <Experience {...exp} key={key} />
              ))}
              {educations.map((edu, key) => (
                <Education {...edu} key={key} />
              ))}
              <Skills skills={skills} />
              <Achievements achievements={achievements} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  )
}

export default Home
