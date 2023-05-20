export interface IArchivo {
  id: number
  nombre: string
  path: string
  publishedAt: Date
  tipoArchivo: string | null
  tipoArchivoId: number | null
  publico: boolean
  imagePath?: string
}

export interface ICRUDArchivo
  extends Omit<IArchivo, 'publishedAt' | 'tipoArchivo'> {
  archivo: any
}
