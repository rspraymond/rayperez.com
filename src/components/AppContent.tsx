import { ThemeProvider as MuiThemeProvider } from '@mui/material'
import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import LoadingFallback from './LoadingFallback'
import PrintStyles from './PrintStyles'
import { useTheme } from '../contexts/useTheme'
import { posts } from '../constants/posts'
import { caseStudies } from '../constants/caseStudies'
import { ABOUT_PATH } from '../constants/paths'
import HashRedirectHandler from './HashRedirectHandler'
import ScrollAndFocusReset from './ScrollAndFocusReset'
import SiteLayout from './SiteLayout'

const Home = lazy(() => import('../pages/Home'))
const About = lazy(() => import('../pages/About'))
const NotFound = lazy(() => import('../pages/NotFound'))

const AppContent: React.FC = () => {
  const { theme } = useTheme()

  return (
    <MuiThemeProvider theme={theme}>
      <PrintStyles />
      <HashRedirectHandler />
      <ScrollAndFocusReset />
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
          <Route
            path={ABOUT_PATH}
            element={
              <Suspense fallback={<LoadingFallback />}>
                <About />
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
    </MuiThemeProvider>
  )
}

export default AppContent
