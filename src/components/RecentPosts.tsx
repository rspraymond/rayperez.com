import React, { useState, useEffect } from 'react'
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Link,
  Divider,
  Box,
  ListItemIcon,
  useTheme,
  IconButton,
  Collapse,
  useMediaQuery,
} from '@mui/material'
import ArticleIcon from '@mui/icons-material/Article'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'

// Define the structure of each post
interface Post {
  title: string
  path: string
}

// Sample blog posts data - in a real app, this would be fetched from an API or CMS
const posts: Post[] = [
  {
    title: 'Why I Prefer Opinionated Frameworks',
    path: '/why-opinionated',
  },
  {
    title: 'Why I Chose NestJS',
    path: '/why-nestjs',
  },
  {
    title: 'Why I Love Laravel',
    path: '/why-laravel',
  },
  {
    title: 'Why OOP Is Important',
    path: '/why-oop',
  },
  {
    title: 'Why ReactJS Is My Frontend Framework of Choice',
    path: '/why-react',
  },
]

const RecentPosts: React.FC = () => {
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
          <ArticleIcon fontSize='small' />
          <Typography variant='h6' component='h2' fontWeight='500'>
            Recent Posts
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
          aria-label={expanded ? 'collapse posts' : 'expand posts'}
        >
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>

      <Collapse in={expanded} timeout='auto'>
        <List disablePadding>
          {posts.map((post, index) => (
            <React.Fragment key={index}>
              {index > 0 && <Divider component='li' variant='inset' />}
              <ListItem
                component={Link}
                href={post.path}
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
              >
                <ListItemIcon sx={{ minWidth: 32, color: theme.palette.primary.main }}>
                  <ArrowRightAltIcon />
                </ListItemIcon>
                <ListItemText
                  primary={post.title}
                  primaryTypographyProps={{
                    variant: 'body2',
                    fontWeight: 'medium',
                  }}
                />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Collapse>
    </Paper>
  )
}

export default RecentPosts
