export interface IRol {
  id: number
  nombre: string
  descripcion: string
}

interface IAcuerdo {
  acuerdoId: number
}

interface IPrivilegio {
  privilegioId: string
}

export interface IRolSelect extends Omit<IRol, 'id' | 'descripcion'> {}

export interface ICreateRol extends Omit<IRol, 'id'> {
  acuerdos: IAcuerdo[]
  privilegios: IPrivilegio[]
}
