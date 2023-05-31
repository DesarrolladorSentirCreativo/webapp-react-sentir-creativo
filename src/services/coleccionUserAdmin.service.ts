import axios from 'axios'

import {
  type IColeccionUserAdminDataGrid,
  type ICreateColeccionUserAdmin
} from '../models'

const getAll = async (): Promise<IColeccionUserAdminDataGrid[]> => {
  return await axios
    .get<IColeccionUserAdminDataGrid[]>('/colecciones-admin')
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      return []
    })
}

const deleteById = async (id: number): Promise<void> => {
  await axios
    .put(`/colecciones-admin/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      throw new Error(error)
    })
}

const create = async (
  values: ICreateColeccionUserAdmin,
  userId: number
): Promise<void> => {
  const data = {
    ...values,
    userId
  }
  await axios.post('/colecciones-admin', data)
}

export default { getAll, deleteById, create }
