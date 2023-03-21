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
  SUCCESS_MAIN = '#4CAF50',
  SIDEBAR_BG = '#222D32',
  SIDEBAR_COLOR = '#eeeeee',
  SIDEBAR_HOVER_BG = '#FF6C00',
  SIDEBAR_HOVER_COLOR = '#fff'
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
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected:hover': {
            backgroundColor: themePallete.PRIMARY
          }
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: themePallete.SIDEBAR_BG,
          border: 'none'
        }
      }
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: themePallete.CONTRAST_TEXT,
            backgroundColor: themePallete.PRIMARY
          },
          '&.Mui-selected:hover': {
            backgroundColor: themePallete.PRIMARY
          },
          '&:hover': {
            color: themePallete.CONTRAST_TEXT,
            backgroundColor: themePallete.SIDEBAR_HOVER_BG
          }
        }
      }
    },
    MuiAppBar: {
      defaultProps: {
        style: {
          color: themePallete.CONTRAST_TEXT,
          marginBottom: 20
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
