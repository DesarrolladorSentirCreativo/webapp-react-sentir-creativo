import BusinessIcon from '@mui/icons-material/Business'
import HailIcon from '@mui/icons-material/Hail'
import HouseIcon from '@mui/icons-material/House'

import { type RouteType } from '../models'

const menu: RouteType[] = [
  {
    id: 'home',
    title: 'Home',
    icon: <HouseIcon />,
    path: '/home',
    children: []
  },
  {
    id: 'audiencias',
    title: 'Audiencias',
    icon: <HailIcon />,
    path: '/audiencias',
    children: []
  },
  {
    id: 'organizacion',
    title: 'Organizaciones',
    icon: <BusinessIcon />,
    path: '/organizaciones',
    children: []
  }
]

export { menu }
