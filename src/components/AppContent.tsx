import { ThemeProvider as MuiThemeProvider } from '@mui/material'
import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoadingFallback from './LoadingFallback'
import PrintStyles from './PrintStyles'
import { useTheme } from '../contexts/useTheme'
import { posts } from '../constants/posts'
import Home from '../pages/Home'
import NotFound from '../pages/NotFound'
import HashRedirectHandler from './HashRedirectHandler'
import SiteLayout from './SiteLayout'

const AppContent: React.FC = () => {
  const { theme } = useTheme()

  return (
    <MuiThemeProvider theme={theme}>
      <PrintStyles />
      <BrowserRouter>
        <HashRedirectHandler />
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route element={<SiteLayout />}>
              <Route path='/' element={<Home />} />
              {posts.map((post) => (
                <Route key={post.path} path={post.path} element={<post.Component />} />
              ))}
            </Route>
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </MuiThemeProvider>
  )
}

export default AppContent
