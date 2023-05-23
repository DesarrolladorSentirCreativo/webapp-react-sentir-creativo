import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { themePallete } from '../../config/config.theme'
import { type RouteType } from '../../models'

interface Props {
  item: RouteType
}

const MenuSidebarSingleLevel: React.FC<Props> = ({ item }) => {
  const navigate = useNavigate()
  const location = useLocation()

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

  return (
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
  )
}

export default MenuSidebarSingleLevel
