import React, { useState, useMemo } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { materialDark, materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useTheme as useCustomTheme } from '../contexts/useTheme'
import { Box, Dialog, IconButton, Tooltip, Snackbar, useTheme } from '@mui/material'
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
  const { themeMode } = useCustomTheme()
  const theme = useTheme()
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

  const customizedSyntaxTheme = useMemo(() => {
    const baseTheme = themeMode === 'light' ? materialLight : materialDark
    if (themeMode === 'light') {
      return {
        ...baseTheme,
        'code[class*="language-"]': {
          ...baseTheme['code[class*="language-"]'],
          background: 'transparent',
        },
        'pre[class*="language-"]': {
          ...baseTheme['pre[class*="language-"]'],
          background: 'transparent',
          margin: 0,
        },
        comment: {
          ...baseTheme.comment,
          color: '#6b7280',
          fontStyle: 'italic',
        },
        keyword: {
          ...baseTheme.keyword,
          color: '#7c3aed',
          fontWeight: '600',
        },
        string: {
          ...baseTheme.string,
          color: '#059669',
        },
        function: {
          ...baseTheme.function,
          color: '#0284c7',
        },
        number: {
          ...baseTheme.number,
          color: '#dc2626',
        },
        operator: {
          ...baseTheme.operator,
          color: '#7c2d12',
        },
        punctuation: {
          ...baseTheme.punctuation,
          color: '#374151',
        },
        property: {
          ...baseTheme.property,
          color: '#7c3aed',
        },
        'class-name': {
          ...baseTheme['class-name'],
          color: '#c2410c',
        },
      }
    }
    return {
      ...baseTheme,
      'code[class*="language-"]': {
        ...baseTheme['code[class*="language-"]'],
        background: 'transparent',
      },
      'pre[class*="language-"]': {
        ...baseTheme['pre[class*="language-"]'],
        background: 'transparent',
        margin: 0,
      },
    }
  }, [themeMode])

  const codeBlock = (
    <Box
      sx={{
        position: 'relative',
        borderRadius: 3,
        overflow: 'hidden',
        border:
          themeMode === 'light'
            ? '1px solid rgba(226, 232, 240, 0.8)'
            : `1px solid ${theme.palette.divider}`,
        backgroundColor:
          themeMode === 'light' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(23, 28, 38, 0.6)',
        boxShadow:
          themeMode === 'light'
            ? '0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 10px 15px -3px rgba(15, 23, 42, 0.1), 0 0 0 1px rgba(15, 23, 42, 0.05)'
            : '0 8px 24px rgba(0, 0, 0, 0.4)',
        backgroundImage:
          themeMode === 'light'
            ? 'linear-gradient(180deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%)'
            : 'linear-gradient(180deg, rgba(28, 33, 48, 0.9) 0%, rgba(17, 22, 34, 0.9) 100%)',
      }}
    >
      <SyntaxHighlighter
        language={language}
        style={customizedSyntaxTheme}
        customStyle={{
          margin: 0,
          borderRadius: theme.spacing(3),
          background: 'transparent',
          padding: theme.spacing(2),
        }}
      >
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
            backgroundImage:
              themeMode === 'light'
                ? 'linear-gradient(180deg, #f5f7fb 0%, #ffffff 100%)'
                : 'linear-gradient(180deg, #0f1218 0%, #171c26 100%)',
          },
        }}
        TransitionProps={{
          timeout: 200,
        }}
      >
        <Box
          sx={{
            position: 'relative',
            height: '100vh',
            width: '100vw',
            bgcolor: 'inherit',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
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
          <Box
            sx={{
              flex: 1,
              width: '100%',
              overflow: 'auto',
              p: theme.spacing(4),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                width: '100%',
                maxWidth: '1400px',
                borderRadius: 3,
                overflow: 'hidden',
                border:
                  themeMode === 'light'
                    ? '1px solid rgba(226, 232, 240, 0.8)'
                    : `1px solid ${theme.palette.divider}`,
                backgroundColor:
                  themeMode === 'light' ? 'rgba(255, 255, 255, 0.98)' : 'rgba(23, 28, 38, 0.7)',
                boxShadow:
                  themeMode === 'light'
                    ? '0 10px 15px -3px rgba(15, 23, 42, 0.1), 0 4px 6px -2px rgba(15, 23, 42, 0.05), 0 0 0 1px rgba(15, 23, 42, 0.05)'
                    : '0 12px 40px rgba(0, 0, 0, 0.5)',
                backgroundImage:
                  themeMode === 'light'
                    ? 'linear-gradient(180deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%)'
                    : 'linear-gradient(180deg, rgba(28, 33, 48, 0.95) 0%, rgba(17, 22, 34, 0.95) 100%)',
              }}
            >
              <SyntaxHighlighter
                language={language}
                style={customizedSyntaxTheme}
                customStyle={{
                  margin: 0,
                  borderRadius: theme.spacing(3),
                  background: 'transparent',
                  padding: theme.spacing(3),
                }}
              >
                {children}
              </SyntaxHighlighter>
            </Box>
          </Box>
        </Box>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        autoHideDuration={1500}
        message='Code copied'
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        TransitionProps={{
          timeout: 200,
        }}
        sx={{
          '& .MuiSnackbarContent-root': {
            backgroundImage: 'none',
            bgcolor: themeMode === 'light' ? 'grey.900' : 'grey.800',
            color: 'common.white',
            backdropFilter: 'blur(8px)',
            boxShadow:
              themeMode === 'light'
                ? '0 8px 24px rgba(0, 0, 0, 0.2)'
                : '0 8px 24px rgba(0, 0, 0, 0.5)',
            borderRadius: 2,
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
