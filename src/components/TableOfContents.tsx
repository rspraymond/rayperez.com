import React, { useEffect, useRef, useState } from 'react'
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
  IconButton,
  Box,
} from '@mui/material'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

interface HeadingItem {
  id: string
  text: string
  level: number
}

const extractHeadings = (): HeadingItem[] => {
  const headingElements = document.querySelectorAll('h3, h5')
  const headingItems: HeadingItem[] = []

  headingElements.forEach((heading, index) => {
    const text = heading.textContent?.trim()
    if (!text) return

    // Skip "Key Takeaways" and "Frequently Asked Questions" headings
    if (text === 'Key Takeaways' || text === 'Frequently Asked Questions') return

    const level = parseInt(heading.tagName.charAt(1))
    let id = heading.id

    // Generate ID if not present
    if (!id) {
      id = `heading-${index}-${text.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
      heading.id = id
    }

    headingItems.push({ id, text, level })
  })

  return headingItems
}

const scrollToHeading = (id: string): void => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    // Reflect hash in URL without triggering native jump
    if (typeof window !== 'undefined' && window.history && 'replaceState' in window.history) {
      window.history.replaceState(null, '', `#${id}`)
    } else {
      window.location.hash = id
    }
  }
}

const TableOfContents: React.FC = () => {
  const [headings, setHeadings] = useState<HeadingItem[]>([])
  const [isExpanded, setIsExpanded] = useState(true)
  const hasScrolledOnLoadRef = useRef(false)

  useEffect(() => {
    // Extract headings after component mounts and content is rendered
    const timer = setTimeout(() => {
      setHeadings(extractHeadings())
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Scroll to hash target on initial load once headings are available
  useEffect(() => {
    if (hasScrolledOnLoadRef.current) return
    if (headings.length === 0) return

    const hash = typeof window !== 'undefined' ? window.location.hash : ''
    if (!hash) return

    const targetId = decodeURIComponent(hash.replace(/^#/, ''))
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      hasScrolledOnLoadRef.current = true
    }
  }, [headings])

  const toggleExpanded = (): void => {
    setIsExpanded(!isExpanded)
  }

  // Don't render if no headings found
  if (headings.length === 0) {
    return null
  }

  return (
    <Paper
      elevation={1}
      sx={{
        mb: 3,
        bgcolor: 'background.paper',
      }}
    >
      <Box
        display='flex'
        alignItems='center'
        sx={{
          px: 3,
          py: 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
          cursor: 'pointer',
          '&:hover': {
            bgcolor: 'action.hover',
          },
        }}
        onClick={toggleExpanded}
      >
        <Typography
          variant='subtitle2'
          sx={{ fontWeight: 600, color: 'text.primary', flexGrow: 1 }}
        >
          Table of Contents
        </Typography>
        <IconButton
          size='small'
          sx={{ color: 'text.secondary' }}
          aria-label={isExpanded ? 'collapse table of contents' : 'expand table of contents'}
        >
          {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>
      <Collapse in={isExpanded}>
        <List dense sx={{ py: 0 }}>
          {headings.map((heading) => (
            <ListItem key={heading.id} disablePadding>
              <ListItemButton
                onClick={() => scrollToHeading(heading.id)}
                sx={{
                  pl: heading.level === 3 ? 2 : 3,
                  py: 0.75,
                  minHeight: 'auto',
                  '&:hover': {
                    bgcolor: 'action.hover',
                    '& .MuiListItemText-primary': {
                      color: 'primary.main',
                    },
                  },
                }}
              >
                <ListItemText
                  primary={heading.text}
                  primaryTypographyProps={{
                    variant: 'body2',
                    sx: {
                      fontSize: heading.level === 3 ? '0.875rem' : '0.8125rem',
                      fontWeight: heading.level === 3 ? 500 : 400,
                      color: 'text.secondary',
                      lineHeight: 1.4,
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </Paper>
  )
}

export default TableOfContents
