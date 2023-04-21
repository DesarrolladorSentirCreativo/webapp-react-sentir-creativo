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
  id: number
  nombre?: string
  apellido?: string
  profesion?: string
  email: string
  celular?: string
  organizacionId: number
  departamento?: string
  cargo?: string
  antiguedadId: number
  cercaniaId: number
  motivacionId: number
  estadoId: number
  prefijoId: number
  origenId: number
  email2: string
  destacado?: boolean
  documentoIdentidad?: string
  activo: boolean
}
