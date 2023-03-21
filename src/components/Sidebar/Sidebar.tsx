import './Sidebar.css'

import { Drawer, Toolbar } from '@mui/material'
import React from 'react'

import { themePallete } from '../../config/config.theme'
import sizeConfig from '../../config/size.config.'
import { MenuProvider } from './context/menu.context'
import MenuSidebar from './MenuSidebar'

const Sidebar: React.FC = () => {
  return (
        <Drawer variant='permanent' sx={{
          width: sizeConfig.sidebar.width,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: sizeConfig.sidebar.width,
            boxSizing: 'border-box',
            borderRight: '0px',
            backgroundColor: themePallete.SIDEBAR_BG
          }
        }}>
            <div>
                <Toolbar sx={{ background: themePallete.SIDEBAR_BG, width: '100%', p: 2 }}>
                    <img src="/static/images/full-logo.png" className="logo" alt="Sentir Creativo"/>
                </Toolbar>
                <MenuProvider>
                    <MenuSidebar />
                </MenuProvider>
            </div>
        </Drawer>
  )
}
export default Sidebar
