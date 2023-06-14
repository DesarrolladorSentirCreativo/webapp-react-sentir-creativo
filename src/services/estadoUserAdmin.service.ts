import axios from 'axios'

import {
  type ICreateEstadoUserAdmin,
  type IEstadoUserAdmin,
  type IEstadoUserAdminSelect
} from '../models'

const getAll = async (): Promise<IEstadoUserAdmin[]> => {
  return await axios
    .get<IEstadoUserAdmin[]>('/estados-useradmins')
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      return []
    })
}

const deleteById = async (id: number): Promise<void> => {
  await axios
    .put(`/estados-useradmins/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      throw new Error(error)
    })
}

const create = async (
  values: ICreateEstadoUserAdmin,
  userId: number
): Promise<void> => {
  const data = {
    ...values,
    userId
  }
  await axios.post('/estados-useradmins', data)
}

const getById = async (id: number): Promise<IEstadoUserAdmin> => {
  return await axios
    .get<IEstadoUserAdmin>(`/estados-useradmins/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      throw new Error(error)
    })
}

const update = async (
  values: IEstadoUserAdmin,
  userId: number
): Promise<void> => {
  const dataValues = {
    ...values,
    userId
  }
  const { data } = await axios.put('/estados-useradmins', dataValues)
  return data
}

const select = async (): Promise<IEstadoUserAdminSelect[]> => {
  return await axios
    .get<IEstadoUserAdminSelect[]>('/estados-useradmins/select')
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      return []
    })
}

export default { getAll, deleteById, create, update, getById, select }
