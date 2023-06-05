import axios from 'axios'

import { type ICreatePrivilegio } from '../models'

const getAll = async (): Promise<any> => {
  return await axios
    .get<any>('/privilegios')
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      return []
    })
}

const deleteById = async (id: number): Promise<void> => {
  await axios
    .put(`/privilegios/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      throw new Error(error)
    })
}

const create = async (
  value: ICreatePrivilegio,
  userId: number
): Promise<void> => {}

export default { getAll, deleteById, create }
