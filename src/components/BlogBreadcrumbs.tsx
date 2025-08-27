import React from 'react'
import { Box, Typography, Link, Breadcrumbs } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

interface BlogBreadcrumbsProps {
  title: string
}

const BlogBreadcrumbs: React.FC<BlogBreadcrumbsProps> = ({ title }) => (
  <Box mb={2}>
    <Breadcrumbs aria-label='breadcrumb'>
      <Link component={RouterLink} color='inherit' to='/'>
        Home
      </Link>
      <Typography color='textPrimary'>{title}</Typography>
    </Breadcrumbs>
  </Box>
)

export default BlogBreadcrumbs
