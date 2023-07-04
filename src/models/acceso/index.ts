export interface IAcceso {
  id: string
  crear: boolean
  ver: boolean
  actualizar: boolean
  eliminar: boolean
  coleccionId: number
}

export interface IAccesos extends Omit<IAcceso, 'id' | 'coleccionId'> {}

export interface IAccesoModulo extends IAcceso {
  moduloId: number
}
