import axios from 'axios'

import {
  type ICategoriaPrivilegio,
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

export default { getAll, deleteById, create }
