import React, { useState, useEffect, memo, useMemo } from 'react'
import {
  Box,
  Dialog,
  IconButton,
  Link,
  Skeleton,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import CloseIcon from '@mui/icons-material/Close'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import SidebarCollapsibleCard from './SidebarCollapsibleCard'

const GITHUB_USERNAME = 'rspraymond'
const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`
const GRAPH_API_BASE_URL = 'https://github-readme-activity-graph.vercel.app/graph'

type GraphStatus = 'loading' | 'loaded' | 'error'

interface GitHubGraphImageProps {
  graphUrl: string
  graphStatus: GraphStatus
  isModal?: boolean
  onLoad: () => void
  onError: () => void
}

const GitHubGraphImage: React.FC<GitHubGraphImageProps> = ({
  graphUrl,
  graphStatus,
  isModal = false,
  onLoad,
  onError,
}) => (
  <Box
    sx={{
      position: 'relative',
      width: '100%',
      minHeight: isModal ? 300 : 150,
    }}
  >
    {graphStatus === 'loading' && (
      <Skeleton
        data-testid='github-activity-skeleton'
        variant='rectangular'
        sx={{
          position: 'absolute',
          inset: 0,
          borderRadius: 1,
        }}
      />
    )}
    <Box
      component='img'
      key={graphUrl}
      src={graphUrl}
      alt='GitHub contribution graph showing coding activity'
      loading='lazy'
      onLoad={onLoad}
      onError={onError}
      sx={{
        width: isModal ? '100%' : undefined,
        maxWidth: '100%',
        height: 'auto',
        display: 'block',
        opacity: graphStatus === 'loaded' ? 1 : 0,
        borderRadius: isModal ? 2 : undefined,
      }}
    />
  </Box>
)

const GitHubStats: React.FC = () => {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
  const [expanded, setExpanded] = useState(isDesktop)
  const [modalOpen, setModalOpen] = useState(false)
  const [graphStatus, setGraphStatus] = useState<GraphStatus>('loading')

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

  useEffect(() => {
    setGraphStatus('loading')
  }, [graphUrl])

  const handleGraphLoad = () => {
    setGraphStatus((currentStatus) => (currentStatus === 'error' ? currentStatus : 'loaded'))
  }

  const handleGraphError = () => {
    setGraphStatus('error')
    setModalOpen(false)
  }

  const isGraphInteractive = graphStatus !== 'error'

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
          cursor: isGraphInteractive ? 'pointer' : 'default',
          '&:hover': {
            opacity: isGraphInteractive ? 0.9 : 1,
          },
        }}
        onClick={isGraphInteractive ? handleImageClick : undefined}
        role={isGraphInteractive ? 'button' : undefined}
        tabIndex={isGraphInteractive ? 0 : undefined}
        onKeyDown={
          isGraphInteractive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleImageClick()
                }
              }
            : undefined
        }
        aria-label={isGraphInteractive ? 'Open GitHub activity graph in modal' : undefined}
      >
        {graphStatus === 'error' ? (
          <Box
            role='status'
            aria-label='GitHub activity unavailable'
            sx={{
              minHeight: 150,
              px: 2,
              py: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              textAlign: 'center',
            }}
          >
            <Typography color='text.secondary'>
              GitHub activity is temporarily unavailable.
            </Typography>
            <Link href={GITHUB_PROFILE_URL} target='_blank' rel='noopener noreferrer'>
              View GitHub profile
            </Link>
          </Box>
        ) : (
          <GitHubGraphImage
            graphUrl={graphUrl}
            graphStatus={graphStatus}
            onLoad={handleGraphLoad}
            onError={handleGraphError}
          />
        )}
      </Box>
      <Dialog
        open={modalOpen && graphStatus !== 'error'}
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
          <GitHubGraphImage
            graphUrl={graphUrl}
            graphStatus={graphStatus}
            isModal
            onLoad={handleGraphLoad}
            onError={handleGraphError}
          />
        </Box>
      </Dialog>
    </SidebarCollapsibleCard>
  )
}

export default memo(GitHubStats)
