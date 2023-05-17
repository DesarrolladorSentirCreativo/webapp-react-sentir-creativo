export interface IComentario {
  id: number
  descripcion: string
  publishedAt: Date
  usuario: string
}

export interface IComentarioId
  extends Omit<IComentario, 'id' | 'descripcion' | 'publishedAt' | 'usuario'> {}
