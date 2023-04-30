import axios from 'axios'

import { type OrganizacionDataGrid, type SelectOrganizacion } from '../models'

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

export default { select, getAll }
