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
}
