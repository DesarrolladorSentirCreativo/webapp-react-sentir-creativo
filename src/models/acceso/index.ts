export interface IAcceso {
  id: string
  crear: boolean
  ver: boolean
  actualizar: boolean
  eliminar: boolean
}

export interface IAccesos extends Omit<IAcceso, 'id'> {}
