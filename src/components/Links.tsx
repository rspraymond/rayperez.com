import React from 'react'
import { Button, Card, CardContent, CardActions, Typography } from '@mui/material'

type Link = {
  text: string
  href: string
}

const Links: React.FC<{ links: Link[] }> = ({ links }) => (
  <Card style={{ marginTop: 16, marginBottom: 16 }}>
    <CardContent>
      <Typography gutterBottom variant='h5' component='h2'>
        Links
      </Typography>
    </CardContent>
    <CardActions>
      {links.map((link) => (
        <Button
          size='small'
          color='primary'
          href={link.href}
          target='_blank'
          key={link.href}
          component='a'
        >
          {link.text}
        </Button>
      ))}
    </CardActions>
  </Card>
)

export default Links
