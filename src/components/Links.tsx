import React from 'react'
import { Button, CardActions, useTheme, useMediaQuery } from '@mui/material'
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined'
import SectionCard from './SectionCard'

type Link = {
  text: string
  href: string
}

const Links: React.FC<{ links: Link[] }> = ({ links }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <SectionCard title='Links' icon={LinkOutlinedIcon} marginTop={16} marginBottom={16}>
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
            rel='noopener noreferrer'
            key={link.href}
            component='a'
            fullWidth={isMobile}
            sx={isMobile ? { justifyContent: 'flex-start' } : undefined}
            aria-label={`${link.text} (opens in new window)`}
          >
            {link.text}
          </Button>
        ))}
      </CardActions>
    </SectionCard>
  )
}

export default Links
