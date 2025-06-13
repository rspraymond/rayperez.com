import React from 'react'
import { Box, CircularProgress } from '@mui/material'

const LoadingFallback: React.FC = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      width: '100vw',
      bgcolor: 'background.default',
      margin: 0,
      padding: 0,
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1300,
    }}
  >
    <CircularProgress size={60} />
  </Box>
)

export default LoadingFallback
