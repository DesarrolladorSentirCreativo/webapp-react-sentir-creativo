import axios from 'axios'

import {
  type CreateOrganizacion,
  type OrganizacionDataGrid,
  type SelectOrganizacion
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

const getAll = async (): Promise<OrganizacionDataGrid[]> => {
  return await axios
    .get<OrganizacionDataGrid[]>('/organizaciones/all')
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      return []
    })
}

const create = async (values: CreateOrganizacion): Promise<void> => {
  const { data } = await axios.post('/organizaciones', values)
  return data
}

export default { select, getAll, create }
