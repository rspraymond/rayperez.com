import React from 'react'
import { ThemeProvider } from '../contexts/ThemeContext'
import { HelmetProvider } from 'react-helmet-async'

export const AllTheProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <HelmetProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </HelmetProvider>
  )
}
