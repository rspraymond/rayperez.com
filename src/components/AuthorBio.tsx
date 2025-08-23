import React from 'react'
import { helmetJsonLdProp } from 'react-schemaorg'
import { Person } from 'schema-dts'
import { Box, Avatar, Link, Chip, Typography, Divider } from '@mui/material'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import GitHubIcon from '@mui/icons-material/GitHub'
import TwitterIcon from '@mui/icons-material/Twitter'
import { Helmet } from 'react-helmet'
import LazyImage from './LazyImage'
import SocialMeta from './SocialMeta'
import { PROFILE } from '../constants/profile'
import profileImage from '../assets/raymond-perez.jpg'
import { SKILLS } from '../constants/skills'

const AuthorBio: React.FC = () => {
  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/raymond-perez-eng/',
      icon: LinkedInIcon,
      color: '#0077B5',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/rspraymond',
      icon: GitHubIcon,
      color: '#333',
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/onlyray7',
      icon: TwitterIcon,
      color: '#1DA1F2',
    },
  ]

  return (
    <React.Fragment>
      <SocialMeta
        title={`${PROFILE.name} - ${PROFILE.role}`}
        description={`${PROFILE.name} is a ${PROFILE.role} in Denver, specializing in modern web development, performance optimization, and scalable architecture.`}
        image={profileImage}
        url='https://www.rayperez.com'
        type='profile'
      />
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
          }),
        ]}
      />
      <Divider sx={{ my: { xs: 4, sm: 6 } }} />
      <Box
        component='section'
        data-testid='author-bio-component'
        sx={{
          width: '100%',
          boxSizing: 'border-box',
          px: { xs: 0, sm: 0 },
          py: { xs: 2, sm: 3 },
        }}
      >
        <Box
          display='flex'
          flexDirection={{ xs: 'column', sm: 'row' }}
          alignItems={{ xs: 'center', sm: 'flex-start' }}
          gap={3}
          width='100%'
        >
          <Avatar
            sx={{
              width: 96,
              height: 96,
              border: '2px solid',
              borderColor: 'primary.main',
              mb: { xs: 2, sm: 0 },
              mr: { sm: 2 },
            }}
          >
            <LazyImage
              src={profileImage}
              alt={`${PROFILE.name}, ${PROFILE.role}`}
              width={96}
              height={96}
              priority
            />
          </Avatar>
          <Box flex={1} width='100%'>
            <Typography variant='body1' component='p' gutterBottom>
              Hi, I’m {PROFILE.name}, a {PROFILE.role} in Denver.
            </Typography>
            <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
              I’m the author of this blog, nice to meet you!
            </Typography>
            {/* Skills with label */}
            {SKILLS.length > 0 && (
              <Box
                display='flex'
                flexDirection={{ xs: 'column', sm: 'row' }}
                alignItems={{ xs: 'flex-start', sm: 'center' }}
                gap={1}
                mb={1}
              >
                <Typography variant='subtitle2' color='text.secondary' sx={{ minWidth: 60 }}>
                  Skills:
                </Typography>
                <Box display='flex' flexWrap='wrap' gap={1}>
                  {SKILLS.map((skill) =>
                    skill.url ? (
                      <Chip
                        key={skill.label}
                        label={skill.label}
                        component={Link}
                        href={skill.url}
                        clickable
                        size='small'
                        variant='outlined'
                        sx={{ borderColor: 'primary.main', color: 'primary.main' }}
                      />
                    ) : (
                      <Chip
                        key={skill.label}
                        label={skill.label}
                        size='small'
                        variant='outlined'
                        sx={{ borderColor: 'primary.main', color: 'primary.main' }}
                      />
                    ),
                  )}
                </Box>
              </Box>
            )}
            {/* Social Links with label */}
            {socialLinks.length > 0 && (
              <Box
                display='flex'
                flexDirection={{ xs: 'column', sm: 'row' }}
                alignItems={{ xs: 'flex-start', sm: 'center' }}
                gap={1}
                mt={1}
              >
                <Typography variant='subtitle2' color='text.secondary' sx={{ minWidth: 120 }}>
                  Find me online:
                </Typography>
                <Box display='flex' gap={2}>
                  {socialLinks.map((social) => (
                    <Link
                      key={social.name}
                      href={social.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      aria-label={`Visit ${PROFILE.name}'s ${social.name} profile`}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        color: 'text.secondary',
                        textDecoration: 'none',
                        '&:hover': {
                          color: social.color,
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      <social.icon fontSize='small' />
                    </Link>
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  )
}

export default AuthorBio
