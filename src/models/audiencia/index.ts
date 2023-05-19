import { type IArchivo } from '../archivo'
import { type IComentario } from '../comentario'

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
  celular?: number
  organizacionId?: number
  departamento?: number
  cargo?: string
  antiguedadId: number
  cercaniaId?: number
  motivacionId?: number
  estadoId?: number
  prefijoId?: number
  origenId?: number
  email2?: string
  destacado?: boolean
  documentoIdentidad?: string
  activo: boolean
  publishedAt: Date
  organizaciones: IOrganizacion[]
}

export interface AudienciaData {
  id: number
  nombre?: string
  apellido?: string
  profesion?: string
  email: string
  celular?: number | null
  organizaciones: IOrganizacion[]
  departamento?: string
  cargo?: string
  organizacionId: number
  antiguedadId: number
  cercaniaId: number
  prefijoId: number
  motivacionId: number
  estadoAudienciaId: number
  origenId: number
  email2: string
  destacado?: boolean
  documentoIdentidad?: string
  activo: boolean
  difusiones: IDifusion[]
  cuponDescuentos: ICuponDescuento[]
  comentarios: IComentario[]
  archivos: IArchivo[]
}

interface IDifusion {
  difusionId: number
}

interface ICuponDescuento {
  cuponDescuentoId: number
}

interface IOrganizacion {
  organizacionId: number
}

export interface CreateAudiencia
  extends Omit<
    AudienciaData,
    | 'id'
    | 'activo'
    | 'destacado'
    | 'comentarios'
    | 'organizacionId'
    | 'archivos'
  > {}

export interface UpdateAudiencia
  extends Omit<AudienciaData, 'activo' | 'destacado' | 'organizacionId'> {}
