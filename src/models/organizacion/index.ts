export interface SelectOrganizacion {
  id: number
  nombre: string
}

export interface OrganizacionDataGrid {
  id: any
  nombre: any
  website: any
  facebook: any
  twitter: any
  instagram: any
  historial: any
  email: any
  rubroId: any
  telefono: any
  activo: any
  publishedAt: any
}

export interface OrganizacionData {
  id: number
  nombre: string
  website?: string
  rubroId: number
  facebook?: string
  twitter?: string
  instagram?: string
  historial?: string
  email?: string
  activo: boolean
  publishedAt: Date
  ciudadId: number
  regionId: number
  calle?: string
  telefono?: number
  paisId: number
}

export interface CreateOrganizacion
  extends Omit<OrganizacionData, 'id' | 'activo' | 'publishedAt'> {}
