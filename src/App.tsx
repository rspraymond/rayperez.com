import { ThemeProvider as MuiThemeProvider } from '@mui/material'
import React, { useEffect, lazy, Suspense } from 'react'
import { BrowserRouter, useNavigate, Routes, Route } from 'react-router-dom'
import LoadingFallback from './components/LoadingFallback'
import { ThemeProvider } from './contexts/ThemeContext'
import { useTheme } from './contexts/useTheme'
import { BookmarkProvider } from './contexts/BookmarkContext'

// Lazy load all page components
const Home = lazy(() => import('./pages/Home.tsx'))
const WhyMVC = lazy(() => import('./pages/articles/WhyMVC.tsx'))
const WhyNest = lazy(() => import('./pages/articles/WhyNest.tsx'))
const WhyGraphQL = lazy(() => import('./pages/articles/WhyGraphQL.tsx'))
const WhyNodeJS = lazy(() => import('./pages/articles/WhyNodeJS.tsx'))
const WhyTypescript = lazy(() => import('./pages/articles/WhyTypescript.tsx'))
const WhyReactJS = lazy(() => import('./pages/articles/WhyReactJS.tsx'))
const WhyLaravel = lazy(() => import('./pages/articles/WhyLaravel.tsx'))
const WhyInertia = lazy(() => import('./pages/articles/WhyInertia.tsx'))
const WhyOOP = lazy(() => import('./pages/articles/WhyOOP.tsx'))
const WhyWebDev = lazy(() => import('./pages/articles/WhyWebDev.tsx'))
const NotFound = lazy(() => import('./pages/NotFound.tsx'))
const WhyOpinionated = lazy(() => import('./pages/articles/WhyOpinionated.tsx'))

const AppContent: React.FC = () => {
  const { theme } = useTheme()

  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <HashRedirectHandler />
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/why-mvc-pattern' element={<WhyMVC />} />
            <Route path='/why-nestjs' element={<WhyNest />} />
            <Route path='/why-graphql' element={<WhyGraphQL />} />
            <Route path='/why-nodejs' element={<WhyNodeJS />} />
            <Route path='/why-typescript' element={<WhyTypescript />} />
            <Route path='/why-react' element={<WhyReactJS />} />
            <Route path='/why-laravel' element={<WhyLaravel />} />
            <Route path='/why-inertia' element={<WhyInertia />} />
            <Route path='/why-oop' element={<WhyOOP />} />
            <Route path='/why-web-development' element={<WhyWebDev />} />
            <Route path='/why-opinionated' element={<WhyOpinionated />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </MuiThemeProvider>
  )
}

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <BookmarkProvider>
        <AppContent />
      </BookmarkProvider>
    </ThemeProvider>
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
