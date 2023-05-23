export interface ISucursal {
  id: number
  nombre: string
  direccion: string
  paisId: number
  regionId: number
  ciudadId: number
  descripcion: string
}

export interface ISucursalDataGrid extends Omit<ISucursal, 'descripcion'> {}
