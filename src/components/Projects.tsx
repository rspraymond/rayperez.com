import React from 'react'
import { CardContent, CardActions, Typography, Button, Box, Chip } from '@mui/material'
import CodeIcon from '@mui/icons-material/Code'
import LaunchIcon from '@mui/icons-material/Launch'
import GitHubIcon from '@mui/icons-material/GitHub'
import SectionCard from './SectionCard'

type Project = {
  title: string
  description: string
  technologies: string[]
  liveUrl: string
  githubUrl?: string
  featured?: boolean
}

const Projects: React.FC<{ projects: Project[] }> = ({ projects }) => {
  return (
    <SectionCard title='Projects' icon={CodeIcon} marginTop={16} marginBottom={16}>
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {projects.map((project, index) => (
            <Box
              key={index}
              sx={{
                p: 2,
                border: 1,
                borderColor: 'divider',
                borderRadius: 2,
                bgcolor: 'background.paper',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  borderColor: 'primary.main',
                  boxShadow: 1,
                },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  mb: 1,
                }}
              >
                <Typography variant='h6' component='h3' sx={{ fontWeight: 600 }}>
                  {project.title}
                </Typography>
                {project.featured && (
                  <Chip
                    label='Featured'
                    size='small'
                    color='primary'
                    variant='outlined'
                    sx={{ ml: 1, fontSize: '0.75rem' }}
                  />
                )}
              </Box>

              <Typography variant='body2' color='text.secondary' sx={{ mb: 1.5, lineHeight: 1.4 }}>
                {project.description}
              </Typography>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1.5 }}>
                {project.technologies.map((tech, techIndex) => (
                  <Chip
                    key={techIndex}
                    label={tech}
                    size='small'
                    variant='outlined'
                    sx={{ fontSize: '0.7rem', height: '24px' }}
                  />
                ))}
              </Box>

              <CardActions sx={{ p: 0, gap: 1 }}>
                <Button
                  size='small'
                  color='primary'
                  href={project.liveUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  startIcon={<LaunchIcon fontSize='small' />}
                  sx={{ textTransform: 'none' }}
                  aria-label={`Visit ${project.title} - ${project.description} (opens in new window)`}
                >
                  Visit {project.title}
                </Button>
                {project.githubUrl && (
                  <Button
                    size='small'
                    color='secondary'
                    href={project.githubUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    startIcon={<GitHubIcon fontSize='small' />}
                    sx={{ textTransform: 'none' }}
                    aria-label={`View ${project.title} source code on GitHub (opens in new window)`}
                  >
                    Source Code
                  </Button>
                )}
              </CardActions>
            </Box>
          ))}
        </Box>
      </CardContent>
    </SectionCard>
  )
}

export default Projects
