import axios from 'axios'

import { type IAcuerdoUserAdmin } from '../models'

const getAll = async (): Promise<IAcuerdoUserAdmin[]> => {
  return await axios
    .get<IAcuerdoUserAdmin[]>('/acuerdos-admin')
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      return []
    })
}

const deleteById = async (id: number): Promise<void> => {
  await axios
    .put(`/acuerdos-admin/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      throw new Error(error)
    })
}

export default { getAll, deleteById }
