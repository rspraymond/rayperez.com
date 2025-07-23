import React from 'react'
import { Box, IconButton, Tooltip } from '@mui/material'
import TwitterIcon from '@mui/icons-material/Twitter'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import FacebookIcon from '@mui/icons-material/Facebook'

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

  const handleShare = (platform: 'twitter' | 'linkedin' | 'facebook') => {
    const shareUrl = getShareUrl(platform, title, url)
    window.open(shareUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <Box display='flex' gap={1} mb={2}>
      <Tooltip title='Share on Twitter'>
        <IconButton
          aria-label='Share on Twitter'
          onClick={() => handleShare('twitter')}
          size='small'
        >
          <TwitterIcon fontSize='small' />
        </IconButton>
      </Tooltip>
      <Tooltip title='Share on LinkedIn'>
        <IconButton
          aria-label='Share on LinkedIn'
          onClick={() => handleShare('linkedin')}
          size='small'
        >
          <LinkedInIcon fontSize='small' />
        </IconButton>
      </Tooltip>
      <Tooltip title='Share on Facebook'>
        <IconButton
          aria-label='Share on Facebook'
          onClick={() => handleShare('facebook')}
          size='small'
        >
          <FacebookIcon fontSize='small' />
        </IconButton>
      </Tooltip>
    </Box>
  )
}

export default SocialShareButtons
