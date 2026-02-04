import React from 'react'
import ErrorBoundary from './components/ErrorBoundary'
import { ThemeProvider } from './contexts/ThemeContext'
import { BookmarkProvider } from './contexts/BookmarkContext'
import AppContent from './components/AppContent'
import { HelmetProvider } from 'react-helmet-async'

const App: React.FC = () => (
  <ErrorBoundary>
    <HelmetProvider>
      <ThemeProvider>
        <BookmarkProvider>
          <AppContent />
        </BookmarkProvider>
      </ThemeProvider>
    </HelmetProvider>
  </ErrorBoundary>
)

export default App
