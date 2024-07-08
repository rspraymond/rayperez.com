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

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/why-nestjs',
    element: <WhyNest />,
  },
  {
    path: '/why-graphql',
    element: <WhyGraphQL />,
  },
  {
    path: '/why-nodejs',
    element: <WhyNodeJS />,
  },
  {
    path: '/why-typescript',
    element: <WhyTypescript />,
  },
  {
    path: '/why-react',
    element: <WhyReactJS />,
  },
  {
    path: '/why-laravel',
    element: <WhyLaravel />,
  },
  {
    path: '/why-oop',
    element: <WhyOOP />,
  },
  {
    path: '/why-web-development',
    element: <WhyWebDev />,
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
