import axios from 'axios'

import { type ICategoriaPrivilegio } from '../models'

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

export default { getAll, deleteById }
