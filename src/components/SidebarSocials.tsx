import React, { useState, useEffect, memo, useMemo } from 'react'
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemIcon,
  useTheme,
  useMediaQuery,
  Theme,
} from '@mui/material'
import ShareIcon from '@mui/icons-material/Share'
import TwitterIcon from '@mui/icons-material/Twitter'
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary'
import SidebarCollapsibleCard from './SidebarCollapsibleCard'

type Social = {
  text: string
  href: string
  platform: 'twitter' | 'twitch'
}

interface SocialItemProps {
  social: Social
  index: number
  theme: Theme
}

const SocialItem = memo(({ social, index, theme }: SocialItemProps) => {
  const getIcon = (platform: string) => {
    switch (platform) {
      case 'twitter':
        return <TwitterIcon fontSize='small' />
      case 'twitch':
        return <VideoLibraryIcon fontSize='small' />
      default:
        return <ShareIcon fontSize='small' />
    }
  }

  return (
    <React.Fragment>
      {index > 0 && <Divider component='li' variant='inset' />}
      <ListItem
        component='a'
        href={social.href}
        target='_blank'
        rel='noopener noreferrer'
        sx={{
          py: 1.5,
          px: 2,
          color: 'text.primary',
          textDecoration: 'none',
          transition: 'all 0.2s ease',
          '&:hover': {
            bgcolor: 'action.hover',
            transform: 'translateX(4px)',
          },
        }}
        aria-label={`${social.text} (opens in new window)`}
      >
        <ListItemIcon sx={{ minWidth: 32, color: theme.palette.primary.main }}>
          {getIcon(social.platform)}
        </ListItemIcon>
        <ListItemText
          primary={social.text}
          primaryTypographyProps={{
            variant: 'body2',
            fontWeight: 'medium',
          }}
        />
      </ListItem>
    </React.Fragment>
  )
})

interface SidebarSocialsProps {
  socials?: Social[]
}

const SidebarSocials: React.FC<SidebarSocialsProps> = ({ socials = [] }) => {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
  const [expanded, setExpanded] = useState(isDesktop)

  // Update expanded state when screen size changes
  useEffect(() => {
    setExpanded(isDesktop)
  }, [isDesktop])

  const handleToggle = () => {
    setExpanded((prev) => !prev)
  }

  // Memoize the socials list to prevent re-rendering when expanded state changes
  const memoizedSocials = useMemo(
    () =>
      socials.map((social, index) => (
        <SocialItem key={index} social={social} index={index} theme={theme} />
      )),
    [socials, theme],
  )

  // Don't render if no socials
  if (socials.length === 0) {
    return null
  }

  return (
    <SidebarCollapsibleCard
      title='Socials'
      icon={<ShareIcon fontSize='small' />}
      expanded={expanded}
      onToggle={handleToggle}
      collapseLabel='collapse socials'
      expandLabel='expand socials'
    >
      <List disablePadding>{memoizedSocials}</List>
    </SidebarCollapsibleCard>
  )
}

export default memo(SidebarSocials)
