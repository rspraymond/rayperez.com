import React from 'react'
import { Box, Link, Stack, Typography } from '@mui/material'
import RouterLinkRef from '../utils/RouterLink'
import SectionCard from './SectionCard'
import { HOME_SECTIONS } from '../constants/paths'
import { BODY_SX, ITEM_TITLE_SX, PROJECT_GAP, TEXT_LINK_PROPS } from '../styles/sectionStyles'
import type { Project } from '../types/contentData'

const ROW_LINK_SX = {
  ...TEXT_LINK_PROPS.sx,
  display: 'inline-flex',
  alignItems: 'center',
  minHeight: 24,
  fontSize: '0.9375rem',
}

const externalLinkProps = {
  ...TEXT_LINK_PROPS,
  sx: ROW_LINK_SX,
  target: '_blank',
  rel: 'noopener noreferrer',
} as const

/**
 * Each project title is plain text so every destination has one link.
 * Repeated link text like "Visit site" gets an accessible name that adds the project, so screen reader link lists stay distinct.
 */
const Projects: React.FC<{ projects: Project[] }> = ({ projects }) => (
  <SectionCard
    title={HOME_SECTIONS.projects.title}
    id={HOME_SECTIONS.projects.id}
    headingId='projects-heading'
  >
    <Stack spacing={PROJECT_GAP}>
      {projects.map((project) => (
        <Box key={project.title}>
          <Typography component='h3' sx={ITEM_TITLE_SX}>
            {project.title}
          </Typography>
          <Typography sx={{ ...BODY_SX, mt: 0.5, color: 'text.secondary' }}>
            {project.description}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', columnGap: 2, mt: 0.5 }}>
            <Link
              href={project.liveUrl}
              aria-label={`Visit site: ${project.title} (opens in new window)`}
              {...externalLinkProps}
            >
              Visit site
            </Link>
            {project.caseStudyUrl && (
              <Link
                component={RouterLinkRef}
                to={project.caseStudyUrl}
                aria-label={`Read the case study: ${project.title}`}
                {...TEXT_LINK_PROPS}
                sx={ROW_LINK_SX}
              >
                Read the case study
              </Link>
            )}
            {project.githubUrl && (
              <Link
                href={project.githubUrl}
                aria-label={`Source code: ${project.title} (opens in new window)`}
                {...externalLinkProps}
              >
                Source code
              </Link>
            )}
          </Box>
        </Box>
      ))}
    </Stack>
  </SectionCard>
)

export default Projects
