export interface IPrivilegio {
  id: string
  nombre: string
  categoriaId: number
  descripcion?: string
}

export interface ICreatePrivilegio extends Omit<IPrivilegio, 'id'> {}
