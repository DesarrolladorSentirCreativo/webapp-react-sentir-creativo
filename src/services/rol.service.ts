import axios from 'axios'

import { type ICreateRol, type IRol, type IRolSelect } from '../models/rol'

const getAll = async (): Promise<IRol[]> => {
  return await axios
    .get<IRol[]>('/roles')
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      return []
    })
}

const deleteById = async (id: number): Promise<void> => {
  await axios
    .put(`/roles/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      throw new Error(error)
    })
}

const select = async (): Promise<IRolSelect[]> => {
  return await axios
    .get<IRolSelect[]>('/roles/select')
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      return []
    })
}

const create = async (values: ICreateRol, userId: number): Promise<void> => {
  const data = {
    ...values,
    userId
  }
  await axios.post('/roles', data)
}

export default { getAll, deleteById, select, create }
