import { type IArchivo } from '../archivo'
import { type IComentario } from '../comentario'

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

interface IRol {
  rolId: number
}

interface IAcuerdo {
  acuerdoId: number
}

interface IPrivilegio {
  privilegioId: number
}

interface ISucursal {
  sucursalId: number
}
