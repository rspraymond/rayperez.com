import React from 'react'
import { ThemeProvider } from '../contexts/ThemeContext'

export const AllTheProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>
}
