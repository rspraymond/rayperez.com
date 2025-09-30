import React, { useState, useEffect, memo, useMemo } from 'react'
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Divider,
  Box,
  ListItemIcon,
  useTheme,
  IconButton,
  Collapse,
  useMediaQuery,
  Theme,
} from '@mui/material'
import ShareIcon from '@mui/icons-material/Share'
import TwitterIcon from '@mui/icons-material/Twitter'
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'

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
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'))
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
    <Paper
      elevation={3}
      sx={{
        p: 0,
        mb: 3,
        borderRadius: 2,
        overflow: 'hidden',
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ShareIcon fontSize='small' />
          <Typography variant='h6' component='h2' fontWeight='500'>
            Socials
          </Typography>
        </Box>
        <IconButton
          size='small'
          onClick={handleToggle}
          sx={{
            color: theme.palette.primary.contrastText,
            opacity: 0.8,
            '&:hover': {
              opacity: 1,
              bgcolor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
          aria-expanded={expanded}
          aria-label={expanded ? 'collapse socials' : 'expand socials'}
        >
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>

      <Collapse in={expanded} timeout='auto'>
        <List disablePadding>{memoizedSocials}</List>
      </Collapse>
    </Paper>
  )
}

export default memo(SidebarSocials)
