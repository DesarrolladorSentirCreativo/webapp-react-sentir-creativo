export interface IAfp {
  id: number
  nombre: string
  descripcion?: string
}

export interface IAfpSelect extends Omit<IAfp, 'descripcion'> {}
export interface ICreateAfp extends Omit<IAfp, 'id'> {}
