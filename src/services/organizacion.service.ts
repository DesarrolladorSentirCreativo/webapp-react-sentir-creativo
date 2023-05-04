import axios from 'axios'

import {
  type CreateOrganizacion,
  type OrganizacionDataGrid,
  type OrganizacionDireccion,
  type SelectOrganizacion,
  type UpdateOrganizacion
} from '../models'

const select = async (): Promise<SelectOrganizacion[]> => {
  return await axios
    .get<SelectOrganizacion[]>('/organizaciones/select')
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      return []
    })
}

const getAll = async (): Promise<any> => {
  return await axios
    .get<any>('/organizaciones/all')
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      return []
    })
}

const getByDireccion = async (
  id: number
): Promise<OrganizacionDireccion | null> => {
  return await axios
    .get<OrganizacionDireccion>(`/organizaciones/direccion/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      return null
    })
}

const create = async (values: CreateOrganizacion): Promise<void> => {
  const { data } = await axios.post('/organizaciones', values)
  return data
}

const update = async (values: UpdateOrganizacion): Promise<void> => {
  const { data } = await axios.put('/organizaciones', values)
  return data
}

const deleteById = async (id: number): Promise<void> => {
  await axios
    .delete(`/organizaciones/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      throw new Error(error)
    })
}

export default { select, getAll, create, deleteById, getByDireccion, update }
