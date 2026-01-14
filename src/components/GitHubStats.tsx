import React, { useState, useEffect, memo, useMemo } from 'react'
import { Box, useTheme, useMediaQuery, Dialog, IconButton, Tooltip } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import CloseIcon from '@mui/icons-material/Close'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import SidebarCollapsibleCard from './SidebarCollapsibleCard'

const GITHUB_USERNAME = 'rspraymond'
const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`
const GRAPH_API_BASE_URL = 'https://github-readme-activity-graph.vercel.app/graph'

const GitHubStats: React.FC = () => {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
  const [expanded, setExpanded] = useState(isDesktop)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    setExpanded(isDesktop)
  }, [isDesktop])

  const handleToggle = () => {
    setExpanded((prev) => !prev)
  }

  const handleImageClick = () => {
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  const handleGitHubClick = () => {
    window.open(GITHUB_PROFILE_URL, '_blank', 'noopener,noreferrer')
  }

  const graphUrl = useMemo(() => {
    // Use visually distinct themes for light and dark mode
    // Common theme options: default, dark, react, react-dark, github, github-dark, dracula, monokai
    const themeParam = theme.palette.mode === 'dark' ? 'react-dark' : 'github'
    return `${GRAPH_API_BASE_URL}?username=${GITHUB_USERNAME}&theme=${themeParam}`
  }, [theme.palette.mode])

  return (
    <SidebarCollapsibleCard
      title='GitHub Activity'
      icon={<GitHubIcon fontSize='small' sx={{ color: theme.palette.primary.main }} />}
      expanded={expanded}
      onToggle={handleToggle}
      collapseLabel='collapse GitHub activity'
      expandLabel='expand GitHub activity'
    >
      <Box
        sx={{
          p: 2,
          cursor: 'pointer',
          '&:hover': {
            opacity: 0.9,
          },
        }}
        onClick={handleImageClick}
        role='button'
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleImageClick()
          }
        }}
        aria-label='Open GitHub activity graph in modal'
      >
        <Box
          component='img'
          src={graphUrl}
          alt='GitHub contribution graph showing coding activity'
          key={`github-graph-${theme.palette.mode}`}
          sx={{
            maxWidth: '100%',
            height: 'auto',
            display: 'block',
          }}
        />
      </Box>
      <Dialog
        open={modalOpen}
        onClose={handleCloseModal}
        maxWidth='lg'
        fullWidth
        aria-labelledby='github-graph-modal-title'
        PaperProps={{
          sx: {
            bgcolor: theme.palette.mode === 'light' ? 'background.paper' : 'background.default',
            borderRadius: 3,
          },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              display: 'flex',
              gap: 1,
              zIndex: 2,
            }}
          >
            <Tooltip title='View on GitHub' placement='left'>
              <IconButton
                aria-label='View GitHub profile (opens in new window)'
                onClick={handleGitHubClick}
                sx={{
                  bgcolor:
                    theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.1)'
                      : 'rgba(0, 0, 0, 0.05)',
                  '&:hover': {
                    bgcolor:
                      theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.2)'
                        : 'rgba(0, 0, 0, 0.1)',
                  },
                }}
              >
                <OpenInNewIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title='Close' placement='left'>
              <IconButton
                aria-label='Close modal'
                onClick={handleCloseModal}
                sx={{
                  bgcolor:
                    theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.1)'
                      : 'rgba(0, 0, 0, 0.05)',
                  '&:hover': {
                    bgcolor:
                      theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.2)'
                        : 'rgba(0, 0, 0, 0.1)',
                  },
                }}
              >
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Box
            component='img'
            src={graphUrl}
            alt='GitHub contribution graph showing coding activity'
            key={`github-graph-modal-${theme.palette.mode}`}
            sx={{
              width: '100%',
              height: 'auto',
              display: 'block',
              borderRadius: 2,
            }}
          />
        </Box>
      </Dialog>
    </SidebarCollapsibleCard>
  )
}

export default memo(GitHubStats)
