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
  CreateFormEstadoServicio,
  CreateFormEstadoUserAdmin,
  CreateFormModoTrabajo,
  CreateFormModulo,
  CreateFormOcacion,
  CreateFormOrganizacion,
  CreateFormPrevision,
  CreateFormPrivilegio,
  CreateFormRol,
  CreateFormSucursal,
  CreateFormTecnicaArtistica,
  CreateFormUsuarioAdmin,
  EstadosServicios,
  EstadosUserAdmins,
  Home,
  ModosTrabajos,
  Modulos,
  Ocaciones,
  Organizaciones,
  Previsiones,
  Privilegios,
  Roles,
  Sucursales,
  TecnicasArtisticas,
  UpdateFormAcuerdoUserAdmin,
  UpdateFormAfp,
  UpdateFormAudiencia,
  UpdateFormCategoriaPrivilegio,
  UpdateFormCategoriaUserAdmin,
  UpdateFormColeccionUserAdmin,
  UpdateFormEstadoServicio,
  UpdateFormEstadoUserAdmin,
  UpdateFormModoTrabajo,
  UpdateFormModulo,
  UpdateFormOcacion,
  UpdateFormOrganizacion,
  UpdateFormPrevision,
  UpdateFormPrivilegio,
  UpdateFormRol,
  UpdateFormSucursal,
  UpdateFormTecnicaArtistica,
  UpdateFormUsuarioAdmin,
  UsuariosAdmin
} from '../pages'

