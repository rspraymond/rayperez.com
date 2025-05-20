import React from 'react'
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material'

type Link = {
  text: string
  href: string
}

const Links: React.FC<{ links: Link[] }> = ({ links }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Card sx={{ mt: 2, mb: 2 }}>
      <CardContent sx={{ pb: 0 }}>
        <Typography variant='h5' component='h2'>
          Links
        </Typography>
      </CardContent>
      <CardActions
        disableSpacing
        sx={{
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          gap: 1,
          p: isMobile ? 2 : undefined,
        }}
      >
        {links.map((link) => (
          <Button
            size='small'
            color='primary'
            href={link.href}
            target='_blank'
            key={link.href}
            component='a'
            fullWidth={isMobile}
            sx={isMobile ? { justifyContent: 'flex-start' } : undefined}
          >
            {link.text}
          </Button>
        ))}
      </CardActions>
    </Card>
  )
}

export default Links
