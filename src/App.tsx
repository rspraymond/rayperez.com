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

const baseUrl = 'https://www.rayperez.com'

const router = createBrowserRouter([
  { path: '/', element: withCanonical(Home, `${baseUrl}/`)({}) },
  { path: '/why-nestjs', element: withCanonical(WhyNest, `${baseUrl}/why-nestjs`)({}) },
  { path: '/why-graphql', element: withCanonical(WhyGraphQL, `${baseUrl}/why-graphql`)({}) },
  { path: '/why-nodejs', element: withCanonical(WhyNodeJS, `${baseUrl}/why-nodejs`)({}) },
  {
    path: '/why-typescript',
    element: withCanonical(WhyTypescript, `${baseUrl}/why-typescript`)({}),
  },
  { path: '/why-react', element: withCanonical(WhyReactJS, `${baseUrl}/why-react`)({}) },
  { path: '/why-laravel', element: withCanonical(WhyLaravel, `${baseUrl}/why-laravel`)({}) },
  { path: '/why-oop', element: withCanonical(WhyOOP, `${baseUrl}/why-oop`)({}) },
  {
    path: '/why-web-development',
    element: withCanonical(WhyWebDev, `${baseUrl}/why-web-development`)({}),
  },
  {
    path: '*',
    element: <NotFound />,
  },
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
