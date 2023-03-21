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

  return (
      <ListItem disablePadding>
        <ListItemButton
            sx={{
              py: '2px',
              color: themePallete.CONTRAST_TEXT,
              display: 'flex', // Hace que el botón sea un contenedor de flexbox
              alignItems: 'center' //
            }}
            onClick={() => { navigate(item.path) }}
            selected={location.pathname === item.path}
        >
          <ListItemIcon sx={{ color: themePallete.CONTRAST_TEXT, minWidth: 24, pr: 2 }}>
            {item.icon}
          </ListItemIcon>
          <ListItemText primary={item.title} sx={{ color: '#fff' }} />
        </ListItemButton>
      </ListItem>
  )
}

export default MenuSidebarSingleLevel
