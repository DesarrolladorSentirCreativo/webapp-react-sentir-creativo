export interface IRol {
  id: number
  nombre: string
  descripcion: string
}

export interface IRolSelect extends Omit<IRol, 'id' | 'descripcion'> {}
