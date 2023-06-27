import MenuIcon from '@mui/icons-material/Menu'
import {
  AppBar,
  Avatar,
  Box,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { themePallete } from '../../config/config.theme'
import sizeConfig from '../../config/size.config.'
import { getLocalStorage } from '../../helpers/localstorage.helper'
import authService from '../../services/auth.service'
interface Props {
  handleDrawerToggle: () => void
}

interface User {
  userId: number
  nombre: string
  alias: string
  apellidos: string
}

const Topbar: React.FC<Props> = (props) => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const [user, setUser] = useState<User>({
    userId: 0,
    alias: '',
    nombre: '',
    apellidos: ''
  })
  const navigate = useNavigate()

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = (): void => {
    setAnchorElUser(null)
  }

  useEffect(() => {
    const userData = getLocalStorage('user') || '{}'
    try {
      setUser(JSON.parse(userData))
    } catch (error) {
      console.error('Error parsing user data:', error)
    }
  }, [])

  const settings = [
    {
      key: 0,
      text: 'Perfil',
      onClick: () => {
        handleCloseUserMenu()
      }
    },
    {
      key: 1,
      text: 'Cerrar Sesion',
      onClick: async () => {
        await authService.logout()
        navigate('/login')
      }
    }
  ]

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - ${sizeConfig.sidebar.width})` },
        ml: sizeConfig.sidebar.width,
        boxShadow: 'unset',
        backgroundColor: themePallete.PRIMARY,
        color: themePallete.CONTRAST_TEXT
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={props.handleDrawerToggle}
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ flexGrow: 0, marginLeft: 'auto' }}>
          <Grid
            container
            spacing={0}
            direction="row"
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={6} sx={{ marginBottom: 2 }}>
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{
                  p: 0,
                  mr: 10,
                  display: 'flex',
                  alignContent: 'center',
                  alignItems: 'center',
                  mt: 2,
                  width: '100%',
                  textTransform: 'none'
                }}
              >
                <Avatar
                  alt="Remy Sharp"
                  src={'/static/images/user.jpg'}
                  sx={{ mr: 2, height: '25px', width: '25px' }}
                />
                <Typography
                  variant="button"
                  display="block"
                  gutterBottom
                  sx={{
                    color: '#fff',
                    fontSize: '12px',
                    width: '100%',
                    textTransform: 'none'
                  }}
                >
                  {user.alias}
                </Typography>
              </IconButton>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting.key}
                    onClick={setting.onClick}
                    sx={{ width: '150px' }}
                  >
                    <Typography
                      textAlign="center"
                      sx={{ fontSize: 15, width: '150px' }}
                    >
                      {setting.text}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Grid>
          </Grid>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Topbar
