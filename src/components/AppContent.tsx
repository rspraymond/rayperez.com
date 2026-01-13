import { ThemeProvider as MuiThemeProvider } from '@mui/material'
import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoadingFallback from './LoadingFallback'
import PrintStyles from './PrintStyles'
import { useTheme } from '../contexts/useTheme'
import { posts } from '../constants/posts'
import { caseStudies } from '../constants/caseStudies'
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
              <Route
                key={post.path}
                path={post.path}
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <post.Component />
                  </Suspense>
                }
              />
            ))}
            {caseStudies.map((caseStudy) => (
              <Route
                key={caseStudy.path}
                path={caseStudy.path}
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <caseStudy.Component />
                  </Suspense>
                }
              />
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
