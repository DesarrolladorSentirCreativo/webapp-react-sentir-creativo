export interface IEstadoServicio {
  id: number
  nombre: string
  color: string
  descripcion?: string
  publishedAt: Date
}

export interface ISelectEstadoServicio
  extends Omit<IEstadoServicio, 'descripcion' | 'color' | 'publishedAt'> {}

export interface ICreateEstadoServicio
  extends Omit<IEstadoServicio, 'id' | 'publishedAt'> {}

export interface IUpdateEstadoServicio
  extends Omit<IEstadoServicio, 'publishedAt'> {}
