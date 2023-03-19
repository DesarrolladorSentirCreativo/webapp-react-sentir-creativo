import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import React from 'react'

interface ThemeProp {
  children: JSX.Element
}

export enum themePallete {
  BG = '#F5F5F5'
}

const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: themePallete.BG
    }
  }

})

export const ThemeConfig: React.FC<ThemeProp> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        {children}
    </ThemeProvider>
  )
}
