import React, { useState, memo, useMemo } from 'react'
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
  Theme,
} from '@mui/material'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import { useBookmarks, BookmarkedArticle } from '../hooks/useBookmarks'

interface BookmarkItemProps {
  bookmark: BookmarkedArticle
  index: number
  theme: Theme
}

const BookmarkItem = memo(({ bookmark, index, theme }: BookmarkItemProps) => {
  return (
    <React.Fragment>
      {index > 0 && <Divider component='li' variant='inset' />}
      <ListItem
        component={Link}
        href={bookmark.path}
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
          primary={bookmark.title}
          primaryTypographyProps={{
            variant: 'body2',
            fontWeight: 'medium',
          }}
        />
      </ListItem>
    </React.Fragment>
  )
})

const BookmarkedPosts: React.FC = () => {
  const theme = useTheme()
  const [expanded, setExpanded] = useState(true) // Start expanded by default
  const { bookmarks } = useBookmarks()

  // Sort bookmarks by date (most recent first) and memoize
  const memoizedBookmarks = useMemo(() => {
    const sortedBookmarks = [...bookmarks].sort(
      (a, b) => new Date(b.dateBookmarked).getTime() - new Date(a.dateBookmarked).getTime(),
    )

    return sortedBookmarks.map((bookmark, index) => (
      <BookmarkItem key={bookmark.path} bookmark={bookmark} index={index} theme={theme} />
    ))
  }, [bookmarks, theme])

  // Don't render if no bookmarks
  if (bookmarks.length === 0) {
    return null
  }

  const handleToggle = () => {
    setExpanded((prev) => !prev)
  }

  return (
    <Paper
      elevation={3}
      sx={{
        p: 0,
        borderRadius: 3,
        overflow: 'hidden',
        border: `1px solid ${theme.palette.divider}`,
        width: '100%',
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
          <BookmarkIcon fontSize='small' sx={{ color: theme.palette.primary.main }} />
          <Typography variant='h6' component='h2' fontWeight='500'>
            Bookmarked Articles ({bookmarks.length})
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
          aria-label={expanded ? 'collapse bookmarks' : 'expand bookmarks'}
        >
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>

      <Collapse in={expanded} timeout='auto'>
        <List disablePadding>{memoizedBookmarks}</List>
      </Collapse>
    </Paper>
  )
}

export default memo(BookmarkedPosts)
