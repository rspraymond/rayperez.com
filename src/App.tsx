import { createTheme, ThemeProvider } from '@mui/material'
import React from 'react'
import Home from './pages/Home.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import WhyNest from './pages/articles/WhyNest.tsx'
import WhyGraphQL from './pages/articles/WhyGraphQL.tsx'
import WhyNodeJS from './pages/articles/WhyNodeJS.tsx'
import WhyTypescript from './pages/articles/WhyTypescript.tsx'
import WhyReactJS from './pages/articles/WhyReactJS.tsx'
import WhyLaravel from './pages/articles/WhyLaravel.tsx'
import WhyOOP from './pages/articles/WhyOOP.tsx'
import WhyWebDev from './pages/articles/WhyWebDev.tsx'
import NotFound from './pages/NotFound.tsx'
import withCanonical from './components/WithCanonical.tsx'

const router = createBrowserRouter([
  { path: '/', element: withCanonical(Home)({}) },
  { path: '/why-nestjs', element: withCanonical(WhyNest)({}) },
  { path: '/why-graphql', element: withCanonical(WhyGraphQL)({}) },
  { path: '/why-nodejs', element: withCanonical(WhyNodeJS)({}) },
  {
    path: '/why-typescript',
    element: withCanonical(WhyTypescript)({}),
  },
  { path: '/why-react', element: withCanonical(WhyReactJS)({}) },
  { path: '/why-laravel', element: withCanonical(WhyLaravel)({}) },
  { path: '/why-oop', element: withCanonical(WhyOOP)({}) },
  {
    path: '/why-web-development',
    element: withCanonical(WhyWebDev)({}),
  },
  { path: '*', element: <NotFound /> },
])

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

const App: React.FC = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
