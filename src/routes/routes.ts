import {
  Audiencias,
  CategoriasPrivilegios,
  ColeccionesUserAdmin,
  CreateFormAudiencia,
  CreateFormCategoriaPrivilegio,
  CreateFormColeccionUserAdmin,
  CreateFormModulo,
  CreateFormOrganizacion,
  CreateFormSucursal,
  Home,
  Modulos,
  Organizaciones,
  Sucursales,
  UpdateFormAudiencia,
  UpdateFormCategoriaPrivilegio,
  UpdateFormModulo,
  UpdateFormOrganizacion,
  UpdateFormSucursal
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
  },
  {
    path: '/modulos/nuevo',
    component: CreateFormModulo
  },
  {
    path: '/modulos/actualizar/:id',
    component: UpdateFormModulo
  },
  {
    path: '/colecciones',
    component: ColeccionesUserAdmin
  },
  {
    path: '/colecciones/nuevo',
    component: CreateFormColeccionUserAdmin
  }
]

export { routes }
