import { Box, Toolbar } from '@mui/material'
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'

import sizeConfig from '../../config/size.config.'
import { Sidebar } from '../Sidebar'
import { Topbar } from '../Topbar'

const Layout: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false)

  const handleDrawerToggle = (): void => {
    setMobileOpen(!mobileOpen)
  }
  return (
        <Box sx={{ display: 'flex' }}>
            <Topbar handleDrawerToggle={handleDrawerToggle}/>
            <Box component='nav' sx={{ width: mobileOpen ? sizeConfig.sidebar.width : 0, flexShrink: 0 }}>
                <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle}/>
            </Box>
            <Box component='main' sx={{ flexGrow: 1, p: 3, width: '100%', minHeight: '100vh' }}>
                <Toolbar/>
                <Outlet />
            </Box>
        </Box>
  )
}

export default Layout
