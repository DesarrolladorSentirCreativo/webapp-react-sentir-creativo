import { Audiencias, CreateFormAudiencia, Home, Organizaciones } from '../pages'

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
    path: '/organizaciones',
    component: Organizaciones
  }
]

export { routes }
