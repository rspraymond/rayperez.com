import { createTheme, ThemeProvider } from '@mui/material'
import React, { useEffect } from 'react'
import { BrowserRouter, useNavigate, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.tsx'
import WhyNest from './pages/articles/WhyNest.tsx'
import WhyGraphQL from './pages/articles/WhyGraphQL.tsx'
import WhyNodeJS from './pages/articles/WhyNodeJS.tsx'
import WhyTypescript from './pages/articles/WhyTypescript.tsx'
import WhyReactJS from './pages/articles/WhyReactJS.tsx'
import WhyLaravel from './pages/articles/WhyLaravel.tsx'
import WhyOOP from './pages/articles/WhyOOP.tsx'
import WhyWebDev from './pages/articles/WhyWebDev.tsx'
import NotFound from './pages/NotFound.tsx'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

const App: React.FC = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <HashRedirectHandler />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/why-nestjs' element={<WhyNest />} />
          <Route path='/why-graphql' element={<WhyGraphQL />} />
          <Route path='/why-nodejs' element={<WhyNodeJS />} />
          <Route path='/why-typescript' element={<WhyTypescript />} />
          <Route path='/why-react' element={<WhyReactJS />} />
          <Route path='/why-laravel' element={<WhyLaravel />} />
          <Route path='/why-oop' element={<WhyOOP />} />
          <Route path='/why-web-development' element={<WhyWebDev />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
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
