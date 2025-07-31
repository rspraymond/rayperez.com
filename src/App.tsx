import React from 'react'
import ErrorBoundary from './components/ErrorBoundary'
import { ThemeProvider } from './contexts/ThemeContext'
import { BookmarkProvider } from './contexts/BookmarkContext'
import AppContent from './components/AppContent'

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <BookmarkProvider>
          <AppContent />
        </BookmarkProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
