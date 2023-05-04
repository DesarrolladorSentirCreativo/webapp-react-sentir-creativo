export interface IListAudiencia {
  id: number
  nombre: string
  apellido?: string
  profesion?: string
  email: string
  celular?: string
  organizacion?: string
  departamento?: string
  cargo?: string
  antiguedad?: string
  cercania?: string
  motivacion?: string
  estado?: string
  prefijo?: string
  origen?: string
  email2: string
  destacado?: boolean
  documentoIdentidad?: string
  activo: boolean
}

export interface Audiencia {
  id: any
  nombre?: any
  apellido?: any
  profesion?: any
  email: any
  celular?: any
  organizacionId: any
  departamento?: any
  cargo?: any
  antiguedadId: any
  cercaniaId: any
  motivacionId: any
  estadoId: any
  prefijoId: any
  origenId: any
  email2: any
  destacado?: any
  documentoIdentidad?: any
  activo: any

  // Tipo de indexación
  [key: string]: any
}

export interface AudienciaData {
  id: number
  nombre?: string
  apellido?: string
  profesion?: string
  email: string
  celular?: string
  organizaciones: []
  departamento?: string
  cargo?: string
  antiguedadId: number
  cercaniaId: number
  motivacionId: number
  estadoAudienciaId: number
  prefijoId: number
  origenId: number
  email2: string | null
  destacado?: boolean
  documentoIdentidad?: string
  activo: boolean
  difusiones: []
  cuponDescuentos: []
}

export interface CreateAudiencia
  extends Omit<AudienciaData, 'id' | 'activo' | 'destacado'> {}
