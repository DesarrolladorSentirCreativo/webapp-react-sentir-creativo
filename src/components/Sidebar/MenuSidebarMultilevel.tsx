import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import React, { type FC, useContext, useEffect, useState } from 'react'

import { themePallete } from '../../config/config.theme'
import { getLocalStorage } from '../../helpers/localstorage.helper'
import { type IAccesoModulo, type RouteType } from '../../models'
import { MenuContext } from './context/menu.context'
import MenuItemSidebar from './MenuItemSidebar'

interface Props {
  item: RouteType
}

interface IUserAcceso {
  accesos: IAccesoModulo[]
  userId: 0
  alias: ''
  nombre: ''
  apellidos: ''
}
const MenuSidebarMultilevel: FC<Props> = ({ item }) => {
  const [valida, setValida] = useState<boolean>(false)

  const { state, handleMenuClose, handleMenuOpen, setExpandedMenu } =
    useContext(MenuContext)
  const handleClick = (id: string): void => {
    if (id !== undefined) {
      setExpandedMenu(state.expandedMenu === id ? null : id)
    } else {
      if (state.isMenuOpen) {
        handleMenuClose()
      } else {
        handleMenuOpen()
      }
    }
  }

  useEffect(() => {
    const userData = getLocalStorage('user') || '{}'
    try {
      const userPermiso: IUserAcceso = JSON.parse(userData)
      const exists = userPermiso?.accesos.find(
        (obj) => obj.moduloId === item.modulo
      )

      if (exists) {
        setValida(exists.ver)
      } else {
        setValida(false)
      }
    } catch (error) {
      console.error('Error parsing user data:', error)
    }
  }, [])

  return (
    <>
      {' '}
      {valida ? (
        <React.Fragment key={item.id}>
          <ListItemButton
            onClick={() => {
              handleClick(item.id)
            }}
            sx={{
              py: '2px',
              display: 'flex', // Hace que el botón sea un contenedor de flexbox
              alignItems: 'center',
              color: themePallete.CONTRAST_TEXT
            }}
          >
            <ListItemIcon
              sx={{ color: themePallete.CONTRAST_TEXT, minWidth: 24, pr: 2 }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.title} />
            {state.expandedMenu === item.id ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse
            in={
              item.id === undefined
                ? state.isMenuOpen
                : state.expandedMenu === item.id
            }
            timeout="auto"
            unmountOnExit
          >
            <List
              sx={{
                pl: 2,
                backgroundColor: themePallete.SIDEBAR_BG,
                color: themePallete.CONTRAST_TEXT
              }}
            >
              {item.children?.map((child, key) => (
                <MenuItemSidebar key={key} item={child} />
              ))}
            </List>
          </Collapse>
        </React.Fragment>
      ) : (
        ''
      )}
    </>
  )
}

export default MenuSidebarMultilevel
