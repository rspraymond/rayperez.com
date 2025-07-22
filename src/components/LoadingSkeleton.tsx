import React from 'react'
import { Box, Skeleton } from '@mui/material'

interface LoadingSkeletonProps {
  testId?: string
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ testId }) => {
  return (
    <Box sx={{ width: '100%', mb: 2 }} data-testid={testId || 'skeleton-container'}>
      <Skeleton variant='rectangular' height={60} sx={{ mb: 1 }} />
      <Skeleton variant='text' width='60%' height={24} sx={{ mb: 0.5 }} />
      <Skeleton variant='text' width='40%' height={24} sx={{ mb: 0.5 }} />
      <Skeleton variant='text' width='80%' height={24} />
    </Box>
  )
}

export default LoadingSkeleton
