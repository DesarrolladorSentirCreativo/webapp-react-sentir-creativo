import {
  AcuerdosUserAdmin,
  Afp,
  Audiencias,
  CategoriasPrivilegios,
  CategoriaUserAdmins,
  ColeccionesUserAdmin,
  CreateFormAcuerdoUserAdmin,
  CreateFormAfp,
  CreateFormAudiencia,
  CreateFormCategoriaPrivilegio,
  CreateFormCategoriaUserAdmin,
  CreateFormColeccionUserAdmin,
  CreateFormEstadoUserAdmin,
  CreateFormModoTrabajo,
  CreateFormModulo,
  CreateFormOrganizacion,
  CreateFormPrevision,
  CreateFormPrivilegio,
  CreateFormRol,
  CreateFormSucursal,
  CreateFormUsuarioAdmin,
  EstadosUserAdmins,
  Home,
  ModosTrabajos,
  Modulos,
  Organizaciones,
  Previsiones,
  Privilegios,
  Roles,
  Sucursales,
  UpdateFormAcuerdoUserAdmin,
  UpdateFormAfp,
  UpdateFormAudiencia,
  UpdateFormCategoriaPrivilegio,
  UpdateFormCategoriaUserAdmin,
  UpdateFormColeccionUserAdmin,
  UpdateFormEstadoUserAdmin,
  UpdateFormModoTrabajo,
  UpdateFormModulo,
  UpdateFormOrganizacion,
  UpdateFormPrevision,
  UpdateFormPrivilegio,
  UpdateFormRol,
  UpdateFormSucursal,
  UsuariosAdmin
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
  },
  {
    path: '/categorias-usuarios',
    component: CategoriaUserAdmins
  },
  {
    path: '/categorias-usuarios/nuevo',
    component: CreateFormCategoriaUserAdmin
  },
  {
    path: '/categorias-usuarios/actualizar/:id',
    component: UpdateFormCategoriaUserAdmin
  },
  {
    path: '/afp',
    component: Afp
  },
  {
    path: '/afp/nuevo',
    component: CreateFormAfp
  },
  {
    path: '/afp/actualizar/:id',
    component: UpdateFormAfp
  },
  {
    path: '/modos-trabajos',
    component: ModosTrabajos
  },
  {
    path: '/modos-trabajos/nuevo',
    component: CreateFormModoTrabajo
  },
  {
    path: '/modos-trabajos/actualizar/:id',
    component: UpdateFormModoTrabajo
  },
  {
    path: '/previsiones',
    component: Previsiones
  },
  {
    path: '/previsiones/nuevo',
    component: CreateFormPrevision
  },
  {
    path: '/previsiones/actualizar/:id',
    component: UpdateFormPrevision
  },
  {
    path: '/estados-useradmins',
    component: EstadosUserAdmins
  },
  {
    path: '/estados-useradmins/nuevo',
    component: CreateFormEstadoUserAdmin
  },
  {
    path: '/estados-useradmins/actualizar/:id',
    component: UpdateFormEstadoUserAdmin
  },
  {
    path: '/usuarios',
    component: UsuariosAdmin
  },
  {
    path: '/usuarios/nuevo',
    component: CreateFormUsuarioAdmin
  }
]

export { routes }
