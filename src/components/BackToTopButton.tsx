import React from 'react'
import { Fab } from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

interface BackToTopButtonProps {
  show: boolean
  onClick: () => void
}

const BackToTopButton: React.FC<BackToTopButtonProps> = ({ show, onClick }) => {
  if (!show) return null

  return (
    <Fab
      size='small'
      onClick={onClick}
      aria-label='back to top'
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        bgcolor: 'background.paper',
        color: 'text.secondary',
        border: '1px solid',
        borderColor: 'divider',
        opacity: 0.8,
        '&:hover': {
          opacity: 1,
          bgcolor: 'action.hover',
          borderColor: 'primary.main',
        },
      }}
    >
      <KeyboardArrowUpIcon />
    </Fab>
  )
}

export default BackToTopButton
