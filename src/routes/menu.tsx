import HailIcon from '@mui/icons-material/Hail'
import HouseIcon from '@mui/icons-material/House'

import { type RouteType } from '../models'

const menu: RouteType[] = [
  {
    id: 'home',
    title: 'Home',
    icon: <HouseIcon/>,
    path: '/home',
    children: []
  },
  {
    id: 'audiencias',
    title: 'Audiencias',
    icon: <HailIcon/>,
    path: '/audiencias',
    children: []
  }

]

export { menu }
