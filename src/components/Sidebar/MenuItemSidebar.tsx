import React from 'react'

import { hasChildren } from '../../helpers/children.helper'
import { type RouteType } from '../../models'
import MenuSidebarMultilevel from './MenuSidebarMultilevel'
import MenuSidebarSingleLevel from './MenuSidebarSingleLevel'

interface Props {
  item: RouteType
}
const MenuItemSidebar: React.FC<Props> = ({ item }) => {
  const Component = hasChildren(item)
    ? MenuSidebarMultilevel
    : MenuSidebarSingleLevel

  return (
      <React.Fragment key={item.id}>
        <Component item={item} />
      </React.Fragment>
  )
}

export default MenuItemSidebar
