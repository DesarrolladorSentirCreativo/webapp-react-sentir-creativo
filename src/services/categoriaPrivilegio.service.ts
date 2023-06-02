import axios from 'axios'

import {
  type ICategoriaPrivilegio,
  type ICategoriaPrivilegioSelect,
  type ICreateCategoriaPrivilegio
} from '../models'

const getAll = async (): Promise<ICategoriaPrivilegio[]> => {
  return await axios
    .get<ICategoriaPrivilegio[]>('/categorias-privilegios')
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      return []
    })
}

const deleteById = async (id: number): Promise<void> => {
  await axios
    .put(`/categorias-privilegios/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      throw new Error(error)
    })
}

const create = async (
  values: ICreateCategoriaPrivilegio,
  userId: number
): Promise<void> => {
  const data = {
    ...values,
    userId
  }
  await axios.post('/categorias-privilegios', data)
}

const getById = async (id: number): Promise<ICategoriaPrivilegio> => {
  return await axios
    .get<ICategoriaPrivilegio>(`/categorias-privilegios/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      throw new Error(error)
    })
}

const update = async (
  values: ICategoriaPrivilegio,
  userId: number
): Promise<void> => {
  const dataValues = {
    ...values,
    userId
  }
  const { data } = await axios.put('/categorias-privilegios', dataValues)
  return data
}

const select = async (): Promise<ICategoriaPrivilegioSelect[]> => {
  return await axios
    .get<ICategoriaPrivilegioSelect[]>('/categorias-privilegios/select')
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      return []
    })
}

export default { getAll, deleteById, create, update, getById, select }
