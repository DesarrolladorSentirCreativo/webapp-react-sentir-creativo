import axios from 'axios'

import {
  type IColeccionUserAdmin,
  type IColeccionUserAdminDataGrid,
  type IColeccionUserAdminSelect,
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

const getById = async (id: number): Promise<IColeccionUserAdmin> => {
  return await axios
    .get<IColeccionUserAdmin>(`/colecciones-admin/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      throw new Error(error)
    })
}

const update = async (
  values: IColeccionUserAdmin,
  userId: number
): Promise<void> => {
  const dataValues = {
    ...values,
    userId
  }
  const { data } = await axios.put('/colecciones-admin', dataValues)
  return data
}

const select = async (): Promise<IColeccionUserAdminSelect[]> => {
  return await axios
    .get<IColeccionUserAdminSelect[]>('/colecciones-admin/select')
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      return []
    })
}

export default { getAll, deleteById, create, getById, update, select }
