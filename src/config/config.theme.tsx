import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import React from 'react'

interface ThemeProp {
  children: JSX.Element
}

export enum themePallete {
  BG = '#F5F5F5',
  PRIMARY = '#FF6C00',
  CONTRAST_TEXT = '#FFF'
}

const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: themePallete.BG
    },
    primary: {
      main: themePallete.PRIMARY,
      contrastText: themePallete.CONTRAST_TEXT
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
