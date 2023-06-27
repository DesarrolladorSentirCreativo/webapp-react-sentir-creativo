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
    coleccion: 16,
    title: 'Audiencias',
    icon: <HailIcon />,
    path: '/audiencias'
  },
  {
    id: 'organizacion',
    coleccion: 18,
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
        id: 'usuarios',
        title: 'Usuarios',
        coleccion: 28,
        icon: <ArrowRightIcon />,
        path: '/usuarios',
        children: []
      },
      {
        id: 'acuerdos',
        coleccion: 25,
        title: 'Acuerdos',
        icon: <ArrowRightIcon />,
        path: '/acuerdos',
        children: []
      },
      {
        id: 'afp',
        coleccion: 20,
        title: 'AFP',
        icon: <ArrowRightIcon />,
        path: '/afp',
        children: []
      },
      {
        id: 'categoriasPrivilegios',
        coleccion: 24,
        title: 'Categorías de Privilegios',
        icon: <ArrowRightIcon />,
        path: '/categorias-privilegios',
        children: []
      },
      {
        id: 'categoriasUserAdmins',
        coleccion: 26,
        title: 'Categorías de Usuarios',
        icon: <ArrowRightIcon />,
        path: '/categorias-usuarios',
        children: []
      },
      {
        id: 'colecciones',
        coleccion: 29,
        title: 'Colecciones',
        icon: <ArrowRightIcon />,
        path: '/colecciones',
        children: []
      },
      {
        id: 'estadosUserAdmins',
        coleccion: 27,
        title: 'Estados de Usuarios',
        icon: <ArrowRightIcon />,
        path: '/estados-useradmins',
        children: []
      },
      {
        id: 'previsiones',
        coleccion: 21,
        title: 'Previsiones de Salud',
        icon: <ArrowRightIcon />,
        path: '/previsiones',
        children: []
      },
      {
        id: 'Privilegios',
        coleccion: 13,
        title: 'Privilegios',
        icon: <ArrowRightIcon />,
        path: '/privilegios',
        children: []
      },
      {
        id: 'modo',
        coleccion: 23,
        title: 'Modos de Trabajos',
        icon: <ArrowRightIcon />,
        path: '/modos-trabajos',
        children: []
      },
      {
        id: 'modulos',
        coleccion: 14,
        title: 'Modulos',
        icon: <ArrowRightIcon />,
        path: '/modulos',
        children: []
      },
      {
        id: 'roles',
        coleccion: 22,
        title: 'Roles',
        icon: <ArrowRightIcon />,
        path: '/roles',
        children: []
      },
      {
        id: 'sucursales',
        coleccion: 15,
        title: 'Sucursales',
        icon: <ArrowRightIcon />,
        path: '/sucursales',
        children: []
      }
    ]
  }
]

export { menu }
