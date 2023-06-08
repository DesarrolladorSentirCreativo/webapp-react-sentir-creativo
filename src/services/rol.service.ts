import axios from 'axios'

import { type IRol, type IRolSelect } from '../models/rol'

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

export default { getAll, deleteById, select }
