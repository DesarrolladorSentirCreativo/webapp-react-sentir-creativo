import {
  AcuerdosUserAdmin,
  Audiencias,
  CategoriasPrivilegios,
  ColeccionesUserAdmin,
  CreateFormAcuerdoUserAdmin,
  CreateFormAudiencia,
  CreateFormCategoriaPrivilegio,
  CreateFormColeccionUserAdmin,
  CreateFormModulo,
  CreateFormOrganizacion,
  CreateFormPrivilegio,
  CreateFormRol,
  CreateFormSucursal,
  Home,
  Modulos,
  Organizaciones,
  Privilegios,
  Roles,
  Sucursales,
  UpdateFormAcuerdoUserAdmin,
  UpdateFormAudiencia,
  UpdateFormCategoriaPrivilegio,
  UpdateFormColeccionUserAdmin,
  UpdateFormModulo,
  UpdateFormOrganizacion,
  UpdateFormPrivilegio,
  UpdateFormRol,
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
  },
  {
    path: '/colecciones/actualizar/:id',
    component: UpdateFormColeccionUserAdmin
  },
  {
    path: '/privilegios',
    component: Privilegios
  },
  {
    path: '/privilegios/nuevo',
    component: CreateFormPrivilegio
  },
  {
    path: '/privilegios/actualizar/:id',
    component: UpdateFormPrivilegio
  },
  {
    path: '/acuerdos',
    component: AcuerdosUserAdmin
  },
  {
    path: '/acuerdos/nuevo',
    component: CreateFormAcuerdoUserAdmin
  },
  {
    path: '/acuerdos/actualizar/:id',
    component: UpdateFormAcuerdoUserAdmin
  },
  {
    path: '/roles',
    component: Roles
  },
  {
    path: '/roles/nuevo',
    component: CreateFormRol
  },
  {
    path: '/roles/actualizar/:id',
    component: UpdateFormRol
  }
]

export { routes }
