import axios from 'axios'

import {
  type IAcuerdoUserAdmin,
  type ICreateAcuerdoUserAdmin,
  type ISelectAcuerdoUserAdmin
} from '../models'

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

const create = async (
  values: ICreateAcuerdoUserAdmin,
  userId: number
): Promise<void> => {
  const data = {
    ...values,
    userId
  }
  await axios.post('/acuerdos-admin', data)
}

const select = async (): Promise<ISelectAcuerdoUserAdmin[]> => {
  return await axios
    .get<ISelectAcuerdoUserAdmin[]>('/acuerdos-admin/select')
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      return []
    })
}

export default { getAll, deleteById, create, select }
