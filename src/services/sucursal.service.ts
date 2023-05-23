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

const deleteById = async (id: number): Promise<void> => {
  await axios
    .put(`/sucursales/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      throw new Error(error)
    })
}

export default { getAll, deleteById }
