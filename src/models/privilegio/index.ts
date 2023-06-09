import { type IAcceso } from '../acceso'

export interface IPrivilegio {
  id: string
  nombre: string
  categoriaId: number
  descripcion?: string
}

export interface ICreatePrivilegio extends Omit<IPrivilegio, 'id'> {}

export interface IUpdatePrivilegio extends IPrivilegio {}

export interface IGetByIdPrivilegio extends IPrivilegio {
  accesos: IAcceso[]
}

export interface ISelectPriviilegio
  extends Omit<IPrivilegio, 'categoriaId' | 'descripcion'> {}
