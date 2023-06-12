import axios from 'axios'

import {
  type ICategoriaUserAdmin,
  type ICategoriaUserAdminSelect,
  type ICreateCategoriaUserAdmin
} from '../models'

const getAll = async (): Promise<ICategoriaUserAdmin[]> => {
  return await axios
    .get<ICategoriaUserAdmin[]>('/categorias-useradmins')
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      return []
    })
}

const deleteById = async (id: number): Promise<void> => {
  await axios
    .put(`/categorias-useradmins/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      throw new Error(error)
    })
}

const create = async (
  values: ICreateCategoriaUserAdmin,
  userId: number
): Promise<void> => {
  const data = {
    ...values,
    userId
  }
  await axios.post('/categorias-useradmins', data)
}

const getById = async (id: number): Promise<ICategoriaUserAdmin> => {
  return await axios
    .get<ICategoriaUserAdmin>(`/categorias-useradmins/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      throw new Error(error)
    })
}

const update = async (
  values: ICategoriaUserAdmin,
  userId: number
): Promise<void> => {
  const dataValues = {
    ...values,
    userId
  }
  const { data } = await axios.put('/categorias-useradmins', dataValues)
  return data
}

const select = async (): Promise<ICategoriaUserAdminSelect[]> => {
  return await axios
    .get<ICategoriaUserAdminSelect[]>('/categorias-useradmins/select')
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      return []
    })
}

export default { getAll, deleteById, create, update, getById, select }
