export interface ICategoriaPrivilegio {
  id: number
  nombre: string
  descripcion?: string
}

export interface ICategoriaPrivilegioSelect
  extends Omit<ICategoriaPrivilegio, 'descripcion'> {}
export interface ICreateCategoriaPrivilegio
  extends Omit<ICategoriaPrivilegio, 'id'> {}
