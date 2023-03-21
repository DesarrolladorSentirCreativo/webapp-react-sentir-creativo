import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import React, { useContext } from 'react'

import { themePallete } from '../../config/config.theme'
import { type RouteType } from '../../models'
import { MenuContext } from './context/menu.context'
import MenuItemSidebar from './MenuItemSidebar'

interface Props {
  item: RouteType
}
const MenuSidebarMultilevel: React.FC<Props> = ({ item }) => {
  // const [open, setOpen] = useState<boolean>(false)

  const { state, handleMenuClose, handleMenuOpen, setExpandedMenu } = useContext(MenuContext)
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
  return (
      <React.Fragment key={item.id}>
        <ListItemButton
            onClick={() => { handleClick(item.id) }}
            sx={{
              py: '2px',
              px: 3,
              color: themePallete.CONTRAST_TEXT
            }}
        >
          <ListItemIcon sx={{ color: themePallete.CONTRAST_TEXT, minWidth: 24 }}>
              {item.icon}
          </ListItemIcon>
          <ListItemText primary={item.title} />
          {state.expandedMenu === item.id ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse
            in={item.id === undefined ? state.isMenuOpen : state.expandedMenu === item.id}
            timeout="auto"
            unmountOnExit
        >
          <List sx={{ pl: 2, backgroundColor: themePallete.SIDEBAR_BG, color: themePallete.CONTRAST_TEXT }}>
            {item.children.map((child, key) => (
                <MenuItemSidebar key={key} item={child} />
            ))}
          </List>
        </Collapse>
      </React.Fragment>
  )
}

export default MenuSidebarMultilevel
