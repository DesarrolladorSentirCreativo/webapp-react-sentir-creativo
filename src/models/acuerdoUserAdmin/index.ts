export interface IAcuerdoUserAdmin {
  id: number
  nombre: string
  descripcion: string
}

export interface ICreateAcuerdoUserAdmin
  extends Omit<IAcuerdoUserAdmin, 'id'> {}
export interface ISelectAcuerdoUserAdmin
  extends Omit<IAcuerdoUserAdmin, 'descripcion'> {}
