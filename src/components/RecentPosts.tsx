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
import { useLocation } from 'react-router-dom'
import RouterLinkRef from '../utils/RouterLink'
import ArticleIcon from '@mui/icons-material/Article'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import { posts as allPosts } from '../constants/posts'
import SidebarCollapsibleCard from './SidebarCollapsibleCard'

// Define the structure of each post
export interface Post {
  title: string
  path: string
}

// Use the 5 most recent posts by date
const recentPosts: { title: string; path: string }[] = [...allPosts]
  .sort((a, b) => {
    if (a.date === b.date) return a.path.localeCompare(b.path)
    return a.date < b.date ? 1 : -1 // Descending (newest first)
  })
  .slice(0, 5)
  .map(({ title, path }) => ({ title, path }))

interface PostItemProps {
  post: Post
  index: number
  theme: Theme
}

const PostItem = memo(({ post, index, theme }: PostItemProps) => {
  const location = useLocation()
  const isActive = location.pathname === post.path

  return (
    <React.Fragment>
      {index > 0 && <Divider component='li' variant='inset' />}
      <ListItem
        component={RouterLinkRef}
        to={post.path}
        aria-current={isActive ? 'page' : undefined}
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
  posts?: { title: string; path: string }[]
}

const RecentPosts: React.FC<RecentPostsProps> = ({ posts = recentPosts }) => {
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
    <SidebarCollapsibleCard
      title='Recent Posts'
      icon={<ArticleIcon fontSize='small' />}
      expanded={expanded}
      onToggle={handleToggle}
      collapseLabel='collapse posts'
      expandLabel='expand posts'
    >
      <List disablePadding>{memoizedPosts}</List>
    </SidebarCollapsibleCard>
  )
}

export default memo(RecentPosts)
