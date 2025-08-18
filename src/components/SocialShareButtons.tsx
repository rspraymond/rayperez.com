import React from 'react'
import { Box, IconButton, Tooltip, Snackbar } from '@mui/material'
import TwitterIcon from '@mui/icons-material/Twitter'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import FacebookIcon from '@mui/icons-material/Facebook'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

interface SocialShareButtonsProps {
  title: string
}

const getShareUrl = (platform: 'twitter' | 'linkedin' | 'facebook', title: string, url: string) => {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  switch (platform) {
    case 'twitter':
      return `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`
    case 'linkedin':
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
    default:
      return '#'
  }
}

const SocialShareButtons: React.FC<SocialShareButtonsProps> = ({ title }) => {
  const url = typeof window !== 'undefined' ? window.location.href : ''
  const [snackbarOpen, setSnackbarOpen] = React.useState(false)

  const handleShare = (platform: 'twitter' | 'linkedin' | 'facebook') => {
    const shareUrl = getShareUrl(platform, title, url)
    window.open(shareUrl, '_blank', 'noopener,noreferrer')
  }

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard && url) {
      navigator.clipboard.writeText(url)
      setSnackbarOpen(true)
    }
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false)
  }

  return (
    <>
      <Box display='flex' gap={1} mb={2}>
        <Tooltip title='Copy link'>
          <IconButton aria-label='Copy link' onClick={handleCopy} size='small' title='Copy link'>
            <ContentCopyIcon fontSize='small' />
          </IconButton>
        </Tooltip>
        <Tooltip title='Share on Twitter'>
          <IconButton
            aria-label='Share on Twitter'
            onClick={() => handleShare('twitter')}
            size='small'
            title='Share on Twitter'
          >
            <TwitterIcon fontSize='small' />
          </IconButton>
        </Tooltip>
        <Tooltip title='Share on LinkedIn'>
          <IconButton
            aria-label='Share on LinkedIn'
            onClick={() => handleShare('linkedin')}
            size='small'
            title='Share on LinkedIn'
          >
            <LinkedInIcon fontSize='small' />
          </IconButton>
        </Tooltip>
        <Tooltip title='Share on Facebook'>
          <IconButton
            aria-label='Share on Facebook'
            onClick={() => handleShare('facebook')}
            size='small'
            title='Share on Facebook'
          >
            <FacebookIcon fontSize='small' />
          </IconButton>
        </Tooltip>
      </Box>
      <Snackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        autoHideDuration={1500}
        message='Link copied'
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </>
  )
}

export default SocialShareButtons
