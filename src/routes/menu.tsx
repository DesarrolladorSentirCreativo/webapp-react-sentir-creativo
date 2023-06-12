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
        id: 'acuerdos',
        title: 'Acuerdos',
        icon: <ArrowRightIcon />,
        path: '/acuerdos',
        children: []
      },
      {
        id: 'afp',
        title: 'AFP',
        icon: <ArrowRightIcon />,
        path: '/afp',
        children: []
      },
      {
        id: 'categoriasPrivilegios',
        title: 'Categorías de Privilegios',
        icon: <ArrowRightIcon />,
        path: '/categorias-privilegios',
        children: []
      },
      {
        id: 'categoriasUserAdmins',
        title: 'Categorías de Usuarios',
        icon: <ArrowRightIcon />,
        path: '/categorias-usuarios',
        children: []
      },
      {
        id: 'colecciones',
        title: 'Colecciones',
        icon: <ArrowRightIcon />,
        path: '/colecciones',
        children: []
      },
      {
        id: 'Privilegios',
        title: 'Privilegios',
        icon: <ArrowRightIcon />,
        path: '/privilegios',
        children: []
      },
      {
        id: 'modulos',
        title: 'Modulos',
        icon: <ArrowRightIcon />,
        path: '/modulos',
        children: []
      },
      {
        id: 'roles',
        title: 'Roles',
        icon: <ArrowRightIcon />,
        path: '/roles',
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
