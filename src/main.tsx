import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

// Preload important routes
// This tells the browser to start loading the Home page component early
const preloadHome = () => {
  import('./pages/Home.tsx')
}

// Start preloading after the main app is rendered
window.addEventListener('load', () => {
  // Wait a bit to prioritize main page rendering first
  setTimeout(() => {
    preloadHome()
  }, 1000)
})

// Render the React app
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
