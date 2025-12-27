import React from 'react'
import { Box, Typography, Link, Breadcrumbs } from '@mui/material'
import RouterLinkRef from '../utils/RouterLink'

interface BlogBreadcrumbsProps {
  title: string
}

const BlogBreadcrumbs: React.FC<BlogBreadcrumbsProps> = ({ title }) => (
  <Box mb={2}>
    <Breadcrumbs aria-label='breadcrumb'>
      <Link component={RouterLinkRef} color='inherit' to='/'>
        Home
      </Link>
      <Typography color='textPrimary'>{title}</Typography>
    </Breadcrumbs>
  </Box>
)

export default BlogBreadcrumbs
