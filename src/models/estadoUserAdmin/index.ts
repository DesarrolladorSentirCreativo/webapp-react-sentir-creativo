export interface IEstadoUserAdmin {
  id: number
  nombre: string
  color: string
  descripcion?: string
}

export interface IEstadoUserAdminSelect
  extends Omit<IEstadoUserAdmin, 'descripcion' | 'color'> {}
export interface ICreateEstadoUserAdmin extends Omit<IEstadoUserAdmin, 'id'> {}