const routes = [
  {
    path: '/home',
    component: Home
  },
  {
    path: '/audiencias',
    coleccion: 16,
    component: Audiencias
  },
  {
    path: '/audiencias/nuevo',
    coleccion: 16,
    component: CreateFormAudiencia
  },
  {
    path: '/audiencias/actualizar/:id',
    coleccion: 16,
    component: UpdateFormAudiencia
  },
  {
    path: '/organizaciones',
    coleccion: 18,
    component: Organizaciones
  },
  {
    path: '/organizaciones/nuevo',
    coleccion: 18,
    component: CreateFormOrganizacion
  },
  {
    path: '/organizaciones/actualizar/:id',
    coleccion: 18,
    component: UpdateFormOrganizacion
  },
  {
    path: '/sucursales',
    coleccion: 15,
    component: Sucursales
  },
  {
    path: '/sucursales/nuevo',
    coleccion: 15,
    component: CreateFormSucursal
  },
  {
    path: '/sucursales/actualizar/:id',
    coleccion: 15,
    component: UpdateFormSucursal
  },
  {
    path: '/categorias-privilegios',
    coleccion: 24,
    component: CategoriasPrivilegios
  },
  {
    path: '/categorias-privilegios/nuevo',
    coleccion: 24,
    component: CreateFormCategoriaPrivilegio
  },
  {
    path: '/categorias-privilegios/actualizar/:id',
    coleccion: 24,
    component: UpdateFormCategoriaPrivilegio
  },
  {
    path: '/modulos',
    coleccion: 14,
    component: Modulos
  },
  {
    path: '/modulos/nuevo',
    coleccion: 14,
    component: CreateFormModulo
  },
  {
    path: '/modulos/actualizar/:id',
    coleccion: 14,
    component: UpdateFormModulo
  },
  {
    path: '/colecciones',
    coleccion: 29,
    component: ColeccionesUserAdmin
  },
  {
    path: '/colecciones/nuevo',
    coleccion: 29,
    component: CreateFormColeccionUserAdmin
  },
  {
    path: '/colecciones/actualizar/:id',
    coleccion: 29,
    component: UpdateFormColeccionUserAdmin
  },
  {
    path: '/privilegios',
    coleccion: 13,
    component: Privilegios
  },
  {
    path: '/privilegios/nuevo',
    coleccion: 13,
    component: CreateFormPrivilegio
  },
  {
    path: '/privilegios/actualizar/:id',
    coleccion: 13,
    component: UpdateFormPrivilegio
  },
  {
    path: '/acuerdos',
    coleccion: 25,
    component: AcuerdosUserAdmin
  },
  {
    path: '/acuerdos/nuevo',
    coleccion: 25,
    component: CreateFormAcuerdoUserAdmin
  },
  {
    path: '/acuerdos/actualizar/:id',
    coleccion: 25,
    component: UpdateFormAcuerdoUserAdmin
  },
  {
    path: '/roles',
    coleccion: 22,
    component: Roles
  },
  {
    path: '/roles/nuevo',
    coleccion: 22,
    component: CreateFormRol
  },
  {
    path: '/roles/actualizar/:id',
    coleccion: 22,
    component: UpdateFormRol
  },
  {
    path: '/categorias-usuarios',
    coleccion: 26,
    component: CategoriaUserAdmins
  },
  {
    path: '/categorias-usuarios/nuevo',
    coleccion: 26,
    component: CreateFormCategoriaUserAdmin
  },
  {
    path: '/categorias-usuarios/actualizar/:id',
    coleccion: 26,
    component: UpdateFormCategoriaUserAdmin
  },
  {
    path: '/afp',
    coleccion: 20,
    component: Afp
  },
  {
    path: '/afp/nuevo',
    coleccion: 20,
    component: CreateFormAfp
  },
  {
    path: '/afp/actualizar/:id',
    coleccion: 20,
    component: UpdateFormAfp
  },
  {
    path: '/modos-trabajos',
    coleccion: 23,
    component: ModosTrabajos
  },
  {
    path: '/modos-trabajos/nuevo',
    coleccion: 23,
    component: CreateFormModoTrabajo
  },
  {
    path: '/modos-trabajos/actualizar/:id',
    coleccion: 23,
    component: UpdateFormModoTrabajo
  },
  {
    path: '/previsiones',
    coleccion: 21,
    component: Previsiones
  },
  {
    path: '/previsiones/nuevo',
    coleccion: 21,
    component: CreateFormPrevision
  },
  {
    path: '/previsiones/actualizar/:id',
    coleccion: 21,
    component: UpdateFormPrevision
  },
  {
    path: '/estados-useradmins',
    coleccion: 27,
    component: EstadosUserAdmins
  },
  {
    path: '/estados-useradmins/nuevo',
    coleccion: 27,
    component: CreateFormEstadoUserAdmin
  },
  {
    path: '/estados-useradmins/actualizar/:id',
    coleccion: 27,
    component: UpdateFormEstadoUserAdmin
  },
  {
    path: '/usuarios',
    coleccion: 28,
    component: UsuariosAdmin
  },
  {
    path: '/usuarios/nuevo',
    coleccion: 28,
    component: CreateFormUsuarioAdmin
  },
  {
    path: '/usuarios/actualizar/:id',
    coleccion: 28,
    component: UpdateFormUsuarioAdmin
  },
  {
    path: '/tecnicas-artisticas',
    coleccion: 30,
    component: TecnicasArtisticas
  },
  {
    path: '/tecnicas-artisticas/nuevo',
    coleccion: 30,
    component: CreateFormTecnicaArtistica
  },
  {
    path: '/tecnicas-artisticas/actualizar/:id',
    coleccion: 30,
    component: UpdateFormTecnicaArtistica
  },
  {
    path: '/ocaciones',
    coleccion: 31,
    component: Ocaciones
  },
  {
    path: '/ocaciones/nuevo',
    coleccion: 30,
    component: CreateFormOcacion
  },
  {
    path: '/ocaciones/actualizar/:id',
    coleccion: 30,
    component: UpdateFormOcacion
  },
  {
    path: '/estados-servicios',
    coleccion: 33,
    component: EstadosServicios
  },
  {
    path: '/estados-servicios/nuevo',
    coleccion: 33,
    component: CreateFormEstadoServicio
  },
  {
    path: '/estados-servicios/actualizar/:id',
    coleccion: 33,
    component: UpdateFormEstadoServicio
  }
]

export { routes }
