export interface IPrevision {
  id: number
  nombre: string
  descripcion?: string
}

export interface IPrevisionSelect extends Omit<IPrevision, 'descripcion'> {}
export interface ICreatePrevision extends Omit<IPrevision, 'id'> {}
