export interface ICategoriaUserAdmin {
  id: number
  nombre: string
  descripcion?: string
}

export interface ICategoriaUserAdminSelect
  extends Omit<ICategoriaUserAdmin, 'descripcion'> {}
export interface ICreateCategoriaUserAdmin
  extends Omit<ICategoriaUserAdmin, 'id'> {}
