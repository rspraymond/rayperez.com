import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'

const preloadHome = () => {
  import('./pages/Home.tsx')
}

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element #root not found')
}

// Declarative SPA bootstrap: production uses plain Vite, not vite-react-ssg prerender.
createRoot(rootElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)

// Defer Home chunk warmup until after first paint so the entry route stays prioritized.
window.addEventListener('load', () => {
  setTimeout(() => {
    preloadHome()
  }, 1000)
})
