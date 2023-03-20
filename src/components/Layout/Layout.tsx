import { Box, Toolbar } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'

import sizeConfig from '../../config/size.config.'
import { Sidebar } from '../Sidebar'
import { Topbar } from '../Topbar'

const Layout: React.FC = () => {
  return (
        <Box sx={{ display: 'flex' }}>
            <Topbar />
            <Box component='nav' sx={{ width: sizeConfig.sidebar.width, flexShrink: 0 }}>
                <Sidebar />
            </Box>
            <Box component='main' sx={{ flexGrow: 1, p: 3, width: `calc(100% - ${sizeConfig.sidebar.width}`, minHeight: '100vh' }}>
                <Toolbar/>
                <Outlet />
            </Box>
        </Box>
  )
}

export default Layout
