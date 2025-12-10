import React, { memo } from 'react'
import {
  Box,
  Collapse,
  IconButton,
  Paper,
  SxProps,
  Theme,
  Typography,
  useTheme,
} from '@mui/material'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

interface SidebarCollapsibleCardProps {
  title: string
  icon: React.ReactNode
  expanded: boolean
  onToggle: () => void
  collapseLabel: string
  expandLabel: string
  children: React.ReactNode
  headerSx?: SxProps<Theme>
}

const SidebarCollapsibleCard: React.FC<SidebarCollapsibleCardProps> = ({
  title,
  icon,
  expanded,
  onToggle,
  collapseLabel,
  expandLabel,
  children,
  headerSx,
}) => {
  const theme = useTheme()

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
          ...headerSx,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {icon}
          <Typography variant='h6' component='h2' fontWeight='500'>
            {title}
          </Typography>
        </Box>
        <IconButton
          size='small'
          onClick={onToggle}
          sx={{
            color: theme.palette.primary.contrastText,
            opacity: 0.8,
            '&:hover': {
              opacity: 1,
              bgcolor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
          aria-expanded={expanded}
          aria-label={expanded ? collapseLabel : expandLabel}
        >
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>

      <Collapse in={expanded} timeout='auto'>
        {children}
      </Collapse>
    </Paper>
  )
}

export default memo(SidebarCollapsibleCard)
