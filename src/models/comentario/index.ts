export interface IComentario {
  id: number
  descripcion: string
  fechaCreacion: Date
  usuario: string
}

export interface IComentarioId
  extends Omit<
    IComentario,
    'id' | 'descripcion' | 'fechaCreacion' | 'usuario'
  > {}
