export interface IArchivo {
  id: number
  nombre: string
  path: string
  publishedAt: Date
  tipoArchivo: string | null
  tipoArchivoId: number | null
  publico: boolean
}

export interface ICRUDArchivo
  extends Omit<IArchivo, 'publishedAt' | 'tipoArchivo'> {
  archivo: any
}
