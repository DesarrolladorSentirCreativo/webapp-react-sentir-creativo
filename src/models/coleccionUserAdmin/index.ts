export interface IColeccionUserAdmin {
  id: number
  nombre: string
  moduloId: number
  descripcion?: string
}

export interface IColeccionUserAdminDataGrid extends IColeccionUserAdmin {}

export interface IColeccionUserAdminSelect
  extends Omit<IColeccionUserAdmin, 'moduloId' | 'descripcion'> {}

export interface ICreateColeccionUserAdmin
  extends Omit<IColeccionUserAdmin, 'id'> {}

export interface IColeccionUserAdminCheckBox
  extends Omit<IColeccionUserAdmin, 'descripcion' | 'moduloId'> {}
