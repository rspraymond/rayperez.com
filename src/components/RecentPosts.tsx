import React, { useState, useEffect, memo, useMemo } from 'react'
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
  Theme,
} from '@mui/material'
import ArticleIcon from '@mui/icons-material/Article'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'

// Define the structure of each post
export interface Post {
  title: string
  path: string
}

// Sample blog posts data - in a real app, this would be fetched from an API or CMS
const defaultPosts: Post[] = [
  {
    title: 'Why I Use MVC Pattern',
    path: '/why-mvc-pattern',
  },
  {
    title: 'Why I Choose React',
    path: '/why-react',
  },
  {
    title: 'Why I Choose Inertia.js',
    path: '/why-inertia',
  },
  {
    title: 'Why I Prefer Opinionated Frameworks',
    path: '/why-opinionated',
  },
  {
    title: 'Why I Choose TypeScript',
    path: '/why-typescript',
  },
  // Removed the last item to keep only 5 most recent posts
]

interface PostItemProps {
  post: Post
  index: number
  theme: Theme
}

const PostItem = memo(({ post, index, theme }: PostItemProps) => {
  return (
    <React.Fragment>
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
  )
})

interface RecentPostsProps {
  posts?: Post[]
}

const RecentPosts: React.FC<RecentPostsProps> = ({ posts = defaultPosts }) => {
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

  // Memoize the posts list to prevent re-rendering when expanded state changes
  const memoizedPosts = useMemo(
    () =>
      posts.map((post, index) => <PostItem key={index} post={post} index={index} theme={theme} />),
    [posts, theme],
  )

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
        <List disablePadding>{memoizedPosts}</List>
      </Collapse>
    </Paper>
  )
}

export default memo(RecentPosts)
