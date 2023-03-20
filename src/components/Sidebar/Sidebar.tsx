import './Sidebar.css'

import { Avatar, Drawer, List, Stack } from '@mui/material'
import React from 'react'

import { themePallete } from '../../config/config.theme'
import sizeConfig from '../../config/size.config.'

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
            <List disablePadding>
                <Stack sx={{ width: '100%' }} direction='row' justifyContent='center'>
                    <Avatar src='/static/images/full-logo.png' className='logo' />
                </Stack>
            </List>
        </Drawer>
  )
}
export default Sidebar
