export interface ICategoriaPrivilegio {
  id: number
  nombre: string
  descripcion?: string
}

export interface ICreateCategoriaPrivilegio
  extends Omit<ICategoriaPrivilegio, 'id'> {}
