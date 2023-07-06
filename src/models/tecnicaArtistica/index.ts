export interface ITecnicaArtistica {
  id: number
  nombre: string
  publishedAt: Date
}

export interface ICreateTecnicaArtistica
  extends Omit<ITecnicaArtistica, 'id' | 'publishedAt'> {}

export interface IUpdateTecnicaArtistica
  extends Omit<ITecnicaArtistica, 'publishedAt'> {}

export interface ISelectTecnicaArtistica
  extends Omit<ITecnicaArtistica, 'publishedAt'> {}
