import {
  Audiencias,
  CreateFormAudiencia,
  CreateFormOrganizacion,
  Home,
  Organizaciones,
  Sucursales,
  UpdateFormAudiencia,
  UpdateFormOrganizacion
} from '../pages'

const routes = [
  {
    path: '/home',
    component: Home
  },
  {
    path: '/audiencias',
    component: Audiencias
  },
  {
    path: '/audiencias/nuevo',
    component: CreateFormAudiencia
  },
  {
    path: '/audiencias/actualizar/:id',
    component: UpdateFormAudiencia
  },
  {
    path: '/organizaciones',
    component: Organizaciones
  },
  {
    path: '/organizaciones/nuevo',
    component: CreateFormOrganizacion
  },
  {
    path: '/organizaciones/actualizar/:id',
    component: UpdateFormOrganizacion
  },
  {
    path: '/sucursales',
    component: Sucursales
  }
]

export { routes }
