import axios from 'axios'

import { type ISucursalDataGrid } from '../models/sucursal'

const getAll = async (): Promise<ISucursalDataGrid[]> => {
  return await axios
    .get<ISucursalDataGrid[]>('/sucursales')
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      return []
    })
}

export default { getAll }
