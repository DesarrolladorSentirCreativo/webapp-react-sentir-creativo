export interface IModoTrabajo {
  id: number
  nombre: string
  descripcion?: string
}

export interface IModoTrabajoSelect extends Omit<IModoTrabajo, 'descripcion'> {}
export interface ICreateModoTrabajo extends Omit<IModoTrabajo, 'id'> {}
