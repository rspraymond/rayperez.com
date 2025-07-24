import { ThemeProvider as MuiThemeProvider } from '@mui/material'
import React, { useEffect, Suspense } from 'react'
import { BrowserRouter, useNavigate, Routes, Route } from 'react-router-dom'
import LoadingFallback from './components/LoadingFallback'
import ErrorBoundary from './components/ErrorBoundary'
import PrintStyles from './components/PrintStyles'
import { ThemeProvider } from './contexts/ThemeContext'
import { useTheme } from './contexts/useTheme'
import { BookmarkProvider } from './contexts/BookmarkContext'
import { posts } from './constants/posts'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

const AppContent: React.FC = () => {
  const { theme } = useTheme()

  return (
    <MuiThemeProvider theme={theme}>
      <PrintStyles />
      <BrowserRouter>
        <HashRedirectHandler />
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path='/' element={<Home />} />
            {posts.map((post) => (
              <Route key={post.path} path={post.path} element={<post.Component />} />
            ))}
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </MuiThemeProvider>
  )
}

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <BookmarkProvider>
          <AppContent />
        </BookmarkProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

const HashRedirectHandler: React.FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const path = (/#!(\/.*)$/.exec(window.location.hash) || [])[1]
    if (path) {
      navigate(path, { replace: true })
    }
  }, [navigate])

  return null
}

export default App
