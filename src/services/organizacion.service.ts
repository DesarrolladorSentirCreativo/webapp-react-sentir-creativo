import axios from 'axios'

import { type SelectOrganizacion } from '../models/organizacion'

const select = async (): Promise<SelectOrganizacion[]> => {
  return await axios
    .get<SelectOrganizacion[]>('/organizaciones/select')
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      return []
    })
}

export default { select }
