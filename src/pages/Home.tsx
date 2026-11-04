import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { helmetJsonLdProp } from 'react-schemaorg'
import { Person } from 'schema-dts'
import { Helmet } from 'react-helmet-async'
import Experiences from '../components/Experiences.tsx'
import Projects from '../components/Projects.tsx'
import Writing from '../components/Writing.tsx'
import SocialMeta from '../components/SocialMeta.tsx'
import BackToTopButton from '../components/BackToTopButton'
import { PROFILE } from '../constants/profile'
import { PERSON_SCHEMA } from '../constants/schema'
import { SITE_URL } from '../constants/social'
import { HOME_DOCUMENT_TITLE, HOME_META_DESCRIPTION } from '../constants/seoCopy'
import { SHARE_IMAGE_URL } from '../constants/shareImage'
import { useScrollToTop } from '../hooks/useScrollToTop'
import { posts } from '../constants/posts'
import projectsData from '../data/content/projects.json'
import experiencesData from '../data/content/experiences.json'
import type { Project, Experience as ExperienceType } from '../types/contentData'

const projects = projectsData as Project[]
const experiences = experiencesData as ExperienceType[]

/** The route renders Intro above this page so the heading does not wait for this chunk. */
const Home: React.FC = () => {
  const { showBackToTop, scrollToTop } = useScrollToTop()
  const { hash, key } = useLocation()

  // This page loads after the browser's own jump to a hash such as /#writing, so the menu target is scrolled to here.
  // The location key reruns it when the same menu link is used twice.
  useEffect(() => {
    if (hash) document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView()
  }, [hash, key])

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
        <title>{HOME_DOCUMENT_TITLE}</title>
      </Helmet>
      <SocialMeta
        title={HOME_DOCUMENT_TITLE}
        description={HOME_META_DESCRIPTION}
        image={SHARE_IMAGE_URL}
        url={SITE_URL}
        type='profile'
      />
      <Experiences experiences={experiences} />
      <Projects projects={projects} />
      <Writing posts={posts} />
      <BackToTopButton show={showBackToTop} onClick={scrollToTop} />
    </React.Fragment>
  )
}

export default Home
