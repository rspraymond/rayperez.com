import React from 'react'
import { Helmet } from 'react-helmet-async'
import { helmetJsonLdProp } from 'react-schemaorg'
import { ProfilePage } from 'schema-dts'
import { Box, Divider, Stack, Typography } from '@mui/material'
import ArticleRenderer from '../components/ArticleRenderer'
import SocialLinksSection from '../components/SocialLinksSection'
import Skills from '../components/Skills'
import Achievements from '../components/Achievements'
import Educations from '../components/Educations'
import SocialMeta from '../components/SocialMeta'
import { buildProfilePageSchema } from '../constants/schema'
import { ABOUT_PATH } from '../constants/paths'
import { SITE_URL } from '../constants/siteUrl'
import { ABOUT_DOCUMENT_TITLE } from '../constants/seoCopy'
import { PROFILE } from '../constants/profile'
import { SKILLS } from '../constants/skills'
import { PAGE_SX, PAGE_STACK_SPACING } from '../styles/sectionStyles'
import { leadArticleText } from '../utils/articleText'
import profileImage from '../assets/raymond-perez.jpg'
import aboutContent from '../data/content/about.json'
import achievementsData from '../data/content/achievements.json'
import educationData from '../data/content/education.json'
import type { ArticleDocument } from '../types/articleContent'
import type { Achievement, Education } from '../types/contentData'

const content = aboutContent as ArticleDocument
const aboutUrl = `${SITE_URL}${ABOUT_PATH}`
const achievements = (achievementsData as Achievement[]).map((achievement) => achievement.text)
const educations = educationData as Education[]

const About: React.FC = () => (
  <React.Fragment>
    <Helmet script={[helmetJsonLdProp<ProfilePage>(buildProfilePageSchema(profileImage))]}>
      <link rel='canonical' href={aboutUrl} />
      <title>{ABOUT_DOCUMENT_TITLE}</title>
    </Helmet>
    <SocialMeta
      title={ABOUT_DOCUMENT_TITLE}
      description={leadArticleText(content)}
      type='profile'
      url={aboutUrl}
    />
    <Box component='article' sx={PAGE_SX}>
      <Stack spacing={PAGE_STACK_SPACING}>
        <Typography variant='h2' component='h1'>
          About {PROFILE.name}
        </Typography>
        <ArticleRenderer content={content} />
        <Box>
          <Skills skills={SKILLS} />
          <Achievements achievements={achievements} />
          <Educations educations={educations} />
        </Box>
        <Divider />
        <SocialLinksSection />
      </Stack>
    </Box>
  </React.Fragment>
)

export default About
