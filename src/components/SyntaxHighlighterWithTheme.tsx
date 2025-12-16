import React, { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { materialDark, materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useTheme } from '../contexts/useTheme'
import { Box, Dialog, IconButton, Tooltip, Snackbar } from '@mui/material'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import CloseIcon from '@mui/icons-material/Close'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

interface SyntaxHighlighterWithThemeProps {
  language: string
  children: string
}

const SyntaxHighlighterWithTheme: React.FC<SyntaxHighlighterWithThemeProps> = ({
  language,
  children,
}) => {
  const { themeMode } = useTheme()
  const syntaxTheme = themeMode === 'light' ? materialLight : materialDark
  const [fullscreen, setFullscreen] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard && children) {
      navigator.clipboard.writeText(children)
      setSnackbarOpen(true)
    }
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false)
  }

  const codeBlock = (
    <Box sx={{ position: 'relative' }}>
      <SyntaxHighlighter language={language} style={syntaxTheme} customStyle={{ margin: 0 }}>
        {children}
      </SyntaxHighlighter>
      {!fullscreen && (
        <>
          <Tooltip title='Copy code' placement='top'>
            <IconButton
              aria-label='Copy code'
              size='small'
              onClick={handleCopy}
              sx={{ position: 'absolute', top: 8, right: 40, zIndex: 1 }}
            >
              <ContentCopyIcon fontSize='small' />
            </IconButton>
          </Tooltip>
          <Tooltip title='Fullscreen' placement='top'>
            <IconButton
              aria-label='Enter fullscreen'
              size='small'
              onClick={() => setFullscreen(true)}
              sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}
            >
              <FullscreenIcon fontSize='small' />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Box>
  )

  return (
    <>
      {codeBlock}
      <Dialog
        open={fullscreen}
        onClose={() => setFullscreen(false)}
        fullScreen
        aria-label='Code block fullscreen dialog'
        PaperProps={{
          sx: {
            bgcolor: themeMode === 'light' ? 'background.paper' : 'background.default',
            p: 0,
          },
        }}
      >
        <Box sx={{ position: 'relative', height: '100vh', width: '100vw', bgcolor: 'inherit' }}>
          <Tooltip title='Copy code' placement='left'>
            <IconButton
              aria-label='Copy code'
              onClick={handleCopy}
              sx={{ position: 'absolute', top: 16, right: 64, zIndex: 2 }}
            >
              <ContentCopyIcon fontSize='medium' />
            </IconButton>
          </Tooltip>
          <Tooltip title='Close fullscreen' placement='left'>
            <IconButton
              aria-label='Exit fullscreen'
              onClick={() => setFullscreen(false)}
              sx={{ position: 'absolute', top: 16, right: 16, zIndex: 2 }}
            >
              <CloseIcon fontSize='medium' />
            </IconButton>
          </Tooltip>
          <Box sx={{ height: '100%', width: '100%', overflow: 'auto', p: 4 }}>
            <SyntaxHighlighter language={language} style={syntaxTheme} customStyle={{ margin: 0 }}>
              {children}
            </SyntaxHighlighter>
          </Box>
        </Box>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        autoHideDuration={1500}
        message='Code copied'
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{
          '& .MuiSnackbarContent-root': {
            backgroundImage: 'none',
            bgcolor: themeMode === 'light' ? 'grey.900' : 'grey.800',
            color: 'common.white',
          },
          '& .MuiSnackbarContent-message': {
            color: 'common.white',
          },
        }}
      />
    </>
  )
}

export default SyntaxHighlighterWithTheme
