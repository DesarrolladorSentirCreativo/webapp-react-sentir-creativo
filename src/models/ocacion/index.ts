export interface IOcacion {
  id: number
  nombre: string
  publishedAt: Date
}

export interface ICreateOcacion extends Omit<IOcacion, 'id' | 'publishedAt'> {}

export interface IUpdateOcacion extends Omit<IOcacion, 'publishedAt'> {}

export interface ISelectOcacion extends Omit<IOcacion, 'publishedAt'> {}
