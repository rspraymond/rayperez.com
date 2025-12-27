import { forwardRef } from 'react'
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom'
import { LinkProps } from '@mui/material/Link'

const RouterLinkRef = forwardRef<HTMLAnchorElement, RouterLinkProps & Omit<LinkProps, 'component'>>(
  (props, ref) => <RouterLink ref={ref} {...props} />,
)

RouterLinkRef.displayName = 'RouterLinkRef'

export default RouterLinkRef
