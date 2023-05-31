export interface IColeccionUserAdmin {
  id: number
  nombre: string
  moduloId: number
  descripcion?: string
}

export interface IColeccionUserAdminDataGrid extends IColeccionUserAdmin {}

export interface ICreateColeccionUserAdmin
  extends Omit<IColeccionUserAdmin, 'id'> {}
