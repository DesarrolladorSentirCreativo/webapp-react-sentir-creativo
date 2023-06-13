import axios from 'axios'

import {
  type ICreatePrevision,
  type IPrevision,
  type IPrevisionSelect
} from '../models'

const getAll = async (): Promise<IPrevision[]> => {
  return await axios
    .get<IPrevision[]>('/previsiones')
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      return []
    })
}

const deleteById = async (id: number): Promise<void> => {
  await axios
    .put(`/previsiones/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      throw new Error(error)
    })
}

const create = async (
  values: ICreatePrevision,
  userId: number
): Promise<void> => {
  const data = {
    ...values,
    userId
  }
  await axios.post('/previsiones', data)
}

const getById = async (id: number): Promise<IPrevision> => {
  return await axios
    .get<IPrevision>(`/previsiones/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      throw new Error(error)
    })
}

const update = async (values: IPrevision, userId: number): Promise<void> => {
  const dataValues = {
    ...values,
    userId
  }
  const { data } = await axios.put('/previsiones', dataValues)
  return data
}

const select = async (): Promise<IPrevisionSelect[]> => {
  return await axios
    .get<IPrevisionSelect[]>('/previsiones/select')
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      return []
    })
}

export default { getAll, deleteById, create, update, getById, select }
