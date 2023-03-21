import React from 'react'

import { menu } from '../../routes'
import MenuItemSidebar from './MenuItemSidebar'

const MenuSidebar: React.FC = () => {
  return (
      <div>
          {menu.map((item, key) => <MenuItemSidebar key={key} item={item} />)}
      </div>
  )
}

export default MenuSidebar
