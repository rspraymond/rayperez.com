import { ThemeProvider as MuiThemeProvider } from '@mui/material'
import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoadingFallback from './LoadingFallback'
import PrintStyles from './PrintStyles'
import { useTheme } from '../contexts/useTheme'
import { posts } from '../constants/posts'
import HashRedirectHandler from './HashRedirectHandler'
import SiteLayout from './SiteLayout'

const Home = lazy(() => import('../pages/Home'))
const NotFound = lazy(() => import('../pages/NotFound'))

const AppContent: React.FC = () => {
  const { theme } = useTheme()

  return (
    <MuiThemeProvider theme={theme}>
      <PrintStyles />
      <BrowserRouter>
        <HashRedirectHandler />
        <Routes>
          <Route element={<SiteLayout />}>
            <Route
              path='/'
              element={
                <Suspense fallback={<LoadingFallback />}>
                  <Home />
                </Suspense>
              }
            />
            {posts.map((post) => (
              <Route key={post.path} path={post.path} element={<post.Component />} />
            ))}
          </Route>
          <Route
            path='*'
            element={
              <Suspense fallback={<LoadingFallback />}>
                <NotFound />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </MuiThemeProvider>
  )
}

export default AppContent
