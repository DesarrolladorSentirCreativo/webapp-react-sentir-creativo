export interface IModulo {
  id: number
  nombre: string
  descripcion: string
}

export interface ICreateModulo extends Omit<IModulo, 'id'> {}

export interface ISelectModulo extends Omit<IModulo, 'descripcion'> {}
