import {
  Audiencias,
  CategoriasPrivilegios,
  CreateFormAudiencia,
  CreateFormCategoriaPrivilegio,
  CreateFormOrganizacion,
  CreateFormSucursal,
  Home,
  Organizaciones,
  Sucursales,
  UpdateFormAudiencia,
  UpdateFormCategoriaPrivilegio,
  UpdateFormOrganizacion,
  UpdateFormSucursal
} from '../pages'
import { Modulos } from '../pages/Modulos'

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
  },
  {
    path: '/sucursales/nuevo',
    component: CreateFormSucursal
  },
  {
    path: '/sucursales/actualizar/:id',
    component: UpdateFormSucursal
  },
  {
    path: '/categorias-privilegios',
    component: CategoriasPrivilegios
  },
  {
    path: '/categorias-privilegios/nuevo',
    component: CreateFormCategoriaPrivilegio
  },
  {
    path: '/categorias-privilegios/actualizar/:id',
    component: UpdateFormCategoriaPrivilegio
  },
  {
    path: '/modulos',
    component: Modulos
  }
]

export { routes }
