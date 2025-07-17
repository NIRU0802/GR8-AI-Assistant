'use client'

import { createContext, useContext, useMemo, useState, ReactNode } from 'react'
import { ThemeProvider as MuiThemeProvider, createTheme, CssBaseline } from '@mui/material'

type Mode = 'light' | 'dark'

interface ThemeContextProps {
  mode: Mode
  toggleMode: () => void
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

export const useThemeMode = () => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useThemeMode must be used within a ThemeProvider')
  return context
}

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<Mode>('light')

  const toggleMode = () => {
    setMode(prev => (prev === 'light' ? 'dark' : 'light'))
  }

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  )

  const value = useMemo(() => ({ mode, toggleMode }), [mode])

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  )
}
