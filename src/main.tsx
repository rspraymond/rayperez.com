import { ViteReactSSG } from 'vite-react-ssg'
import App from './App.tsx'
import { canonicalRoutes } from './constants/routes'
import AppContent from './components/AppContent.tsx'

// Preload important routes
// This tells the browser to start loading the Home page component early
const preloadHome = () => {
  import('./pages/Home.tsx')
}

// Export createApp factory for vite-ssg
export const createApp = ViteReactSSG(
  {
    routes: [
      {
        path: '/',
        element: <App />,
        children: canonicalRoutes
          .filter((path) => path !== '/')
          .map((path) => ({
            path: path.startsWith('/') ? path.slice(1) : path,
            element: <AppContent />,
          })),
      },
    ],
  },
  ({ isClient }) => {
    if (isClient) {
      // Start preloading after the main app is rendered
      window.addEventListener('load', () => {
        // Wait a bit to prioritize main page rendering first
        setTimeout(() => {
          preloadHome()
        }, 1000)
      })
    }
  },
)
