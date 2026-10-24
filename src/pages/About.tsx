import React from 'react'
import { Helmet } from 'react-helmet-async'
import { helmetJsonLdProp } from 'react-schemaorg'
import { ProfilePage } from 'schema-dts'
import { Container, Divider, Stack, Typography } from '@mui/material'
import ArticleRenderer from '../components/ArticleRenderer'
import SocialLinksSection from '../components/SocialLinksSection'
import SocialMeta from '../components/SocialMeta'
import { buildProfilePageSchema } from '../constants/schema'
import { ABOUT_PATH } from '../constants/paths'
import { SITE_URL } from '../constants/siteUrl'
import { ABOUT_DOCUMENT_TITLE } from '../constants/seoCopy'
import { PROFILE } from '../constants/profile'
import { leadArticleText } from '../utils/articleText'
import profileImage from '../assets/raymond-perez.jpg'
import aboutContent from '../data/content/about.json'
import type { ArticleDocument } from '../types/articleContent'

const content = aboutContent as ArticleDocument
const aboutUrl = `${SITE_URL}${ABOUT_PATH}`

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
    <Container
      component='article'
      maxWidth='md'
      sx={{ py: { xs: 4, md: 6 }, px: { xs: 2, sm: 3 } }}
    >
      <Stack spacing={{ xs: 3, md: 4 }}>
        <Typography variant='h2' component='h1'>
          About {PROFILE.name}
        </Typography>
        <ArticleRenderer content={content} />
        <Divider />
        <SocialLinksSection />
      </Stack>
    </Container>
  </React.Fragment>
)

export default About
