import { createContext } from 'react'
import { ThemeContextType } from './ThemeTypes'

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)
