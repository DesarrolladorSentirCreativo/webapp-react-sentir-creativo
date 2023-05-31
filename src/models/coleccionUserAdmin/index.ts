export interface IColeccionUserAdmin {
  id: number
  nombre: string
  moduloId: number
  descripcion?: string
}

export interface IColeccionUserAdminDataGrid
  extends Omit<IColeccionUserAdmin, 'moduloId'> {
  modulo: string
}

export interface ICreateColeccionUserAdmin
  extends Omit<IColeccionUserAdmin, 'id'> {}
