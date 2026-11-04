import React from 'react'
import ErrorBoundary from './components/ErrorBoundary'
import { ThemeProvider } from './contexts/ThemeContext'
import AppContent from './components/AppContent'
import { HelmetProvider } from 'react-helmet-async'

const App: React.FC = () => (
  <ErrorBoundary>
    <HelmetProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </HelmetProvider>
  </ErrorBoundary>
)

export default App
