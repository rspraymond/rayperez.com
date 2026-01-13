import React from 'react'
import JsonBlogPost from '../../components/JsonBlogPost'
import { ArticleContent } from '../../types/articleContent'
import { caseStudies } from '../../constants/caseStudies'
import articleContent from '../../data/case-studies/prejump.json'
import caseStudyMetadata from '../../data/case-studies/prejump-metadata.json'
import { PROFILE } from '../../constants/profile'
import { Box, Typography, Chip, Stack, Link, Card, CardContent, Divider } from '@mui/material'
import LaunchIcon from '@mui/icons-material/Launch'
import { useLocation } from 'react-router-dom'
import { CaseStudyMetadata } from '../../types/caseStudy'

const metadata = caseStudyMetadata as CaseStudyMetadata

const Prejump = (): React.ReactElement => {
  const location = useLocation()
  const caseStudy = caseStudies.find((cs) => cs.path === location.pathname)

  if (!caseStudy) {
    return (
      <JsonBlogPost
        title={caseStudies[0]?.title || 'Prejump.com: Rocket League Training Pack Platform'}
        author={PROFILE.name}
        date={caseStudies[0]?.date || '2025-01-01'}
        content={articleContent as ArticleContent[]}
      />
    )
  }

  const metadataCard = (
    <Card
      elevation={2}
      sx={{
        borderRadius: 3,
        border: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
        <Stack spacing={3}>
          <Box>
            <Typography variant='body2' color='text.secondary' sx={{ mb: 1, fontWeight: 500 }}>
              Project
            </Typography>
            <Typography variant='h6' component='div' sx={{ fontWeight: 600 }}>
              {metadata.project}
            </Typography>
          </Box>
          <Divider />
          <Box>
            <Typography variant='body2' color='text.secondary' sx={{ mb: 1, fontWeight: 500 }}>
              Role
            </Typography>
            <Typography variant='body1' component='div'>
              {metadata.role}
            </Typography>
          </Box>
          <Divider />
          <Box>
            <Typography variant='body2' color='text.secondary' sx={{ mb: 1, fontWeight: 500 }}>
              Timeline
            </Typography>
            <Chip
              label={metadata.timeline}
              size='small'
              variant='outlined'
              sx={{ fontWeight: 500 }}
            />
          </Box>
          <Divider />
          {metadata.techStack && metadata.techStack.length > 0 && (
            <Box>
              <Typography variant='body2' color='text.secondary' sx={{ mb: 1.5, fontWeight: 500 }}>
                Tech Stack
              </Typography>
              <Stack direction='row' spacing={1} flexWrap='wrap' useFlexGap>
                {metadata.techStack.map((tech, index) => (
                  <Chip
                    key={index}
                    label={tech}
                    size='small'
                    variant='outlined'
                    sx={{
                      fontWeight: 500,
                      cursor: 'default',
                      pointerEvents: 'none',
                      borderColor: 'divider',
                      bgcolor: 'background.default',
                      '&:hover': {
                        bgcolor: 'background.default',
                        borderColor: 'divider',
                      },
                    }}
                  />
                ))}
              </Stack>
            </Box>
          )}
          {metadata.links.length > 0 && (
            <>
              <Divider />
              <Box>
                <Typography
                  variant='body2'
                  color='text.secondary'
                  sx={{ mb: 1.5, fontWeight: 500 }}
                >
                  Links
                </Typography>
                <Stack direction='row' spacing={2} flexWrap='wrap'>
                  {metadata.links.map((link, index) => (
                    <Link
                      key={index}
                      href={link.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      color='primary'
                      underline='hover'
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 0.5,
                        fontWeight: 500,
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                      }}
                      aria-label={link.ariaLabel}
                    >
                      <LaunchIcon fontSize='small' />
                      {link.label}
                    </Link>
                  ))}
                </Stack>
              </Box>
            </>
          )}
        </Stack>
      </CardContent>
    </Card>
  )

  return (
    <JsonBlogPost
      title={caseStudy.title}
      author={PROFILE.name}
      date={caseStudy.date}
      content={articleContent as ArticleContent[]}
      metadata={metadataCard}
    />
  )
}

export default Prejump
