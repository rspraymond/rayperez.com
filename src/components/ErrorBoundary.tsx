import React, { Component, ReactNode } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ErrorOutline from '@mui/icons-material/ErrorOutline'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    })

    // Log error in development
    if (import.meta.env.DEV) {
      console.error('Error caught by boundary:', error, errorInfo)
    }
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            width: '100vw',
            bgcolor: 'background.default',
            p: 3,
            textAlign: 'center',
          }}
        >
          <ErrorOutline sx={{ fontSize: 64, color: 'error.main', mb: 2 }} />
          <Typography variant='h4' component='h1' gutterBottom>
            Something went wrong
          </Typography>
          <Typography variant='body1' color='text.secondary' sx={{ mb: 3, maxWidth: 600 }}>
            We apologize for the inconvenience. Please try refreshing the page.
          </Typography>
          <Button variant='contained' onClick={this.handleReload} sx={{ mb: 3 }}>
            Refresh Page
          </Button>

          {import.meta.env.DEV && this.state.error && (
            <Box
              sx={{
                mt: 3,
                p: 2,
                bgcolor: 'background.paper',
                borderRadius: 1,
                maxWidth: '80%',
                overflow: 'auto',
                textAlign: 'left',
              }}
            >
              <Typography variant='h6' gutterBottom>
                Error Details (Development Only):
              </Typography>
              <Typography variant='body2' component='pre' sx={{ fontSize: '0.75rem', mb: 2 }}>
                {this.state.error.toString()}
              </Typography>
              {this.state.errorInfo && (
                <Typography variant='body2' component='pre' sx={{ fontSize: '0.75rem' }}>
                  {this.state.errorInfo.componentStack}
                </Typography>
              )}
            </Box>
          )}
        </Box>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
