import { Box, Card, CardContent, Typography } from '@mui/material'
import React from 'react'
import { helmetJsonLdProp } from 'react-schemaorg'
import { Occupation } from 'schema-dts'
import { Helmet } from 'react-helmet'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline'

type Experience = {
  title: string
  company: string
  duration: string
  bullets: string[]
}

const Experience: React.FC<Experience> = ({ title, company, duration, bullets }) => (
  <React.Fragment>
    <Helmet
      script={[
        helmetJsonLdProp<Occupation>({
          '@context': 'https://schema.org',
          '@type': 'Occupation',
          name: title,
          responsibilities: bullets.join(' '),
        }),
      ]}
    />
    <Card style={{ marginTop: 16 }}>
      <CardContent>
        <Typography
          variant='h5'
          gutterBottom
          component='h2'
          sx={{ display: 'flex', alignItems: 'center', fontWeight: 600 }}
        >
          <WorkOutlineIcon
            sx={{ mr: 1, color: 'text.secondary' }}
            fontSize='medium'
            aria-hidden='true'
          />
          {title}
        </Typography>
        <Typography variant='subtitle1' color='textSecondary' component='p'>
          {company} - {duration}
        </Typography>
        {bullets.map((bullet, key) => (
          <Box marginTop={2} key={key}>
            <Typography variant='body1'>{bullet}</Typography>
          </Box>
        ))}
      </CardContent>
    </Card>
  </React.Fragment>
)
export default Experience
