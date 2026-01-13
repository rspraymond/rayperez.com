import React from 'react'
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  Box,
  Link,
  useTheme,
  Typography,
} from '@mui/material'
import { SxProps, Theme } from '@mui/material/styles'
import { parseMarkdownLinks } from '../utils/parseMarkdownLinks'

export interface ArticleListProps {
  items: string[]
  variant?: 'standard' | 'emphasized'
  dense?: boolean
  icon?: React.ReactNode
  hideBullets?: boolean
  sx?: SxProps<Theme>
}

export interface ArticleComplexListProps {
  items: Array<{
    primary: string
    secondary?: string
    link?: {
      href: string
      title: string
      target?: '_blank' | '_self' | '_parent' | '_top'
    }
  }>
  variant?: 'standard' | 'emphasized'
  dense?: boolean
  icon?: React.ReactNode
  hideBullets?: boolean
  sx?: SxProps<Theme>
}

const BulletIcon: React.FC = () => {
  const theme = useTheme()
  return (
    <Box
      component='span'
      sx={{
        color: theme.palette.text.secondary,
        fontSize: '0.875rem',
        lineHeight: 1.7,
        fontWeight: 400,
        flexShrink: 0,
        userSelect: 'none',
        display: 'inline-block',
      }}
    >
      –
    </Box>
  )
}

const ArticleList: React.FC<ArticleListProps> = ({
  items,
  variant = 'standard',
  dense = false,
  icon,
  hideBullets = false,
  sx,
}) => {
  const theme = useTheme()
  const bulletIcon = icon || <BulletIcon />

  const listContent = (
    <List
      disablePadding
      dense={dense}
      sx={{
        mb: 3,
        ...sx,
      }}
    >
      {items.map((item, index) => (
        <ListItem
          key={`list-item-${index}`}
          alignItems='flex-start'
          disableGutters
          sx={{
            px: 0,
            py: dense ? 1 : 1.25,
            '&:first-of-type': {
              pt: 0,
            },
            '&:last-of-type': {
              pb: 0,
            },
          }}
        >
          {!hideBullets && (
            <ListItemIcon
              sx={{
                minWidth: 20,
                mt: 0,
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                pr: 1.5,
              }}
            >
              {bulletIcon}
            </ListItemIcon>
          )}
          <ListItemText
            primary={
              <Typography
                variant='body1'
                sx={{
                  lineHeight: 1.7,
                  color: 'text.primary',
                }}
              >
                {parseMarkdownLinks(item).map((segment, segIndex) =>
                  segment.type === 'link' ? (
                    <Link
                      key={`link-${index}-${segIndex}`}
                      href={segment.href}
                      target='_blank'
                      rel={
                        segment.href?.includes('top.gg')
                          ? 'noopener noreferrer nofollow'
                          : 'noopener noreferrer'
                      }
                      color='primary'
                      underline='hover'
                    >
                      {segment.content}
                    </Link>
                  ) : (
                    <React.Fragment key={`text-${index}-${segIndex}`}>
                      {segment.content}
                    </React.Fragment>
                  ),
                )}
              </Typography>
            }
            sx={{
              m: 0,
            }}
          />
        </ListItem>
      ))}
    </List>
  )

  if (variant === 'emphasized') {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
          bgcolor: 'background.paper',
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        {listContent}
      </Paper>
    )
  }

  return listContent
}

export const ArticleComplexList: React.FC<ArticleComplexListProps> = ({
  items,
  variant = 'standard',
  dense = false,
  icon,
  hideBullets = false,
  sx,
}) => {
  const theme = useTheme()
  const bulletIcon = icon || <BulletIcon />

  const listContent = (
    <List
      disablePadding
      dense={dense}
      sx={{
        mb: 3,
        ...sx,
      }}
    >
      {items.map((item, index) => (
        <ListItem
          key={`complex-item-${index}`}
          alignItems='flex-start'
          disableGutters
          sx={{
            px: 0,
            py: dense ? 1 : 1.25,
            '&:first-of-type': {
              pt: 0,
            },
            '&:last-of-type': {
              pb: 0,
            },
          }}
        >
          {!hideBullets && (
            <ListItemIcon
              sx={{
                minWidth: 20,
                mt: 0,
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                pr: 1.5,
              }}
            >
              {bulletIcon}
            </ListItemIcon>
          )}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <ListItemText
              primary={item.primary}
              secondary={item.secondary}
              primaryTypographyProps={{
                variant: 'body1',
                lineHeight: 1.7,
                color: 'text.primary',
                sx: {
                  mt: 0,
                },
              }}
              secondaryTypographyProps={{
                variant: 'body2',
                color: 'text.secondary',
                sx: {
                  mt: 0.5,
                },
              }}
              sx={{
                m: 0,
              }}
            />
            {item.link && (
              <Link
                href={item.link.href}
                target={item.link.target || '_blank'}
                rel={item.link.target === '_blank' ? 'noopener noreferrer' : undefined}
                color='primary'
                underline='hover'
                sx={{
                  mt: 0.5,
                  display: 'inline-block',
                  fontSize: '0.875rem',
                }}
              >
                {item.link.title}
              </Link>
            )}
          </Box>
        </ListItem>
      ))}
    </List>
  )

  if (variant === 'emphasized') {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
          bgcolor: 'background.paper',
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        {listContent}
      </Paper>
    )
  }

  return listContent
}

export default ArticleList
