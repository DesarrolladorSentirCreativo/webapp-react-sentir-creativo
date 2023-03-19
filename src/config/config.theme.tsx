import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import React from 'react'

interface ThemeProp {
  children: JSX.Element
}

export enum themePallete {
  BG = '#F5F5F5',
  PRIMARY = '#FF6C00',
  CONTRAST_TEXT = '#FFF',
  ERROR_MAIN = '#F44336',
  SUCCESS_MAIN = '#4CAF50'
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
  },
  components: {
    MuiAlert: {
      defaultProps: {
        style: {
          borderRadius: 0,
          fontSize: '1em'
        }
      },
      styleOverrides: {
        standardError: {
          border: `1 solid ${themePallete.ERROR_MAIN}`,
          background: themePallete.ERROR_MAIN,
          color: themePallete.CONTRAST_TEXT
        },
        standardSuccess: {
          border: `1 solid ${themePallete.SUCCESS_MAIN}`,
          background: themePallete.SUCCESS_MAIN,
          color: themePallete.CONTRAST_TEXT
        }
      }
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
