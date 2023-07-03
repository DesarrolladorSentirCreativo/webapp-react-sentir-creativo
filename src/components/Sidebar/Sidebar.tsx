import './Sidebar.css'

import { Drawer, Toolbar } from '@mui/material'

import { themePallete } from '../../config/config.theme'
import sizeConfig from '../../config/size.config.'
import { MenuProvider } from './context/menu.context'
import MenuSidebar from './MenuSidebar'

interface Props {
  mobileOpen: boolean
  handleDrawerToggle: () => void
}
const Sidebar: React.FC<Props> = (props) => {
  return (
    <Drawer
      variant="temporary"
      open={props.mobileOpen}
      onClose={props.handleDrawerToggle}
      ModalProps={{
        keepMounted: true // Mejora el rendimiento de apertura en dispositivos móviles.
      }}
      sx={{
        width: sizeConfig.sidebar.width,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: sizeConfig.sidebar.width,
          boxSizing: 'border-box',
          borderRight: '0px',
          backgroundColor: themePallete.SIDEBAR_BG
        },
        display: 'block' // Se muestra en todas las tamaños de pantalla
      }}
    >
      <div>
        <Toolbar
          sx={{ background: themePallete.SIDEBAR_BG, width: '100%', p: 2 }}
        >
          <img
            src="/static/images/white_animate.com_l.png"
            className="logo-sidebar"
            alt="Sentir Creativo"
          />
        </Toolbar>
        <MenuProvider>
          <MenuSidebar />
        </MenuProvider>
      </div>
    </Drawer>
  )
}

export default Sidebar
