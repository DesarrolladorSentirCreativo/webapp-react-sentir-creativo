import { type IArchivo } from '../archivo'

export interface IUsuarioAdmin {
  id: number
  prefijoId: number
  nombre: string
  apellidos: string
  numDocumento: string
  tipoDocumento: string
  emailPersonal: string
  telefono: string
  regionId: number
  ciudadId: number
  paisId: number
  direccion: string
  categoriaId: number
  afpId: number
  previsionId: number
  modoId: number
  estadoId: number
}

export interface ISelectUsuarioAdmin {
  id: number
  nombre: string
}

export interface ICreateUsuarioAdmin extends Omit<IUsuarioAdmin, 'id'> {
  validaDocumento: boolean
  fechaPago: Date
  fechaInicio: Date
  fechaFin: Date
  sueldoBruto: number
  password: string
  email: string
  roles: IRol[]
  archivos: IArchivo[]
  comentarios: IComentario[]
  acuerdos: IAcuerdo[]
  privilegios: IPrivilegio[]
  sucursales: ISucursal[]
  alias: string
  repeatPassword: string
  tipoCuenta: string
  numCuenta: string
  banco: string
}

export interface IUpdateUsuarioAdmin extends IUsuarioAdmin {
  validaDocumento: boolean
  fechaPago: Date
  fechaInicio: Date
  fechaFin: Date
  sueldoBruto: number
  password: string
  email: string
  roles: IRol[]
  archivos: IArchivo[]
  comentarios: IComentario[]
  acuerdos: IAcuerdo[]
  privilegios: IPrivilegio[]
  sucursales: ISucursal[]
  alias: string
  repeatPassword: string
  tipoCuenta: string
  numCuenta: string
  banco: string
}
interface IRol {
  rolId: number
}

interface IAcuerdo {
  acuerdoId: number
}

interface IPrivilegio {
  privilegioId: string
}

interface ISucursal {
  sucursalId: number
}

interface IComentario {
  comentarioId: number
}
