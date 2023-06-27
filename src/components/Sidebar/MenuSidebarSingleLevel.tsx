import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { themePallete } from '../../config/config.theme'
import { getLocalStorage } from '../../helpers/localstorage.helper'
import { type RouteType } from '../../models'
import { type IAcceso } from './../../models/acceso/index'

interface Props {
  item: RouteType
}

interface IUserAcceso {
  accesos: IAcceso[]
  userId: 0
  alias: ''
  nombre: ''
  apellidos: ''
}

const MenuSidebarSingleLevel: React.FC<Props> = ({ item }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [user, setUser] = React.useState<IUserAcceso>()
  const [valida, setValida] = React.useState<boolean>(false)

  useEffect(() => {
    const userData = getLocalStorage('user') || '{}'
    try {
      setUser(JSON.parse(userData))
    } catch (error) {
      console.error('Error parsing user data:', error)
    }
  }, [])

  const isPathSelected = (path: string): boolean => {
    let nuevaRuta
    if (location.pathname.split('/').length > 2) {
      nuevaRuta = location.pathname.replace(/\/[^/]*$/, '')
    } else {
      nuevaRuta = location.pathname
    }
    const newPath = nuevaRuta
    return newPath === path
  }

  useEffect(() => {
    const exists = user?.accesos.some(
      (obj) => obj.coleccionId === item.coleccion
    )

    if (exists) {
      setValida(true)
    } else {
      setValida(false)
    }
  }, [item])

  return (
    <>
      {valida ? (
        <ListItem disablePadding>
          <ListItemButton
            sx={{
              py: '2px',
              color: themePallete.CONTRAST_TEXT,
              display: 'flex', // Hace que el botón sea un contenedor de flexbox
              alignItems: 'center' //
            }}
            onClick={() => {
              item.path ? navigate(item.path) : console.log(item)
            }}
            selected={isPathSelected(item.path ?? '')}
          >
            <ListItemIcon
              sx={{ color: themePallete.CONTRAST_TEXT, minWidth: 24, pr: 2 }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.title} sx={{ color: '#fff' }} />
          </ListItemButton>
        </ListItem>
      ) : (
        ''
      )}
    </>
  )
}

export default MenuSidebarSingleLevel
