import MenuIcon from '@mui/icons-material/Menu'
import { AppBar, IconButton, Toolbar } from '@mui/material'
import React from 'react'

import { themePallete } from '../../config/config.theme'
import sizeConfig from '../../config/size.config.'

interface Props {
  handleDrawerToggle: () => void
}
const Topbar: React.FC<Props> = (props) => {
  return (
        <AppBar position='fixed'
                sx={{
                  width: { md: `calc(100% - ${sizeConfig.sidebar.width})` },
                  ml: sizeConfig.sidebar.width,
                  boxShadow: 'unset',
                  backgroundColor: themePallete.PRIMARY,
                  color: themePallete.CONTRAST_TEXT
                }}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={props.handleDrawerToggle}
                    sx={{ mr: 2, display: { md: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
  )
}

export default Topbar
