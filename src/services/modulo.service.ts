import axios from 'axios'

import { type ICreateModulo, type IModulo } from '../models'

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

const create = async (values: ICreateModulo, userId: number): Promise<void> => {
  const data = {
    ...values,
    userId
  }
  await axios.post('/modulos', data)
}

export default { getAll, deleteById, create }
