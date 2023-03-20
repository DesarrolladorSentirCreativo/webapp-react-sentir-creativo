import { AppBar, Toolbar, Typography } from '@mui/material'
import React from 'react'

import { themePallete } from '../../config/config.theme'
import sizeConfig from '../../config/size.config.'

const Topbar: React.FC = () => {
  return (
        <AppBar position='fixed'
                sx={{
                  width: `calc(100% - ${sizeConfig.sidebar.width})`,
                  ml: sizeConfig.sidebar.width,
                  boxShadow: 'unset',
                  backgroundColor: themePallete.PRIMARY,
                  color: themePallete.CONTRAST_TEXT
                }}>
            <Toolbar>
                <Typography>
                    Admin App
                </Typography>
            </Toolbar>
        </AppBar>
  )
}

export default Topbar
