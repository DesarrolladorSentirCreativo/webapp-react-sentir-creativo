import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import BusinessIcon from '@mui/icons-material/Business'
import HailIcon from '@mui/icons-material/Hail'
import HouseIcon from '@mui/icons-material/House'
import PersonIcon from '@mui/icons-material/Person'

import { type RouteType } from '../models'

const menu: RouteType[] = [
  {
    id: 'home',
    title: 'Home',
    icon: <HouseIcon />,
    path: '/home'
  },
  {
    id: 'audiencias',
    title: 'Audiencias',
    icon: <HailIcon />,
    path: '/audiencias'
  },
  {
    id: 'organizacion',
    title: 'Organizaciones',
    icon: <BusinessIcon />,
    path: '/organizaciones'
  },
  {
    id: 'usuarios',
    title: 'Usuarios',
    icon: <PersonIcon />,
    children: [
      {
        id: 'categoriasPrivilegios',
        title: 'Categorías de Privilegios',
        icon: <ArrowRightIcon />,
        path: '/categorias-privilegios',
        children: []
      },
      {
        id: 'mmodulos',
        title: 'Modulos',
        icon: <ArrowRightIcon />,
        path: '/modulos',
        children: []
      },
      {
        id: 'sucursales',
        title: 'Sucursales',
        icon: <ArrowRightIcon />,
        path: '/sucursales',
        children: []
      }
    ]
  }
]

export { menu }
