import { AppBar, Toolbar, Typography, IconButton } from '@mui/material'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import GitHubIcon from '@mui/icons-material/GitHub'
import DescriptionIcon from '@mui/icons-material/Description'

function Header() {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography component='h1' variant='h6' style={{ flexGrow: 1 }}>
          Raymond Perez
        </Typography>
        <IconButton
          href='https://www.linkedin.com/in/raymond-perez-eng/'
          color='inherit'
          component='a'
          target='_blank'
        >
          <LinkedInIcon />
        </IconButton>
        <IconButton
          href='https://github.com/rspraymond'
          color='inherit'
          component='a'
          target='_blank'
        >
          <GitHubIcon />
        </IconButton>
        <IconButton
          href='/raymond-perez-software-engineer-resume.pdf'
          color='inherit'
          component='a'
          target='_blank'
          aria-label='Resume'
        >
          <DescriptionIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default Header
