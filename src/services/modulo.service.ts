import axios from 'axios'

import { type IModulo } from '../models'

const getAll = async (): Promise<IModulo[]> => {
  return await axios
    .get<IModulo[]>('/modulos')
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      return []
    })
}

const deleteById = async (id: number): Promise<void> => {
  await axios
    .put(`/modulos/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      throw new Error(error)
    })
}

export default { getAll, deleteById }
