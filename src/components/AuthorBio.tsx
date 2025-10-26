import React from 'react'
import { helmetJsonLdProp } from 'react-schemaorg'
import { Person } from 'schema-dts'
import { Box, Avatar, Typography, Divider } from '@mui/material'
import { Helmet } from 'react-helmet'
import LazyImage from './LazyImage'
import SocialMeta from './SocialMeta'
import SkillsSection from './SkillsSection'
import SocialLinksSection from './SocialLinksSection'
import { PROFILE } from '../constants/profile'
import profileImage from '../assets/raymond-perez.jpg'
import { SKILLS } from '../constants/skills'
import { PERSON_SCHEMA } from '../constants/schema'

const AuthorBio: React.FC = () => {
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
          helmetJsonLdProp<Person>(
            Object.assign({}, PERSON_SCHEMA, {
              image: profileImage,
            }),
          ),
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
              Hi, I'm {PROFILE.name}, a {PROFILE.role} in Denver.
            </Typography>
            <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
              I'm the author of this blog, nice to meet you!
            </Typography>
            {SKILLS.length > 0 && <SkillsSection />}
            <SocialLinksSection />
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  )
}

export default AuthorBio
