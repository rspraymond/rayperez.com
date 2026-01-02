import React, { lazy, Suspense } from 'react'
import { helmetJsonLdProp } from 'react-schemaorg'
import { Person } from 'schema-dts'
import { Container, Grid } from '@mui/material'
import Summary from '../components/Summary.tsx'
import Projects from '../components/Projects.tsx'
import Educations from '../components/Educations.tsx'
import Skills from '../components/Skills.tsx'
import Achievements from '../components/Achievements.tsx'
import { Helmet } from 'react-helmet'
import SocialMeta from '../components/SocialMeta.tsx'
import { PROFILE } from '../constants/profile'
import { SKILLS } from '../constants/skills'
import { PERSON_SCHEMA } from '../constants/schema'
import { SITE_URL } from '../constants/social'
import { useScrollToTop } from '../hooks/useScrollToTop'
import BackToTopButton from '../components/BackToTopButton'
import LoadingSkeleton from '../components/LoadingSkeleton'
import projectsData from '../data/content/projects.json'
import achievementsData from '../data/content/achievements.json'
import experiencesData from '../data/content/experiences.json'
import educationData from '../data/content/education.json'
import type {
  Project,
  Achievement,
  Experience as ExperienceType,
  Education as EducationType,
} from '../types/contentData'

const Experiences = lazy(() => import('../components/Experiences.tsx'))

const projects = projectsData as Project[]
const experiences = experiencesData as ExperienceType[]
const educations = educationData as EducationType[]
const achievements = (achievementsData as Achievement[]).map((a) => a.text)

const Home: React.FC = () => {
  const { showBackToTop, scrollToTop } = useScrollToTop()

  return (
    <React.Fragment>
      <Helmet
        script={[
          helmetJsonLdProp<Person>(
            Object.assign({}, PERSON_SCHEMA, {
              description: PROFILE.description,
              email: PROFILE.email,
              address: {
                '@type': 'PostalAddress' as const,
                addressLocality: PROFILE.location.city,
                addressRegion: PROFILE.location.state,
                addressCountry: PROFILE.location.country,
              },
            }),
          ),
        ]}
      >
        <link rel='canonical' href={SITE_URL} />
        <title>{`${PROFILE.name} - ${PROFILE.role} in ${PROFILE.location.city}, ${PROFILE.location.stateName}`}</title>
      </Helmet>
      <SocialMeta
        title={PROFILE.name}
        description={`${PROFILE.role} in ${PROFILE.location.city}, ${PROFILE.location.stateName} specializing in modern web development, performance optimization, and scalable architecture.`}
        image={PROFILE.image}
        url={SITE_URL}
        type='profile'
      />
      <Container
        component='main'
        maxWidth='md'
        sx={{
          py: { xs: 4, md: 6 },
          px: { xs: 2, sm: 3 },
        }}
      >
        <Grid container spacing={{ xs: 3, md: 4 }}>
          <Grid item xs={12}>
            <Summary />
          </Grid>
          <Grid item xs={12}>
            <Skills skills={SKILLS} />
          </Grid>
          <Grid item xs={12}>
            <Projects projects={projects} />
          </Grid>
          <Grid item xs={12}>
            <Achievements achievements={achievements} />
          </Grid>
          <Grid item xs={12}>
            <Suspense fallback={<LoadingSkeleton testId='experiences' />}>
              <Experiences experiences={experiences} />
            </Suspense>
          </Grid>
          <Grid item xs={12}>
            <Educations educations={educations} />
          </Grid>
        </Grid>
      </Container>
      <BackToTopButton show={showBackToTop} onClick={scrollToTop} />
    </React.Fragment>
  )
}

export default Home
